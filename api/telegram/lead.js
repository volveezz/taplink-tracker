import { getQuizWebhookComment, getQuizWebhookUrl, getTelegramClientId } from '../_lib/env.js';
import {
  TELEGRAM_NONCE_COOKIE,
  clearTelegramNonceCookie,
  readCookie,
  verifyTelegramIdToken,
} from '../_lib/telegram-login.js';
import {
  buildQuizWebhookPayload,
  normalizeQuizFields,
  sendQuizWebhook,
} from '../_lib/quiz-webhook.js';

function jsonResponse(body, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('content-type', 'application/json');
  headers.set('cache-control', 'no-store');
  return new Response(JSON.stringify(body), { ...init, headers });
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: {
          Allow: 'POST',
        },
      });
    }

    const clientId = getTelegramClientId();
    const webhookUrl = getQuizWebhookUrl();
    if (!clientId || !webhookUrl) {
      return jsonResponse(
        {
          ok: false,
          error: 'Telegram lead forwarding is not configured.',
        },
        { status: 503 },
      );
    }

    const nonce = readCookie(request, TELEGRAM_NONCE_COOKIE);
    if (!nonce) {
      return jsonResponse(
        {
          ok: false,
          error: 'Telegram login challenge is missing or expired.',
        },
        { status: 400 },
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      return jsonResponse(
        {
          ok: false,
          error: 'Request body must be valid JSON.',
        },
        { status: 400 },
      );
    }

    const idToken = typeof body?.idToken === 'string' ? body.idToken.trim() : '';
    const quizFields = normalizeQuizFields(body?.quizFields);

    if (!idToken) {
      return jsonResponse(
        {
          ok: false,
          error: 'Telegram id_token is required.',
        },
        { status: 400 },
      );
    }

    if (!quizFields.length) {
      return jsonResponse(
        {
          ok: false,
          error: 'Quiz fields are required.',
        },
        { status: 400 },
      );
    }

    try {
      const telegramPayload = await verifyTelegramIdToken(idToken, {
        clientId,
        nonce,
      });

      const webhookPayload = buildQuizWebhookPayload({
        telegramId: telegramPayload.id,
        comment: getQuizWebhookComment(),
        fields: quizFields,
      });

      await sendQuizWebhook({
        webhookUrl,
        payload: webhookPayload,
      });

      return jsonResponse(
        {
          ok: true,
          telegramId: String(telegramPayload.id),
          fieldCount: quizFields.length,
        },
        {
          headers: {
            'set-cookie': clearTelegramNonceCookie(request.url),
          },
        },
      );
    } catch (error) {
      return jsonResponse(
        {
          ok: false,
          error: error instanceof Error ? error.message : 'Telegram lead forwarding failed.',
        },
        {
          status: 400,
          headers: {
            'set-cookie': clearTelegramNonceCookie(request.url),
          },
        },
      );
    }
  },
};
