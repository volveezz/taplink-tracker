function normalizeFieldValue(value) {
  if (typeof value !== 'string') return '';
  return value.trim();
}

export function normalizeQuizFields(rawFields) {
  if (!Array.isArray(rawFields)) return [];

  const seen = new Set();
  const normalized = [];

  for (const value of rawFields) {
    const field = normalizeFieldValue(value);
    if (!field || seen.has(field)) continue;
    seen.add(field);
    normalized.push(field);
  }

  return normalized;
}

function escapeWebhookFieldValue(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

export function formatQuizFieldsForWebhook(fields) {
  return `[${fields.map((field) => `'${escapeWebhookFieldValue(field)}'`).join(',')}]`;
}

export function buildQuizWebhookPayload({ telegramId, comment, fields }) {
  return {
    tg_id: String(telegramId),
    comment,
    fields: formatQuizFieldsForWebhook(fields),
  };
}

export async function sendQuizWebhook({ webhookUrl, payload }) {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => '');
    throw new Error(`Webhook request failed with ${response.status}${responseText ? `: ${responseText}` : ''}`);
  }
}
