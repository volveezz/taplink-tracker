import type {
  FeaturePayload,
  LinkId,
  LinkState,
  ResolvedAppConfig,
  ResolvedLinkConfig,
} from "./schemas";

const defaultLinks: ResolvedLinkConfig[] = [
  { id: "telegram", state: "active", url: "https://t.me/username", disabledReason: null, label: null },
  { id: "whatsapp", state: "hidden", url: "https://wa.me/1234567890", disabledReason: null, label: null },
  { id: "instagram", state: "hidden", url: "https://instagram.com/username", disabledReason: null, label: null },
  { id: "youtube", state: "hidden", url: "", disabledReason: null, label: null },
  { id: "tiktok", state: "hidden", url: "", disabledReason: null, label: null },
  { id: "threads", state: "hidden", url: "", disabledReason: null, label: null },
  { id: "chat", state: "active", url: "https://sergiosapp.vip/?no_cloak=1", disabledReason: null, label: null },
  { id: "linkedin", state: "hidden", url: "", disabledReason: null, label: null },
];

const defaultResolvedConfig: ResolvedAppConfig = {
  profile: {
    name: { show: true, value: "Alex Morgan", placeholder: null },
    avatar: { show: false, shape: "round", url: "" },
    description: { show: false, value: "Creative Developer & Designer", placeholder: null },
  },
  contact: {
    title: null,
    phone: { show: false, placeholder: null },
    email: { show: false, placeholder: null },
    submit: null,
    thankYou: null,
  },
  links: defaultLinks,
};

function cloneDefaultConfig(): ResolvedAppConfig {
  return {
    profile: {
      name: { ...defaultResolvedConfig.profile.name },
      avatar: { ...defaultResolvedConfig.profile.avatar },
      description: { ...defaultResolvedConfig.profile.description },
    },
    contact: {
      title: defaultResolvedConfig.contact.title,
      phone: { ...defaultResolvedConfig.contact.phone },
      email: { ...defaultResolvedConfig.contact.email },
      submit: defaultResolvedConfig.contact.submit,
      thankYou: defaultResolvedConfig.contact.thankYou,
    },
    links: defaultResolvedConfig.links.map((link) => ({ ...link })),
  };
}

function getMutableLink(links: ResolvedLinkConfig[], linkId: string): ResolvedLinkConfig | null {
  return links.find((link) => link.id === linkId) ?? null;
}

function setExplicitLinkState(links: ResolvedLinkConfig[], linkId: LinkId, nextState: LinkState): void {
  const link = getMutableLink(links, linkId);
  if (link) link.state = nextState;
}

function setExplicitLinkVisibility(links: ResolvedLinkConfig[], linkId: LinkId, show: boolean): void {
  const link = getMutableLink(links, linkId);
  if (link) link.state = show ? "active" : "hidden";
}

function applySinglePayload(config: ResolvedAppConfig, payload: FeaturePayload): void {
  if (payload.profile?.name?.show !== undefined) config.profile.name.show = payload.profile.name.show;
  if (payload.profile?.name && "value" in payload.profile.name) {
    config.profile.name.value = payload.profile.name.value ?? null;
  }
  if (payload.profile?.avatar?.show !== undefined) config.profile.avatar.show = payload.profile.avatar.show;
  if (payload.profile?.avatar?.shape) config.profile.avatar.shape = payload.profile.avatar.shape;
  if (payload.profile?.avatar?.url !== undefined) config.profile.avatar.url = payload.profile.avatar.url;
  if (payload.profile?.description?.show !== undefined) {
    config.profile.description.show = payload.profile.description.show;
  }
  if (payload.profile?.description && "value" in payload.profile.description) {
    config.profile.description.value = payload.profile.description.value ?? null;
  }
  if (payload.profile?.namePlaceholder !== undefined) config.profile.name.placeholder = payload.profile.namePlaceholder;
  if (payload.profile?.bioPlaceholder !== undefined) {
    config.profile.description.placeholder = payload.profile.bioPlaceholder;
  }

  if (payload.contact?.title !== undefined) config.contact.title = payload.contact.title;
  if (payload.contact?.phone?.show !== undefined) config.contact.phone.show = payload.contact.phone.show;
  if (payload.contact?.phone?.placeholder !== undefined) {
    config.contact.phone.placeholder = payload.contact.phone.placeholder;
  }
  if (payload.contact?.email?.show !== undefined) config.contact.email.show = payload.contact.email.show;
  if (payload.contact?.email?.placeholder !== undefined) {
    config.contact.email.placeholder = payload.contact.email.placeholder;
  }
  if (payload.contact?.submit !== undefined) config.contact.submit = payload.contact.submit;
  if (payload.contact?.thankYou !== undefined) config.contact.thankYou = payload.contact.thankYou;

  if (!payload.links) return;
  for (const [linkId, linkConfig] of Object.entries(payload.links)) {
    const link = getMutableLink(config.links, linkId);
    if (!link) continue;
    if (linkConfig.state) setExplicitLinkState(config.links, linkId as LinkId, linkConfig.state);
    if (typeof linkConfig.show === "boolean") {
      setExplicitLinkVisibility(config.links, linkId as LinkId, linkConfig.show);
    }
    if (linkConfig.url !== undefined) link.url = linkConfig.url;
    if ("disabledReason" in linkConfig) link.disabledReason = linkConfig.disabledReason ?? null;
    if ("label" in linkConfig) link.label = linkConfig.label ?? null;
  }
}

export function mergeFeaturePayloads(payloads: FeaturePayload[]): ResolvedAppConfig {
  const config = cloneDefaultConfig();
  for (const payload of payloads) {
    applySinglePayload(config, payload);
  }
  return config;
}
