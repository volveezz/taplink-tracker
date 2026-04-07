import { z } from "zod";

export const localizedTextSchema = z.union([
  z.string(),
  z.record(z.string(), z.string()),
]);

export const linkIds = [
  "telegram",
  "whatsapp",
  "instagram",
  "youtube",
  "tiktok",
  "threads",
  "chat",
  "linkedin",
] as const;

export const linkStateSchema = z.enum(["active", "disabled", "hidden"]);
export const avatarShapeSchema = z.enum(["round", "square"]);

const linkConfigSchema = z.object({
  state: linkStateSchema.optional(),
  show: z.boolean().optional(),
  url: z.string().optional(),
  disabledReason: localizedTextSchema.optional(),
  label: localizedTextSchema.optional(),
});

export const featurePayloadSchema = z.object({
  profile: z
    .object({
      name: z
        .object({
          show: z.boolean().optional(),
          value: localizedTextSchema.nullish(),
        })
        .optional(),
      avatar: z
        .object({
          show: z.boolean().optional(),
          shape: avatarShapeSchema.optional(),
          url: z.string().optional(),
        })
        .optional(),
      description: z
        .object({
          show: z.boolean().optional(),
          value: localizedTextSchema.nullish(),
        })
        .optional(),
      namePlaceholder: localizedTextSchema.optional(),
      bioPlaceholder: localizedTextSchema.optional(),
    })
    .optional(),
  contact: z
    .object({
      title: localizedTextSchema.optional(),
      phone: z
        .object({
          show: z.boolean().optional(),
          placeholder: localizedTextSchema.optional(),
        })
        .optional(),
      email: z
        .object({
          show: z.boolean().optional(),
          placeholder: localizedTextSchema.optional(),
        })
        .optional(),
      submit: localizedTextSchema.optional(),
      thankYou: localizedTextSchema.optional(),
    })
    .optional(),
  links: z.record(z.string(), linkConfigSchema).optional(),
});

export type LocalizedText = z.infer<typeof localizedTextSchema>;
export type FeaturePayload = z.infer<typeof featurePayloadSchema>;
export type LinkId = (typeof linkIds)[number];
export type LinkState = z.infer<typeof linkStateSchema>;
export type AvatarShape = z.infer<typeof avatarShapeSchema>;

export type ResolvedLinkConfig = {
  id: LinkId;
  state: LinkState;
  url: string;
  disabledReason: LocalizedText | null;
  label: LocalizedText | null;
};

export type ResolvedAppConfig = {
  profile: {
    name: {
      show: boolean;
      value: LocalizedText | null;
      placeholder: LocalizedText | null;
    };
    avatar: {
      show: boolean;
      shape: AvatarShape;
      url: string;
    };
    description: {
      show: boolean;
      value: LocalizedText | null;
      placeholder: LocalizedText | null;
    };
  };
  contact: {
    title: LocalizedText | null;
    phone: {
      show: boolean;
      placeholder: LocalizedText | null;
    };
    email: {
      show: boolean;
      placeholder: LocalizedText | null;
    };
    submit: LocalizedText | null;
    thankYou: LocalizedText | null;
  };
  links: ResolvedLinkConfig[];
};

export const bootstrapResponseSchema = z.object({
  analytics: z.object({
    apiKey: z.string(),
    apiHost: z.string(),
    uiHost: z.string(),
    designFlagKey: z.string(),
    featureFlagKeys: z.object({
      uiConfig: z.string(),
      profileExperiment: z.string(),
      contactOptionsExperiment: z.string(),
    }),
    debug: z.boolean(),
  }),
  distinctId: z.string(),
  designId: z.number().int(),
  designSource: z.string(),
  flagVariant: z.string(),
  experimentAssigned: z.boolean(),
  featureFlags: z.record(z.string(), z.unknown()),
  featureFlagPayloads: z.record(z.string(), z.unknown()),
  mergedConfig: z.custom<ResolvedAppConfig>(),
});

export type BootstrapResponse = z.infer<typeof bootstrapResponseSchema>;
