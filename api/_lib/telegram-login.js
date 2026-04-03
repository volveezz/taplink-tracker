import { createRemoteJWKSet, jwtVerify } from 'jose';

export const TELEGRAM_LOGIN_SCRIPT_URL = 'https://oauth.telegram.org/js/telegram-login.js?3';
export const TELEGRAM_ISSUER = 'https://oauth.telegram.org';
export const TELEGRAM_JWKS_URL = 'https://oauth.telegram.org/.well-known/jwks.json';
export const TELEGRAM_NONCE_COOKIE = 'ld_tg_nonce';

const TELEGRAM_JWKS = createRemoteJWKSet(new URL(TELEGRAM_JWKS_URL));

function buildCookieAttributes(requestUrl, maxAgeSeconds) {
  const url = new URL(requestUrl);
  const secure = url.protocol === 'https:';
  const parts = [
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAgeSeconds}`,
  ];

  if (secure) parts.push('Secure');
  return parts.join('; ');
}

export function createTelegramNonce() {
  return crypto.randomUUID().replace(/-/g, '');
}

export function createTelegramNonceCookie(requestUrl, nonce) {
  return `${TELEGRAM_NONCE_COOKIE}=${encodeURIComponent(nonce)}; ${buildCookieAttributes(requestUrl, 600)}`;
}

export function clearTelegramNonceCookie(requestUrl) {
  return `${TELEGRAM_NONCE_COOKIE}=; ${buildCookieAttributes(requestUrl, 0)}`;
}

export function readCookie(request, cookieName) {
  const rawCookie = request.headers.get('cookie') || '';
  const cookies = rawCookie.split(';');

  for (const item of cookies) {
    const [rawName, ...rawValueParts] = item.trim().split('=');
    if (rawName !== cookieName) continue;
    return decodeURIComponent(rawValueParts.join('='));
  }

  return '';
}

// Telegram Login returns a signed OIDC id_token. Verifying it here keeps the webhook
// target private and prevents the client from inventing a Telegram user id.
export async function verifyTelegramIdToken(idToken, { clientId, nonce }) {
  const { payload } = await jwtVerify(idToken, TELEGRAM_JWKS, {
    issuer: TELEGRAM_ISSUER,
    audience: String(clientId),
    nonce,
  });

  const telegramId = typeof payload?.id === 'number'
    ? payload.id
    : (typeof payload?.id === 'string' && /^\d+$/.test(payload.id) ? Number(payload.id) : null);

  if (!payload || telegramId === null) {
    throw new Error('Telegram id_token is missing the numeric id claim.');
  }

  return {
    ...payload,
    id: telegramId,
  };
}
