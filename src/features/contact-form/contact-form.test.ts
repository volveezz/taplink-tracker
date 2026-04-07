import { isValidEmail, isValidPhone } from "./validation";

describe("contact form validation", () => {
  it("validates email addresses", () => {
    expect(isValidEmail("lead@example.com")).toBe(true);
    expect(isValidEmail("lead.name+tag@example.co")).toBe(true);
    expect(isValidEmail("lead@example")).toBe(false);
    expect(isValidEmail("leadexample.com")).toBe(false);
  });

  it("validates phone numbers with an optional leading plus", () => {
    expect(isValidPhone("+15551234567")).toBe(true);
    expect(isValidPhone("1555 123 4567")).toBe(true);
    expect(isValidPhone("+1 (555) 123-4567")).toBe(true);
    expect(isValidPhone("++15551234567")).toBe(false);
    expect(isValidPhone("+123")).toBe(false);
  });
});
