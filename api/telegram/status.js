import { getTelegramClientId } from '../_lib/env.js';
import { TELEGRAM_LOGIN_SCRIPT_URL } from '../_lib/telegram-login.js';

export default {
  async fetch() {
    const clientId = getTelegramClientId();

    return Response.json(
      {
        enabled: Boolean(clientId),
        scriptUrl: TELEGRAM_LOGIN_SCRIPT_URL,
      },
      {
        headers: {
          'cache-control': 'no-store',
        },
      },
    );
  },
};
