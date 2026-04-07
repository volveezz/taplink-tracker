import { resolveLocalizedText } from "@/entities/locale/locale";
import type { LocaleCode } from "@/shared/config/locales";
import type { ResolvedAppConfig } from "@/entities/experiments/schemas";

function getInitials(name: string): string {
  return (
    name
      .split(/\s+/)
      .map((word) => word[0] || "")
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

export function ProfileCard({
  config,
  locale,
}: {
  config: ResolvedAppConfig;
  locale: LocaleCode;
}) {
  const name =
    resolveLocalizedText(config.profile.name.value, locale) ||
    resolveLocalizedText(config.profile.name.placeholder, locale);
  const description =
    resolveLocalizedText(config.profile.description.value, locale) ||
    resolveLocalizedText(config.profile.description.placeholder, locale);
  const showDescription = config.profile.description.show && Boolean(description.trim());

  return (
    <section className="profile-section">
      <div
        className={`avatar ${config.profile.avatar.shape === "square" ? "square" : ""} ${
          config.profile.avatar.show ? "" : "hidden"
        }`}
      >
        {config.profile.avatar.url ? (
          <img
            src={config.profile.avatar.url}
            alt=""
            onError={(event) => {
              event.currentTarget.remove();
            }}
          />
        ) : (
          getInitials(name || "?")
        )}
      </div>
      <h1 className={`profile-name ${config.profile.name.show ? "" : "hidden"}`}>{name}</h1>
      <p className={`profile-bio ${showDescription ? "" : "hidden"}`}>{showDescription ? description : ""}</p>
    </section>
  );
}
