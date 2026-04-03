# Taplink Tracker

Static landing page built with Vite and PostHog.

## Local commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

Production is deployed through Vercel.

## How feature flags work

The app uses four PostHog flags:

- `landing-design-experiment`
- `linkdrop-ui-config`
- `linkdrop-profile-experiment`
- `linkdrop-contact-options-experiment`

They are applied in this order:

1. `linkdrop-ui-config` sets the baseline UI for everyone.
2. `linkdrop-profile-experiment` can override profile-related fields.
3. `linkdrop-contact-options-experiment` can override links and contact fields.
4. `landing-design-experiment` picks the design variant.

Profile and contact experiment payloads use the same schema as the baseline config. The app merges them on top of the baseline payload.

If a value is not set in an experiment payload, the app keeps the baseline value from `linkdrop-ui-config`.

## Current flag inventory

### `landing-design-experiment`

Type: multivariate flag

Purpose: choose one of the 10 page designs.

Current variant model:

- `control` -> design 1
- `design-2` -> design 2
- `design-3` -> design 3
- `design-4` -> design 4
- `design-5` -> design 5
- `design-6` -> design 6
- `design-7` -> design 7
- `design-8` -> design 8
- `design-9` -> design 9
- `design-10` -> design 10

Notes:

- Keep variant keys in this format. The bootstrap parser expects `control` or `design-N`.
- If you change rollout percentages, the app does not need code changes.
- If you add a new variant key that does not match `design-N`, you must update code.

### `linkdrop-ui-config`

Type: remote config

Purpose: baseline UI config for all users.

Current payload shape:

```json
{
  "links": {
    "telegram": { "state": "active", "url": "https://t.me/durov" },
    "chat": { "state": "active", "url": "https://sergiosapp.vip/?no_cloak=1" },
    "whatsapp": { "state": "hidden", "url": "https://wa.me/1234567890" },
    "instagram": { "state": "hidden" },
    "threads": { "state": "hidden" },
    "youtube": { "state": "hidden" },
    "tiktok": { "state": "hidden" },
    "linkedin": { "state": "hidden" }
  },
  "profile": {
    "name": {
      "show": true,
      "value": "Sergio"
    },
    "avatar": {
      "show": false,
      "shape": "round",
      "url": "https://apptds.live/app_icon_180.png"
    },
    "description": {
      "show": false,
      "value": {
        "en": "Private support for licensed betting and gaming offers",
        "ru": "Личная поддержка по лицензированным ставкам и игровым предложениям",
        "de": "Persönlicher Support für lizenzierte Wett- und Gaming-Angebote",
        "it": "Supporto privato per offerte di scommesse e gioco con licenza"
      }
    },
    "namePlaceholder": {
      "en": "Your name",
      "ru": "Ваше имя",
      "de": "Dein Name",
      "it": "Il tuo nome"
    },
    "bioPlaceholder": {
      "en": "Short bio or tagline",
      "ru": "Короткое описание",
      "de": "Kurze Beschreibung",
      "it": "Breve descrizione"
    }
  },
  "contact": {
    "title": {
      "en": "Get in touch",
      "ru": "Свяжитесь с нами",
      "de": "Kontakt",
      "it": "Contattaci"
    },
    "phone": {
      "show": false,
      "placeholder": {
        "en": "Your phone",
        "ru": "Ваш телефон",
        "de": "Deine Telefonnummer",
        "it": "Il tuo telefono"
      }
    },
    "email": {
      "show": false,
      "placeholder": {
        "en": "Your email",
        "ru": "Ваш email",
        "de": "Deine E-Mail",
        "it": "La tua email"
      }
    },
    "submit": {
      "en": "Send",
      "ru": "Отправить",
      "de": "Senden",
      "it": "Invia"
    },
    "thankYou": {
      "en": "Thank you!",
      "ru": "Спасибо!",
      "de": "Danke!",
      "it": "Grazie!"
    }
  }
}
```

Important rules:

- `links.<id>.state` can be `active`, `disabled`, or `hidden`.
- `links.<id>.show` is also supported, but use `state` if you need disabled links.
- `links.<id>.label` supports either a plain string or a locale map.
- `links.<id>.disabledReason` supports either a plain string or a locale map.
- `profile.name.value` supports either a plain string or a locale map.
- `profile.description.value` supports either a plain string or a locale map.
- `profile.avatar.shape` can be `round` or `square`.
- `profile.avatar.url` sets the avatar image.

If a built-in UI key such as `submit`, `contactTitle`, or placeholders does not have a value for the current locale in the remote config, the app falls back to its built-in translation.

For custom content such as `profile.name.value` and `profile.description.value`, there is no built-in translation. If you want localized copy, provide all locales you need.

### `linkdrop-profile-experiment`

Type: multivariate flag

Purpose: test profile density and profile presentation.

Current variants:

- `control`
- `compact`
- `avatar_name`
- `full_profile`

Current payloads:

```json
{
  "compact": {
    "profile": {
      "name": {
        "show": false,
        "value": {
          "en": "Sergio",
          "ru": "Sergio",
          "de": "Sergio",
          "it": "Sergio"
        }
      },
      "avatar": {
        "show": false,
        "shape": "round",
        "url": "https://apptds.live/app_icon_180.png"
      },
      "description": {
        "show": false,
        "value": {
          "en": "Private support for licensed betting and gaming offers",
          "ru": "Личная поддержка по лицензированным ставкам и игровым предложениям",
          "de": "Persönlicher Support für lizenzierte Wett- und Gaming-Angebote",
          "it": "Supporto privato per offerte di scommesse e gioco con licenza"
        }
      }
    }
  },
  "avatar_name": {
    "profile": {
      "name": {
        "show": true,
        "value": {
          "en": "Sergio",
          "ru": "Sergio",
          "de": "Sergio",
          "it": "Sergio"
        }
      },
      "avatar": {
        "show": true,
        "shape": "round",
        "url": "https://apptds.live/app_icon_180.png"
      },
      "description": {
        "show": false,
        "value": {
          "en": "Private support for licensed betting and gaming offers",
          "ru": "Личная поддержка по лицензированным ставкам и игровым предложениям",
          "de": "Persönlicher Support für lizenzierte Wett- und Gaming-Angebote",
          "it": "Supporto privato per offerte di scommesse e gioco con licenza"
        }
      }
    }
  },
  "full_profile": {
    "profile": {
      "name": {
        "show": true,
        "value": {
          "en": "Sergio",
          "ru": "Sergio",
          "de": "Sergio",
          "it": "Sergio"
        }
      },
      "avatar": {
        "show": true,
        "shape": "round",
        "url": "https://apptds.live/app_icon_180.png"
      },
      "description": {
        "show": true,
        "value": {
          "en": "Private support for licensed betting and gaming offers",
          "ru": "Личная поддержка по лицензированным ставкам и игровым предложениям",
          "de": "Persönlicher Support für lizenzierte Wett- und Gaming-Angebote",
          "it": "Supporto privato per offerte di scommesse e gioco con licenza"
        }
      }
    }
  }
}
```

You can change these payloads to test custom copy or custom avatar assets. Example:

```json
{
  "profile": {
    "name": {
      "show": true,
      "value": {
        "en": "Sofia Hart",
        "de": "Sofia Hart",
        "it": "Sofia Hart"
      }
    },
    "avatar": {
      "show": true,
      "url": "https://example.com/avatar.jpg",
      "shape": "square"
    },
    "description": {
      "show": true,
      "value": {
        "en": "Private consultant for premium clients",
        "de": "Private Beraterin für Premium-Kunden",
        "it": "Consulente privata per clienti premium"
      }
    }
  }
}
```

### `linkdrop-contact-options-experiment`

Type: multivariate flag

Purpose: test CTA density and contact collection.

Current variants:

- `control`
- `whatsapp_cta`
- `lead_form`
- `expanded_contact`

Current payloads:

```json
{
  "whatsapp_cta": {
    "links": {
      "whatsapp": {
        "state": "active",
        "url": "https://wa.me/1234567890"
      }
    },
    "contact": {
      "title": {
        "en": "Get in touch",
        "ru": "Свяжитесь с нами",
        "de": "Kontakt",
        "it": "Contattaci"
      },
      "phone": {
        "show": false,
        "placeholder": {
          "en": "Your phone",
          "ru": "Ваш телефон",
          "de": "Deine Telefonnummer",
          "it": "Il tuo telefono"
        }
      },
      "email": {
        "show": false,
        "placeholder": {
          "en": "Your email",
          "ru": "Ваш email",
          "de": "Deine E-Mail",
          "it": "La tua email"
        }
      },
      "submit": {
        "en": "Send",
        "ru": "Отправить",
        "de": "Senden",
        "it": "Invia"
      },
      "thankYou": {
        "en": "Thank you!",
        "ru": "Спасибо!",
        "de": "Danke!",
        "it": "Grazie!"
      }
    }
  },
  "lead_form": {
    "links": {
      "whatsapp": {
        "state": "hidden",
        "url": "https://wa.me/1234567890"
      }
    },
    "contact": {
      "title": {
        "en": "Get in touch",
        "ru": "Свяжитесь с нами",
        "de": "Kontakt",
        "it": "Contattaci"
      },
      "phone": {
        "show": true,
        "placeholder": {
          "en": "Your phone",
          "ru": "Ваш телефон",
          "de": "Deine Telefonnummer",
          "it": "Il tuo telefono"
        }
      },
      "email": {
        "show": true,
        "placeholder": {
          "en": "Your email",
          "ru": "Ваш email",
          "de": "Deine E-Mail",
          "it": "La tua email"
        }
      },
      "submit": {
        "en": "Send",
        "ru": "Отправить",
        "de": "Senden",
        "it": "Invia"
      },
      "thankYou": {
        "en": "Thank you!",
        "ru": "Спасибо!",
        "de": "Danke!",
        "it": "Grazie!"
      }
    }
  },
  "expanded_contact": {
    "links": {
      "whatsapp": {
        "state": "active",
        "url": "https://wa.me/1234567890"
      }
    },
    "contact": {
      "title": {
        "en": "Get in touch",
        "ru": "Свяжитесь с нами",
        "de": "Kontakt",
        "it": "Contattaci"
      },
      "phone": {
        "show": true,
        "placeholder": {
          "en": "Your phone",
          "ru": "Ваш телефон",
          "de": "Deine Telefonnummer",
          "it": "Il tuo telefono"
        }
      },
      "email": {
        "show": true,
        "placeholder": {
          "en": "Your email",
          "ru": "Ваш email",
          "de": "Deine E-Mail",
          "it": "La tua email"
        }
      },
      "submit": {
        "en": "Send",
        "ru": "Отправить",
        "de": "Senden",
        "it": "Invia"
      },
      "thankYou": {
        "en": "Thank you!",
        "ru": "Спасибо!",
        "de": "Danke!",
        "it": "Grazie!"
      }
    }
  }
}
```

## Supported languages

Built-in app languages:

- `en`
- `ru`
- `es`
- `de`
- `it`
- `fr`
- `pt`
- `zh`
- `ja`
- `ko`
- `ar`

For built-in UI keys, the app uses its built-in translations when a remote-config override is missing.

For custom content, provide locale maps if you need localized output.

## How to change flags safely

### Change default buttons for everyone

Edit `linkdrop-ui-config`.

Example:

```json
{
  "links": {
    "telegram": { "state": "active" },
    "chat": { "state": "active" },
    "whatsapp": {
      "state": "disabled",
      "disabledReason": {
        "en": "Coming soon",
        "de": "Demnächst",
        "it": "Prossimamente"
      }
    }
  }
}
```

### Change only one experiment variant

Edit the payload for the specific variant inside `linkdrop-profile-experiment` or `linkdrop-contact-options-experiment`.

Do not duplicate the entire baseline config inside an experiment payload unless you mean to override it.

### Change experiment traffic split

Change rollout percentages inside the multivariate flag in PostHog.

The app does not need code changes for that.

### Pause an experiment

Set the rollout percentage to `0`, or set all traffic to `control`.

### Replace a variant with a new idea

Reuse the same variant key and update its payload if you want to keep analytics grouped under the same variant name.

Create a new variant key only if you want a clean analytics split.

## Analytics fields

The app already captures button clicks and session summary data.

Useful fields in PostHog:

- `linkdrop_link_clicked.link_id`
- `linkdrop_disabled_link_clicked.link_id`
- `linkdrop_session_summary.visible_link_ids`
- `linkdrop_session_summary.active_link_ids`
- `linkdrop_session_summary.enabled_contact_fields`
- `linkdrop_session_started.profile_experiment_variant`
- `linkdrop_session_started.contact_options_experiment_variant`
- `linkdrop_session_summary.profile_experiment_variant`
- `linkdrop_session_summary.contact_options_experiment_variant`

This lets you compare:

- which design gets more clicks
- which profile treatment gets more clicks
- which contact setup gets more clicks or more form submissions

## Debugging

In the browser console:

```js
window.__LD_DEBUG.getStatus()
```

This returns the current design, feature flag values, distinct ID, and override status.

Useful query params:

- `?ld_variant=design-6`
- `?ld_variant=control`
- `?ld_design=4`

These are for manual testing only. They bypass normal experiment assignment.
