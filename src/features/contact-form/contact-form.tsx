import { useEffect, useState } from "react";
import { resolveLocalizedText, translate } from "@/entities/locale/locale";
import type { LocaleCode } from "@/shared/config/locales";
import type { ResolvedAppConfig } from "@/entities/experiments/schemas";

export function ContactForm({
  config,
  locale,
  onContactStarted,
  onContactSubmitted,
}: {
  config: ResolvedAppConfig;
  locale: LocaleCode;
  onContactStarted: () => void;
  onContactSubmitted: (options: { phoneProvided: boolean; emailProvided: boolean }) => void;
}) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const timeout = window.setTimeout(() => setSubmitted(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [submitted]);

  const showPhone = config.contact.phone.show;
  const showEmail = config.contact.email.show;

  if (!showPhone && !showEmail) return null;

  if (submitted) {
    return (
      <section className="contact-section">
        <div className="contact-divider" />
        <p className="contact-submitted">
          {resolveLocalizedText(config.contact.thankYou, locale) || translate(locale, "thankYou")}
        </p>
      </section>
    );
  }

  return (
    <section className="contact-section">
      <div className="contact-divider" />
      {(showPhone || showEmail) && (
        <p className="contact-title">
          {resolveLocalizedText(config.contact.title, locale) || translate(locale, "contactTitle")}
        </p>
      )}
      {showPhone ? (
        <input
          className="contact-input"
          type="tel"
          value={phone}
          placeholder={
            resolveLocalizedText(config.contact.phone.placeholder, locale) ||
            translate(locale, "phonePlaceholder")
          }
          onFocus={onContactStarted}
          onChange={(event) => setPhone(event.currentTarget.value)}
          autoComplete="tel"
        />
      ) : null}
      {showEmail ? (
        <input
          className="contact-input"
          type="email"
          value={email}
          placeholder={
            resolveLocalizedText(config.contact.email.placeholder, locale) ||
            translate(locale, "emailPlaceholder")
          }
          onFocus={onContactStarted}
          onChange={(event) => setEmail(event.currentTarget.value)}
          autoComplete="email"
        />
      ) : null}
      {(showPhone || showEmail) && (
        <button
          className="contact-submit"
          type="button"
          onClick={() => {
            onContactSubmitted({
              phoneProvided: Boolean(phone.trim()),
              emailProvided: Boolean(email.trim()),
            });
            setSubmitted(true);
          }}
        >
          {resolveLocalizedText(config.contact.submit, locale) || translate(locale, "submit")}
        </button>
      )}
    </section>
  );
}
