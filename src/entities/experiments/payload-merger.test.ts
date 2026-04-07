import { mergeFeaturePayloads } from "./payload-merger";

describe("mergeFeaturePayloads", () => {
  it("applies later flag payloads over the shared baseline without reviving hidden links", () => {
    const result = mergeFeaturePayloads([
      {
        profile: {
          name: {
            value: "Alex from flags",
          },
        },
        links: {
          instagram: {
            show: true,
            url: "https://instagram.com/alex",
          },
        },
      },
      {
        contact: {
          phone: {
            show: true,
            placeholder: {
              en: "+1 555 000 1111",
            },
          },
        },
        links: {
          instagram: {
            state: "disabled",
            disabledReason: {
              en: "Invite only",
            },
          },
          youtube: {
            show: false,
          },
        },
      },
    ]);

    expect(result.profile.name.value).toBe("Alex from flags");
    expect(result.contact.phone.show).toBe(true);
    expect(result.contact.phone.placeholder).toEqual({ en: "+1 555 000 1111" });
    expect(result.links.find((link) => link.id === "instagram")).toMatchObject({
      state: "disabled",
      url: "https://instagram.com/alex",
      disabledReason: { en: "Invite only" },
    });
    expect(result.links.find((link) => link.id === "youtube")?.state).toBe("hidden");
  });
});
