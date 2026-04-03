import { getTelegramClientId } from '../_lib/env.js';
import {
  TELEGRAM_LOGIN_SCRIPT_URL,
  createTelegramNonce,
  createTelegramNonceCookie,
} from '../_lib/telegram-login.js';

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
    if (!clientId) {
      return Response.json(
        {
          enabled: false,
          error: 'Telegram login is not configured.',
        },
        {
          status: 503,
          headers: {
            'cache-control': 'no-store',
          },
        },
      );
    }

    const nonce = createTelegramNonce();

    return Response.json(
      {
        enabled: true,
        clientId,
        nonce,
        scriptUrl: TELEGRAM_LOGIN_SCRIPT_URL,
      },
      {
        headers: {
          'cache-control': 'no-store',
          'set-cookie': createTelegramNonceCookie(request.url, nonce),
        },
      },
    );
  },
};
