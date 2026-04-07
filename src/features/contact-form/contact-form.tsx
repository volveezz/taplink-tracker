import { useEffect, useState } from "react";
import { resolveLocalizedText, translate } from "@/entities/locale/locale";
import type { LocaleCode } from "@/shared/config/locales";
import type { ResolvedAppConfig } from "@/entities/experiments/schemas";
import { isValidEmail, isValidPhone } from "./validation";

export type ContactSubmission = {
  phone: string | null;
  email: string | null;
  phoneProvided: boolean;
  emailProvided: boolean;
};

type ValidationErrors = {
  phone?: string;
  email?: string;
  form?: string;
};

function clearValidationErrors(
  currentErrors: ValidationErrors,
  keys: Array<keyof ValidationErrors>,
): ValidationErrors {
  const nextErrors = { ...currentErrors };
  for (const key of keys) delete nextErrors[key];
  return nextErrors;
}

export function ContactForm({
  config,
  locale,
  onContactStarted,
  onContactSubmitted,
}: {
  config: ResolvedAppConfig;
  locale: LocaleCode;
  onContactStarted: () => void;
  onContactSubmitted: (submission: ContactSubmission) => Promise<boolean>;
}) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const timeout = window.setTimeout(() => setSubmitted(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [submitted]);

  const showPhone = config.contact.phone.show;
  const showEmail = config.contact.email.show;

  if (!showPhone && !showEmail) return null;

  const validateSubmission = (): ContactSubmission | null => {
    const nextErrors: ValidationErrors = {};
    const trimmedPhone = showPhone ? phone.trim() : "";
    const trimmedEmail = showEmail ? email.trim() : "";

    if (!trimmedPhone && !trimmedEmail) {
      nextErrors.form = translate(locale, "contactRequired");
    }
    if (trimmedPhone && !isValidPhone(trimmedPhone)) {
      nextErrors.phone = translate(locale, "invalidPhone");
    }
    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      nextErrors.email = translate(locale, "invalidEmail");
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return null;

    return {
      phone: trimmedPhone || null,
      email: trimmedEmail || null,
      phoneProvided: Boolean(trimmedPhone),
      emailProvided: Boolean(trimmedEmail),
    };
  };

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
        <>
          <input
            className="contact-input ph-no-capture"
            type="tel"
            value={phone}
            placeholder={
              resolveLocalizedText(config.contact.phone.placeholder, locale) ||
              translate(locale, "phonePlaceholder")
            }
            onFocus={onContactStarted}
            onChange={(event) => {
              setPhone(event.currentTarget.value);
              if (errors.phone || errors.form)
                setErrors((current) => clearValidationErrors(current, ["phone", "form"]));
            }}
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            data-protonpass-ignore="true"
          />
          {errors.phone ? <p className="contact-error">{errors.phone}</p> : null}
        </>
      ) : null}
      {showEmail ? (
        <>
          <input
            className="contact-input ph-no-capture"
            type="email"
            value={email}
            placeholder={
              resolveLocalizedText(config.contact.email.placeholder, locale) ||
              translate(locale, "emailPlaceholder")
            }
            onFocus={onContactStarted}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
              if (errors.email || errors.form)
                setErrors((current) => clearValidationErrors(current, ["email", "form"]));
            }}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            data-protonpass-ignore="true"
          />
          {errors.email ? <p className="contact-error">{errors.email}</p> : null}
        </>
      ) : null}
      {errors.form ? <p className="contact-error">{errors.form}</p> : null}
      {(showPhone || showEmail) && (
        <button
          className="contact-submit"
          type="button"
          disabled={submitting}
          onClick={async () => {
            const submission = validateSubmission();
            if (!submission) return;

            setSubmitting(true);
            const saved = await onContactSubmitted(submission).catch(() => false);
            setSubmitting(false);

            if (!saved) {
              setErrors({ form: translate(locale, "contactSendFailed") });
              return;
            }

            setPhone("");
            setEmail("");
            setErrors({});
            setSubmitted(true);
          }}
        >
          {resolveLocalizedText(config.contact.submit, locale) || translate(locale, "submit")}
        </button>
      )}
    </section>
  );
}
