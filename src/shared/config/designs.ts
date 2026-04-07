export const designDefinitions = [
  { id: 1, slug: "brutal", label: "Brutal" },
  { id: 2, slug: "aurora", label: "Aurora" },
  { id: 3, slug: "terminal", label: "Terminal" },
  { id: 4, slug: "editorial", label: "Editorial" },
  { id: 5, slug: "neon", label: "Neon" },
  { id: 6, slug: "hustle", label: "Hustle" },
  { id: 7, slug: "dreamy", label: "Dreamy" },
  { id: 8, slug: "shadow", label: "Shadow" },
  { id: 9, slug: "prestige", label: "Prestige" },
  { id: 10, slug: "moon", label: "Moon" },
] as const;

export type DesignDefinition = (typeof designDefinitions)[number];
export type DesignId = DesignDefinition["id"];
export type DesignSlug = DesignDefinition["slug"];

export const supportedDesignIds = designDefinitions.map((design) => design.id);

export function getDesignDefinitionById(designId: number): DesignDefinition | null {
  return designDefinitions.find((design) => design.id === designId) ?? null;
}
