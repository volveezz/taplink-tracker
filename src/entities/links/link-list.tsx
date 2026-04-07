import { AppIcon, type IconName } from "@/shared/ui/icons";
import { appendStoredParams } from "@/shared/lib/query-params";
import { resolveLocalizedText, translate } from "@/entities/locale/locale";
import type { ResolvedAppConfig } from "@/entities/experiments/schemas";
import type { LocaleCode } from "@/shared/config/locales";

export function LinkList({
  config,
  locale,
  onLinkClick,
  onDisabledClick,
}: {
  config: ResolvedAppConfig;
  locale: LocaleCode;
  onLinkClick: (linkId: string, url: string, position: number) => void;
  onDisabledClick: (linkId: string, reason: string) => void;
}) {
  const visibleLinks = config.links.filter((link) => link.state !== "hidden");

  return (
    <section className="links-section">
      {visibleLinks.map((link, index) => {
        const label = resolveLocalizedText(link.label, locale) || translate(locale, link.id);
        const disabledReason = resolveLocalizedText(link.disabledReason, locale) || translate(locale, "comingSoon");

        if (link.state === "disabled") {
          return (
            <button
              key={link.id}
              className="link-item is-disabled"
              type="button"
              onClick={() => onDisabledClick(link.id, disabledReason)}
            >
              <span className="link-item-icon">
                <AppIcon name={link.id as IconName} />
              </span>
              <span className="link-item-label">{label}</span>
              <span className="link-item-arrow">→</span>
              <span className="link-item-reason">{disabledReason}</span>
            </button>
          );
        }

        const href = appendStoredParams(link.url);
        return (
          <a
            key={link.id}
            className="link-item"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onLinkClick(link.id, href, index + 1)}
          >
            <span className="link-item-icon">
              <AppIcon name={link.id as IconName} />
            </span>
            <span className="link-item-label">{label}</span>
            <span className="link-item-arrow">→</span>
          </a>
        );
      })}
    </section>
  );
}
