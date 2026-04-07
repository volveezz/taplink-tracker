import type { DesignManifest } from "@/designs/types";
import type { LocaleCode } from "@/shared/config/locales";
import type { EffectiveTheme } from "@/entities/locale/locale";
import type { ResolvedAppConfig } from "@/entities/experiments/schemas";
import { ProfileCard } from "@/entities/profile/profile-card";
import { LinkList } from "@/entities/links/link-list";
import { ContactForm } from "@/features/contact-form/contact-form";
import { Toast } from "@/shared/ui/toast";

export function LandingShell({
  manifest,
  config,
  locale,
  theme,
  toastMessage,
  onLinkClick,
  onDisabledClick,
  onContactStarted,
  onContactSubmitted,
}: {
  manifest: DesignManifest;
  config: ResolvedAppConfig;
  locale: LocaleCode;
  theme: EffectiveTheme;
  toastMessage: string;
  onLinkClick: (linkId: string, url: string, position: number) => void;
  onDisabledClick: (linkId: string, reason: string) => void;
  onContactStarted: () => void;
  onContactSubmitted: (options: { phoneProvided: boolean; emailProvided: boolean }) => void;
}) {
  const Ornaments = manifest.Ornaments;

  return (
    <main className="landing-shell" data-design={manifest.slug} data-theme={theme}>
      {Ornaments ? <Ornaments /> : null}
      <div className="landing-shell__content">
        <div className="preview-inner">
          <div className="terminal-bar">
            <div className="terminal-dots">
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <span className="terminal-dot" />
            </div>
            <span className="terminal-title">linkdrop — bash — 80×24</span>
          </div>
          <ProfileCard config={config} locale={locale} />
          <LinkList
            config={config}
            locale={locale}
            onLinkClick={onLinkClick}
            onDisabledClick={onDisabledClick}
          />
          <ContactForm
            config={config}
            locale={locale}
            onContactStarted={onContactStarted}
            onContactSubmitted={onContactSubmitted}
          />
          <div className="terminal-cursor" />
        </div>
      </div>
      <Toast message={toastMessage} />
    </main>
  );
}
