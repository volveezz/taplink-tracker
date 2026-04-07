const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s().-]{7,24}$/;

export function isValidEmail(value: string): boolean {
  return emailPattern.test(value);
}

export function isValidPhone(value: string): boolean {
  if (!phonePattern.test(value)) return false;
  const digitCount = value.replace(/\D/g, "").length;
  return digitCount >= 7 && digitCount <= 15;
}
