const OPTIONAL_ENV_KEYS = {
  telegramClientId: ['TELEGRAM_CLIENT_ID', 'TELEGRAM_LOGIN_CLIENT_ID'],
  quizWebhookUrl: ['QUIZ_WEBHOOK_URL', 'SALEBOT_WEBHOOK_URL'],
  quizWebhookComment: ['QUIZ_WEBHOOK_COMMENT', 'SALEBOT_COMMENT'],
};

function readFirstDefinedEnv(keys) {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

export function getTelegramClientId() {
  return readFirstDefinedEnv(OPTIONAL_ENV_KEYS.telegramClientId);
}

export function getQuizWebhookUrl() {
  return readFirstDefinedEnv(OPTIONAL_ENV_KEYS.quizWebhookUrl);
}

export function getQuizWebhookComment() {
  return readFirstDefinedEnv(OPTIONAL_ENV_KEYS.quizWebhookComment) || 'SALEBOT';
}
