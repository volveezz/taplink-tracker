import posthog from 'posthog-js';

// ============================================
// 1. TRANSLATIONS
// ============================================
const T = {
  en: {
    settings: 'Settings', design: 'Design', theme: 'Theme', language: 'Language',
    profile: 'Profile', links: 'Links', contactForm: 'Contact Form',
    auto: 'Auto', light: 'Light', dark: 'Dark',
    namePlaceholder: 'Your name', bioPlaceholder: 'Short bio or tagline',
    designs: ['Brutal', 'Aurora', 'Terminal', 'Editorial', 'Neon', 'Hustle', 'Dreamy', 'Shadow', 'Prestige', 'Moon'],
    chat: 'Online Chat', threads: 'Threads',
    telegram: 'Telegram', whatsapp: 'WhatsApp', instagram: 'Instagram',
    youtube: 'YouTube', tiktok: 'TikTok', linkedin: 'LinkedIn',
    avatarSettings: 'Avatar', showAvatar: 'Show avatar',
    avatarRound: 'Round', avatarSquare: 'Square', avatarUrl: 'Image URL',
    stateOn: 'On', stateOff: 'Off', stateHide: 'Hide',
    reason: 'Reason', comingSoon: 'Coming soon',
    particles: 'Particles', density: 'Density', speed: 'Speed',
    minSize: 'Min size', maxSize: 'Max size', opacity: 'Opacity',
    collectPhone: 'Collect phone', collectEmail: 'Collect email',
    contactTitle: 'Get in touch', phonePlaceholder: 'Your phone',
    emailPlaceholder: 'Your email', submit: 'Send', thankYou: 'Thank you!',
    telegramLeadTitle: 'Confirm with Telegram',
    telegramLeadHint: 'Verify your Telegram account to send your quiz answers securely.',
    telegramLeadButton: 'Continue with Telegram',
    telegramLeadSending: 'Connecting Telegram...',
    telegramLeadSuccess: 'Telegram connected. Quiz data sent.',
    telegramLeadUnavailable: 'Telegram login is unavailable right now.',
    telegramLeadMissingFields: 'No quiz answers were found on this page.',
  },
  ru: {
    settings: 'Настройки', design: 'Дизайн', theme: 'Тема', language: 'Язык',
    profile: 'Профиль', links: 'Ссылки', contactForm: 'Форма связи',
    auto: 'Авто', light: 'Светлая', dark: 'Тёмная',
    namePlaceholder: 'Ваше имя', bioPlaceholder: 'Короткое описание',
    designs: ['Брутал', 'Аврора', 'Терминал', 'Редакция', 'Неон', 'Хастл', 'Мечта', 'Тень', 'Престиж', 'Луна'],
    chat: 'Онлайн-чат', threads: 'Треды',
    telegram: 'Телеграм', whatsapp: 'Вотсап', instagram: 'Инстаграм',
    youtube: 'Ютуб', tiktok: 'ТикТок', linkedin: 'ЛинкедИн',
    avatarSettings: 'Аватар', showAvatar: 'Показать аватар',
    avatarRound: 'Круг', avatarSquare: 'Квадрат', avatarUrl: 'Ссылка на фото',
    stateOn: 'Вкл', stateOff: 'Выкл', stateHide: 'Скрыть',
    reason: 'Причина', comingSoon: 'Скоро',
    particles: 'Частицы', density: 'Плотность', speed: 'Скорость',
    minSize: 'Мин размер', maxSize: 'Макс размер', opacity: 'Прозрачность',
    collectPhone: 'Собирать телефон', collectEmail: 'Собирать email',
    contactTitle: 'Свяжитесь с нами', phonePlaceholder: 'Ваш телефон',
    emailPlaceholder: 'Ваш email', submit: 'Отправить', thankYou: 'Спасибо!',
  },
  es: {
    settings: 'Ajustes', design: 'Diseño', theme: 'Tema', language: 'Idioma',
    profile: 'Perfil', links: 'Enlaces', contactForm: 'Formulario',
    auto: 'Auto', light: 'Claro', dark: 'Oscuro',
    namePlaceholder: 'Tu nombre', bioPlaceholder: 'Breve descripción',
    designs: ['Brutal', 'Aurora', 'Terminal', 'Editorial', 'Neón', 'Hustle', 'Soñar', 'Sombra', 'Prestigio', 'Luna'],
    chat: 'Chat en línea',
    telegram: 'Telegram', whatsapp: 'WhatsApp', instagram: 'Instagram',
    youtube: 'YouTube', tiktok: 'TikTok', linkedin: 'LinkedIn',
    stateOn: 'Sí', stateOff: 'No', stateHide: 'Ocultar',
    reason: 'Razón', comingSoon: 'Próximamente',
    collectPhone: 'Recoger teléfono', collectEmail: 'Recoger email',
    contactTitle: 'Contáctanos', phonePlaceholder: 'Tu teléfono',
    emailPlaceholder: 'Tu email', submit: 'Enviar', thankYou: '¡Gracias!',
  },
  de: {
    settings: 'Einstellungen', design: 'Design', theme: 'Thema', language: 'Sprache',
    profile: 'Profil', links: 'Links', contactForm: 'Kontaktformular',
    auto: 'Auto', light: 'Hell', dark: 'Dunkel',
    namePlaceholder: 'Dein Name', bioPlaceholder: 'Kurze Beschreibung',
    designs: ['Brutal', 'Aurora', 'Terminal', 'Redaktion', 'Neon', 'Hustle', 'Traum', 'Schatten', 'Prestige', 'Mond'],
    chat: 'Online-Chat',
    telegram: 'Telegram', whatsapp: 'WhatsApp', instagram: 'Instagram',
    youtube: 'YouTube', tiktok: 'TikTok', linkedin: 'LinkedIn',
    stateOn: 'An', stateOff: 'Aus', stateHide: 'Verbergen',
    reason: 'Grund', comingSoon: 'Demnächst',
    collectPhone: 'Telefon erfassen', collectEmail: 'E-Mail erfassen',
    contactTitle: 'Kontakt', phonePlaceholder: 'Deine Telefonnummer',
    emailPlaceholder: 'Deine E-Mail', submit: 'Senden', thankYou: 'Danke!',
  },
  it: {
    settings: 'Impostazioni', design: 'Design', theme: 'Tema', language: 'Lingua',
    profile: 'Profilo', links: 'Link', contactForm: 'Modulo di contatto',
    auto: 'Auto', light: 'Chiaro', dark: 'Scuro',
    namePlaceholder: 'Il tuo nome', bioPlaceholder: 'Breve descrizione',
    designs: ['Brutale', 'Aurora', 'Terminale', 'Editoriale', 'Neon', 'Hustle', 'Sognante', 'Ombra', 'Prestigio', 'Luna'],
    chat: 'Chat online',
    telegram: 'Telegram', whatsapp: 'WhatsApp', instagram: 'Instagram',
    youtube: 'YouTube', tiktok: 'TikTok', linkedin: 'LinkedIn',
    avatarSettings: 'Avatar', showAvatar: 'Mostra avatar',
    avatarRound: 'Rotondo', avatarSquare: 'Quadrato', avatarUrl: 'URL immagine',
    stateOn: 'On', stateOff: 'Off', stateHide: 'Nascondi',
    reason: 'Motivo', comingSoon: 'Prossimamente',
    particles: 'Particelle', density: 'Densità', speed: 'Velocità',
    minSize: 'Dimensione min', maxSize: 'Dimensione max', opacity: 'Opacità',
    collectPhone: 'Raccogli telefono', collectEmail: 'Raccogli email',
    contactTitle: 'Contattaci', phonePlaceholder: 'Il tuo telefono',
    emailPlaceholder: 'La tua email', submit: 'Invia', thankYou: 'Grazie!',
  },
  fr: {
    settings: 'Paramètres', design: 'Design', theme: 'Thème', language: 'Langue',
    profile: 'Profil', links: 'Liens', contactForm: 'Formulaire',
    auto: 'Auto', light: 'Clair', dark: 'Sombre',
    namePlaceholder: 'Votre nom', bioPlaceholder: 'Courte description',
    designs: ['Brutal', 'Aurora', 'Terminal', 'Éditorial', 'Néon', 'Hustle', 'Rêveur', 'Ombre', 'Prestige', 'Lune'],
    chat: 'Chat en ligne',
    telegram: 'Telegram', whatsapp: 'WhatsApp', instagram: 'Instagram',
    youtube: 'YouTube', tiktok: 'TikTok', linkedin: 'LinkedIn',
    stateOn: 'Oui', stateOff: 'Non', stateHide: 'Masquer',
    reason: 'Raison', comingSoon: 'Bientôt',
    collectPhone: 'Collecter téléphone', collectEmail: 'Collecter email',
    contactTitle: 'Contactez-nous', phonePlaceholder: 'Votre téléphone',
    emailPlaceholder: 'Votre email', submit: 'Envoyer', thankYou: 'Merci !',
  },
  pt: {
    settings: 'Configurações', design: 'Design', theme: 'Tema', language: 'Idioma',
    profile: 'Perfil', links: 'Links', contactForm: 'Formulário',
    auto: 'Auto', light: 'Claro', dark: 'Escuro',
    namePlaceholder: 'Seu nome', bioPlaceholder: 'Breve descrição',
    designs: ['Brutal', 'Aurora', 'Terminal', 'Editorial', 'Neon', 'Hustle', 'Dreamy', 'Shadow', 'Prestige', 'Moon'],
    chat: 'Chat online',
    telegram: 'Telegram', whatsapp: 'WhatsApp', instagram: 'Instagram',
    youtube: 'YouTube', tiktok: 'TikTok', linkedin: 'LinkedIn',
    stateOn: 'Sim', stateOff: 'Não', stateHide: 'Ocultar',
    reason: 'Motivo', comingSoon: 'Em breve',
    collectPhone: 'Coletar telefone', collectEmail: 'Coletar email',
    contactTitle: 'Entre em contato', phonePlaceholder: 'Seu telefone',
    emailPlaceholder: 'Seu email', submit: 'Enviar', thankYou: 'Obrigado!',
  },
  zh: {
    settings: '设置', design: '设计', theme: '主题', language: '语言',
    profile: '个人资料', links: '链接', contactForm: '联系表单',
    auto: '自动', light: '浅色', dark: '深色',
    namePlaceholder: '你的名字', bioPlaceholder: '简短介绍',
    designs: ['粗野', '极光', '终端', '编辑', '霓虹', '奋斗', '梦幻', '暗影', '尊贵', '月亮'],
    chat: '在线聊天',
    telegram: 'Telegram', whatsapp: 'WhatsApp', instagram: 'Instagram',
    youtube: 'YouTube', tiktok: 'TikTok', linkedin: 'LinkedIn',
    stateOn: '开', stateOff: '关', stateHide: '隐藏',
    reason: '原因', comingSoon: '即将推出',
    collectPhone: '收集电话', collectEmail: '收集邮箱',
    contactTitle: '联系我们', phonePlaceholder: '您的电话',
    emailPlaceholder: '您的邮箱', submit: '发送', thankYou: '谢谢！',
  },
  ja: {
    settings: '設定', design: 'デザイン', theme: 'テーマ', language: '言語',
    profile: 'プロフィール', links: 'リンク', contactForm: 'お問い合わせ',
    auto: '自動', light: 'ライト', dark: 'ダーク',
    namePlaceholder: '名前', bioPlaceholder: '自己紹介',
    designs: ['ブルータル', 'オーロラ', 'ターミナル', 'エディトリアル', 'ネオン', 'ハッスル', 'ドリーミー', 'シャドウ', 'プレステージ', 'ムーン'],
    chat: 'オンラインチャット',
    telegram: 'Telegram', whatsapp: 'WhatsApp', instagram: 'Instagram',
    youtube: 'YouTube', tiktok: 'TikTok', linkedin: 'LinkedIn',
    stateOn: 'オン', stateOff: 'オフ', stateHide: '非表示',
    reason: '理由', comingSoon: '近日公開',
    collectPhone: '電話を収集', collectEmail: 'メールを収集',
    contactTitle: 'お問い合わせ', phonePlaceholder: 'お電話番号',
    emailPlaceholder: 'メールアドレス', submit: '送信', thankYou: 'ありがとう！',
  },
  ko: {
    settings: '설정', design: '디자인', theme: '테마', language: '언어',
    profile: '프로필', links: '링크', contactForm: '연락 양식',
    auto: '자동', light: '라이트', dark: '다크',
    namePlaceholder: '이름', bioPlaceholder: '소개',
    designs: ['브루탈', '오로라', '터미널', '에디토리얼', '네온', '허슬', '드리미', '섀도우', '프레스티지', '문'],
    chat: '온라인 채팅',
    telegram: 'Telegram', whatsapp: 'WhatsApp', instagram: 'Instagram',
    youtube: 'YouTube', tiktok: 'TikTok', linkedin: 'LinkedIn',
    stateOn: '켜기', stateOff: '끄기', stateHide: '숨기기',
    reason: '이유', comingSoon: '곧 제공',
    collectPhone: '전화번호 수집', collectEmail: '이메일 수집',
    contactTitle: '연락하기', phonePlaceholder: '전화번호',
    emailPlaceholder: '이메일', submit: '보내기', thankYou: '감사합니다!',
  },
  ar: {
    settings: 'الإعدادات', design: 'التصميم', theme: 'السمة', language: 'اللغة',
    profile: 'الملف الشخصي', links: 'الروابط', contactForm: 'نموذج الاتصال',
    auto: 'تلقائي', light: 'فاتح', dark: 'داكن',
    namePlaceholder: 'اسمك', bioPlaceholder: 'نبذة مختصرة',
    designs: ['بروتال', 'أورورا', 'طرفية', 'تحريري', 'نيون', 'هاسل', 'حالم', 'ظل', 'برستيج', 'قمر'],
    chat: 'محادثة مباشرة',
    telegram: 'تيليجرام', whatsapp: 'واتساب', instagram: 'إنستغرام',
    youtube: 'يوتيوب', tiktok: 'تيك توك', linkedin: 'لينكد إن',
    stateOn: 'تشغيل', stateOff: 'إيقاف', stateHide: 'إخفاء',
    reason: 'السبب', comingSoon: 'قريبا',
    collectPhone: 'جمع الهاتف', collectEmail: 'جمع البريد',
    contactTitle: 'تواصل معنا', phonePlaceholder: 'رقم هاتفك',
    emailPlaceholder: 'بريدك الإلكتروني', submit: 'إرسال', thankYou: 'شكرا لك!',
  },
};

const LANG_NAMES = {
  en: 'English', ru: 'Русский', es: 'Español', de: 'Deutsch', it: 'Italiano',
  fr: 'Français', pt: 'Português', zh: '中文', ja: '日本語', ko: '한국어', ar: 'العربية',
};

const RTL_LANGS = new Set(['ar']);
const URL_PARAMS = new URLSearchParams(window.location.search);
const EARLY_BOOTSTRAP_STATE = window.__LD_BOOTSTRAP__ || {};
const APP_CONFIG = {
  previewMode: URL_PARAMS.get('preview') === '1',
};
const ALL_DESIGNS = [1,2,3,4,5,6,7,8,9,10];
const SUPPORTED_DESIGNS = ALL_DESIGNS;
const TELEGRAM_ENDPOINTS = {
  status: '/api/telegram/status',
  challenge: '/api/telegram/challenge',
  lead: '/api/telegram/lead',
};
const QUIZ_FIELD_QUERY_KEYS = [
  'fields',
  'fields[]',
  'field',
  'field[]',
  'quiz_fields',
  'quiz_field',
  'answers',
  'answers[]',
  'answer',
  'answer[]',
];

// ============================================
// 2. ANALYTICS
// ============================================
const POSTHOG_STORAGE_KEYS = {
  apiKey: 'ld_posthog_api_key',
  apiHost: 'ld_posthog_api_host',
  cachedDesign: 'ld_cached_design',
  cachedVariant: 'ld_cached_variant',
};

const DEFAULT_DESIGN_VARIANTS = {
  control: 1,
  'design-1': 1,
  'design-2': 2,
  test: 2,
  'variant-a': 1,
  'variant-b': 2,
};
const DEFAULT_FEATURE_FLAG_KEYS = {
  uiConfig: 'linkdrop-ui-config',
  profileExperiment: 'linkdrop-profile-experiment',
  contactOptionsExperiment: 'linkdrop-contact-options-experiment',
};

// Keeps analytics configurable without adding a build step to this static page.
function getPostHogConfig() {
  const runtimeConfig = window.__POSTHOG_CONFIG__ || {};
  const queryApiKey = URL_PARAMS.get('ph_project_api_key');
  const queryApiHost = URL_PARAMS.get('ph_api_host');
  const queryVariantOverride = URL_PARAMS.get('ld_variant');
  const queryDesignOverride = URL_PARAMS.get('ld_design');

  if (queryApiKey) localStorage.setItem(POSTHOG_STORAGE_KEYS.apiKey, queryApiKey);
  if (queryApiHost) localStorage.setItem(POSTHOG_STORAGE_KEYS.apiHost, queryApiHost);

  return {
    apiKey: queryApiKey || runtimeConfig.apiKey || localStorage.getItem(POSTHOG_STORAGE_KEYS.apiKey) || 'phc_vLNT4zvNhGveqPm9ekmS4zHGMSGp8EXSJZczgwn9Lj4o',
    apiHost: queryApiHost || runtimeConfig.apiHost || localStorage.getItem(POSTHOG_STORAGE_KEYS.apiHost) || 'https://eu.i.posthog.com',
    uiHost: runtimeConfig.uiHost || 'https://eu.posthog.com',
    designFlagKey: runtimeConfig.designFlagKey || 'landing-design-experiment',
    designVariants: { ...DEFAULT_DESIGN_VARIANTS, ...(runtimeConfig.designVariants || {}) },
    featureFlagKeys: { ...DEFAULT_FEATURE_FLAG_KEYS, ...(runtimeConfig.featureFlagKeys || {}) },
    variantOverride: queryVariantOverride || runtimeConfig.variantOverride || '',
    designOverride: queryDesignOverride || runtimeConfig.designOverride || '',
    debug: URL_PARAMS.get('ph_debug') === '1' || runtimeConfig.debug === true,
  };
}

const POSTHOG_CONFIG = getPostHogConfig();
const BOOTSTRAP_STATE = EARLY_BOOTSTRAP_STATE;
const uiState = {
  pendingInitialPaint: true,
  appReady: false,
};

function isSupportedDesign(design) {
  return Number.isInteger(design) && SUPPORTED_DESIGNS.includes(design);
}

function getDefaultDesign() {
  return SUPPORTED_DESIGNS[0] || 1;
}

function getInitialDesign() {
  const bootDesign = Number(BOOTSTRAP_STATE.initialDesign);
  return isSupportedDesign(bootDesign) ? bootDesign : getDefaultDesign();
}

function getInitialDesignSource() {
  if (BOOTSTRAP_STATE.source) return BOOTSTRAP_STATE.source;
  if (POSTHOG_CONFIG.variantOverride || POSTHOG_CONFIG.designOverride) return 'override';
  return 'default';
}

function getBootstrapConfig() {
  if (!BOOTSTRAP_STATE.distinctID && !BOOTSTRAP_STATE.featureFlags) return undefined;
  return {
    distinctID: BOOTSTRAP_STATE.distinctID,
    featureFlags: BOOTSTRAP_STATE.featureFlags,
    featureFlagPayloads: BOOTSTRAP_STATE.featureFlagPayloads || {},
  };
}

function getBootstrapFeatureFlagPayload(flagKey) {
  if (!flagKey) return null;
  const payloads = BOOTSTRAP_STATE.featureFlagPayloads || {};
  return payloads[flagKey] ?? null;
}

function getRuntimeFeatureFlagPayload(flagKey) {
  if (!flagKey || typeof posthog.getFeatureFlagPayload !== 'function') return null;
  return posthog.getFeatureFlagPayload(flagKey) ?? null;
}

function getBootstrapFeatureFlagValue(flagKey) {
  if (!flagKey) return null;
  const flags = BOOTSTRAP_STATE.featureFlags || {};
  return flags[flagKey] ?? null;
}

function getRuntimeFeatureFlagValue(flagKey) {
  if (!flagKey || typeof posthog.getFeatureFlag !== 'function') return null;
  return posthog.getFeatureFlag(flagKey) ?? null;
}

function getFeatureFlagVariant(flagKey, source = 'runtime') {
  return source === 'runtime'
    ? getRuntimeFeatureFlagValue(flagKey)
    : getBootstrapFeatureFlagValue(flagKey);
}

function normalizeFeatureFlagPayload(value) {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}

function persistCachedAssignment(design, variant) {
  try {
    if (isSupportedDesign(design)) {
      localStorage.setItem(POSTHOG_STORAGE_KEYS.cachedDesign, String(design));
    } else {
      localStorage.removeItem(POSTHOG_STORAGE_KEYS.cachedDesign);
    }

    if (variant) {
      localStorage.setItem(POSTHOG_STORAGE_KEYS.cachedVariant, String(variant));
    } else {
      localStorage.removeItem(POSTHOG_STORAGE_KEYS.cachedVariant);
    }
  } catch (error) {
    console.warn('Failed to persist experiment assignment', error);
  }
}

function releaseInitialPaint() {
  if (!uiState.pendingInitialPaint && uiState.appReady) return;
  uiState.pendingInitialPaint = false;
  uiState.appReady = true;
  updateBodyClasses();
}

function updateBodyClasses() {
  document.body.className = [
    `design-${state.design}`,
    getEffectiveTheme(),
    !APP_CONFIG.previewMode ? 'prod-mode' : '',
    uiState.pendingInitialPaint ? 'ld-pending-variant' : '',
    uiState.appReady ? 'ld-app-ready' : '',
  ].filter(Boolean).join(' ');
}

const analyticsState = {
  ready: false,
  loadPromise: null,
  sessionStartedAt: Date.now(),
  experimentAssigned: BOOTSTRAP_STATE.experimentAssigned === true,
  experimentVariant: BOOTSTRAP_STATE.flagVariant || 'control',
  designSource: getInitialDesignSource(),
  summarySent: false,
  featureViewSent: false,
  featureInteractionSent: false,
  totalPrimaryActions: 0,
  totalLinkClicks: 0,
  disabledLinkClicks: 0,
  settingsOpenCount: 0,
  contactStarted: false,
  contactSubmitted: false,
  firstPrimaryActionAt: null,
};

const telegramLeadState = {
  initialized: false,
  available: false,
  busy: false,
  success: false,
  scriptUrl: '',
  scriptPromise: null,
};

function isAnalyticsReady() {
  return analyticsState.ready && typeof posthog.capture === 'function';
}

function getVisibleLinkIds() {
  return state.links.filter(link => link.state !== 'hidden').map(link => link.id);
}

function getActiveLinkIds() {
  return state.links.filter(link => link.state === 'active').map(link => link.id);
}

function getEnabledContactFields() {
  return Object.entries(state.contactForm)
    .filter(([, enabled]) => enabled)
    .map(([field]) => field);
}

function syncAnalyticsContext() {
  if (!isAnalyticsReady()) return;
  posthog.register({
    current_design: state.design,
    configured_theme: state.theme,
    effective_theme: getEffectiveTheme(),
    language: getEffectiveLang(),
    design_source: analyticsState.designSource,
    experiment_variant: analyticsState.experimentVariant,
    profile_experiment_variant: getFeatureFlagVariant(POSTHOG_CONFIG.featureFlagKeys.profileExperiment, 'runtime') || 'control',
    contact_options_experiment_variant: getFeatureFlagVariant(POSTHOG_CONFIG.featureFlagKeys.contactOptionsExperiment, 'runtime') || 'control',
  });
}

function captureAnalyticsEvent(eventName, properties = {}) {
  if (!isAnalyticsReady()) return;
  posthog.capture(eventName, properties);
}

function resolveDesignFromVariant(variant) {
  if (variant === null || variant === undefined || variant === false) return null;
  const normalized = String(variant).trim().toLowerCase();
  const mapped = POSTHOG_CONFIG.designVariants[normalized];
  if (isSupportedDesign(mapped)) return mapped;
  if (normalized === 'test' || normalized === 'variant' || normalized === 'variant-b') {
    return isSupportedDesign(2) ? 2 : null;
  }
  if (normalized === 'variant-a') return isSupportedDesign(1) ? 1 : null;
  const match = normalized.match(/(?:design[-_ ]?)?(\d{1,2})/);
  if (!match) return null;
  const design = Number(match[1]);
  return isSupportedDesign(design) ? design : null;
}

function getResolvedOverrideVariant() {
  if (POSTHOG_CONFIG.variantOverride) return POSTHOG_CONFIG.variantOverride;
  if (POSTHOG_CONFIG.designOverride) return `design-${POSTHOG_CONFIG.designOverride}`;
  return '';
}

function maybeCaptureFeatureView() {
  if (!POSTHOG_CONFIG.designFlagKey || !analyticsState.experimentAssigned || analyticsState.featureViewSent) return;
  captureAnalyticsEvent('$feature_view', { feature_flag: POSTHOG_CONFIG.designFlagKey });
  analyticsState.featureViewSent = true;
}

function maybeCaptureFeatureInteraction(trigger) {
  if (!POSTHOG_CONFIG.designFlagKey || !analyticsState.experimentAssigned || analyticsState.featureInteractionSent) return;
  captureAnalyticsEvent('$feature_interaction', {
    feature_flag: POSTHOG_CONFIG.designFlagKey,
    trigger,
  });
  analyticsState.featureInteractionSent = true;
}

function notePrimaryAction(trigger) {
  analyticsState.totalPrimaryActions += 1;
  if (!analyticsState.firstPrimaryActionAt) analyticsState.firstPrimaryActionAt = Date.now();
  maybeCaptureFeatureInteraction(trigger);
}

function applyDesignSelection(nextDesign, source) {
  if (!isSupportedDesign(nextDesign)) return;
  const changed = state.design !== nextDesign || analyticsState.designSource !== source;
  state.design = nextDesign;
  analyticsState.designSource = source;
  persistCachedAssignment(nextDesign, source === 'experiment' ? analyticsState.experimentVariant : '');
  onDesignChange();
  syncAnalyticsContext();
  if (!changed) return;
  captureAnalyticsEvent('linkdrop_design_applied', {
    selected_design: nextDesign,
    source,
    experiment_variant: analyticsState.experimentVariant,
  });
}

function applyExperimentVariant(variant) {
  const hasAssignment = variant !== null && variant !== undefined && variant !== false;
  analyticsState.experimentAssigned = hasAssignment;
  analyticsState.experimentVariant = hasAssignment ? String(variant) : 'control';
  if (hasAssignment && analyticsState.designSource !== 'manual') analyticsState.designSource = 'experiment';
  if (!hasAssignment && analyticsState.designSource !== 'manual') analyticsState.designSource = 'default';
  maybeCaptureFeatureView();

  const defaultDesign = getDefaultDesign();
  const experimentDesign = resolveDesignFromVariant(variant);
  if (!hasAssignment && analyticsState.designSource !== 'manual') {
    persistCachedAssignment(defaultDesign, '');
    if (state.design !== defaultDesign || analyticsState.designSource !== 'default') {
      applyDesignSelection(defaultDesign, 'default');
    } else {
      syncAnalyticsContext();
      captureAnalyticsEvent('linkdrop_design_applied', {
        selected_design: state.design,
        source: 'default',
        experiment_variant: analyticsState.experimentVariant,
      });
    }
    releaseInitialPaint();
    return;
  }

  if (hasAssignment && !experimentDesign && analyticsState.designSource !== 'manual') {
    persistCachedAssignment(defaultDesign, '');
    console.warn(`Unsupported experiment variant "${variant}" for supported designs: ${SUPPORTED_DESIGNS.join(', ')}`);
    if (state.design !== defaultDesign) {
      applyDesignSelection(defaultDesign, 'default');
    } else {
      syncAnalyticsContext();
    }
    releaseInitialPaint();
    return;
  }

  if (experimentDesign && analyticsState.designSource !== 'manual') {
    applyDesignSelection(experimentDesign, 'experiment');
  } else {
    syncAnalyticsContext();
    captureAnalyticsEvent('linkdrop_design_applied', {
      selected_design: state.design,
      source: hasAssignment ? 'experiment' : 'default',
      experiment_variant: analyticsState.experimentVariant,
    });
  }
  releaseInitialPaint();
}

function sendSessionSummary(reason) {
  if (!isAnalyticsReady()) return;
  if (analyticsState.summarySent) return;
  analyticsState.summarySent = true;
  captureAnalyticsEvent('linkdrop_session_summary', {
    reason,
    session_duration_ms: Date.now() - analyticsState.sessionStartedAt,
    total_primary_actions: analyticsState.totalPrimaryActions,
    total_link_clicks: analyticsState.totalLinkClicks,
    disabled_link_clicks: analyticsState.disabledLinkClicks,
    settings_open_count: analyticsState.settingsOpenCount,
    contact_started: analyticsState.contactStarted,
    contact_submitted: analyticsState.contactSubmitted,
    exited_without_primary_action: analyticsState.totalPrimaryActions === 0,
    profile_experiment_variant: getFeatureFlagVariant(POSTHOG_CONFIG.featureFlagKeys.profileExperiment, 'runtime') || 'control',
    contact_options_experiment_variant: getFeatureFlagVariant(POSTHOG_CONFIG.featureFlagKeys.contactOptionsExperiment, 'runtime') || 'control',
    first_primary_action_ms: analyticsState.firstPrimaryActionAt
      ? analyticsState.firstPrimaryActionAt - analyticsState.sessionStartedAt
      : null,
    visible_link_ids: getVisibleLinkIds(),
    active_link_ids: getActiveLinkIds(),
    enabled_contact_fields: getEnabledContactFields(),
  });
}

async function setupAnalytics() {
  if (!POSTHOG_CONFIG.apiKey) {
    releaseInitialPaint();
    return;
  }
  try {
    posthog.init(POSTHOG_CONFIG.apiKey, {
      api_host: POSTHOG_CONFIG.apiHost,
      ui_host: POSTHOG_CONFIG.uiHost,
      defaults: '2026-01-30',
      bootstrap: getBootstrapConfig(),
      autocapture: true,
      capture_pageview: 'history_change',
      capture_pageleave: true,
      capture_dead_clicks: true,
      rageclick: true,
      debug: POSTHOG_CONFIG.debug,
      loaded: () => {
        analyticsState.ready = true;
        syncAnalyticsContext();
        captureAnalyticsEvent('linkdrop_session_started', {
          entry_design: state.design,
          profile_experiment_variant: getFeatureFlagVariant(POSTHOG_CONFIG.featureFlagKeys.profileExperiment, 'runtime') || 'control',
          contact_options_experiment_variant: getFeatureFlagVariant(POSTHOG_CONFIG.featureFlagKeys.contactOptionsExperiment, 'runtime') || 'control',
          visible_link_ids: getVisibleLinkIds(),
          active_link_ids: getActiveLinkIds(),
          enabled_contact_fields: getEnabledContactFields(),
        });
        if (!POSTHOG_CONFIG.designFlagKey) releaseInitialPaint();
      },
    });

    const overrideVariant = getResolvedOverrideVariant();
    if (overrideVariant) {
      applyExperimentVariant(overrideVariant);
      return;
    }

    if (POSTHOG_CONFIG.designFlagKey && typeof posthog.onFeatureFlags === 'function') {
      posthog.onFeatureFlags(() => {
        applyFeatureDrivenConfig('runtime');
        renderProfile();
        renderLinks();
        renderContactForm();
        applyExperimentVariant(posthog.getFeatureFlag(POSTHOG_CONFIG.designFlagKey));
      });
    } else {
      releaseInitialPaint();
    }
  } catch (error) {
    console.warn('PostHog failed to load', error);
    releaseInitialPaint();
  }
}

// ============================================
// 3. SVG ICONS
// ============================================
const ICONS = {
  telegram: `<svg viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.52-.08-.15-.68-1.64-.93-2.25-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zm-5.42 7.4A9.87 9.87 0 0 1 7 20.15l-.36-.21-3.73.98.99-3.63-.24-.37a9.87 9.87 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89a9.89 9.89 0 0 1 9.89 9.89c0 5.46-4.44 9.9-9.9 9.9zm8.41-18.3A11.82 11.82 0 0 0 12.05.03C5.49.03.13 5.39.13 11.96c0 2.11.55 4.17 1.6 5.99L.01 24l6.2-1.63a11.85 11.85 0 0 0 5.84 1.53c6.56 0 11.92-5.37 11.92-11.93a11.85 11.85 0 0 0-3.5-8.42z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85 0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.87.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24"><path d="M19.32 6.95A4.78 4.78 0 0 1 16.5 5.6V1h-3.75v14.37a2.88 2.88 0 0 1-2.87 2.63 2.88 2.88 0 0 1-2.88-2.88 2.88 2.88 0 0 1 2.88-2.87c.3 0 .6.05.87.13V7.5a6.63 6.63 0 0 0-.87-.06A6.63 6.63 0 0 0 3.25 14.1 6.63 6.63 0 0 0 9.88 20.7a6.63 6.63 0 0 0 6.62-6.63V8.65a8.52 8.52 0 0 0 4.98 1.6V6.5a4.8 4.8 0 0 1-2.16.45z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77A1.75 1.75 0 0 0 0 1.73v20.54A1.75 1.75 0 0 0 1.77 24h20.46A1.75 1.75 0 0 0 24 22.27V1.73A1.75 1.75 0 0 0 22.23 0z"/></svg>`,
  chat: `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>`,
  threads: `<svg viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/></svg>`,
  phone: `<svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1v3.49a1 1 0 0 1-1 1A17 17 0 0 1 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>`,
  email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
};

// ============================================
// 3. STATE
// ============================================
const state = {
  design: getInitialDesign(),
  theme: 'auto',
  lang: 'auto',
  name: 'Alex Morgan',
  bio: 'Creative Developer & Designer',
  profile: { showName: true, showDescription: false, nameValue: null, descriptionValue: null },
  avatar: { show: false, shape: 'round', url: '' },
  particleDensity: 20,
  particleSpeed: 1,
  particleMinSize: 60,
  particleMaxSize: 180,
  particleOpacity: 0.5,
  contactForm: { phone: false, email: false },
  links: [
    { id: 'telegram',  state: 'active',   url: 'https://t.me/username', disabledReason: '', label: null },
    { id: 'whatsapp',  state: 'hidden',   url: 'https://wa.me/1234567890', disabledReason: '', label: null },
    { id: 'instagram', state: 'hidden',   url: 'https://instagram.com/username', disabledReason: '', label: null },
    { id: 'youtube',   state: 'hidden',   url: '', disabledReason: '', label: null },
    { id: 'tiktok',    state: 'hidden',   url: '', disabledReason: '', label: null },
    { id: 'threads',   state: 'hidden',   url: '', disabledReason: '', label: null },
    { id: 'chat',      state: 'active',   url: 'https://sergiosapp.vip/?no_cloak=1', disabledReason: '', label: null },
    { id: 'linkedin',  state: 'hidden',   url: '', disabledReason: '', label: null },
  ],
};

const BASE_LINK_DEFAULTS = Object.fromEntries(
  state.links.map((link) => [link.id, {
    state: link.state,
    url: link.url,
    disabledReason: link.disabledReason,
    label: link.label,
  }]),
);
const BASE_PROFILE_COPY = {
  name: state.name,
  bio: state.bio,
  nameValue: state.profile.nameValue,
  descriptionValue: state.profile.descriptionValue,
};
const BASE_FEATURE_STATE = {
  nameShow: true,
  avatarShow: false,
  avatarShape: 'round',
  avatarUrl: '',
  descriptionShow: false,
  phoneShow: false,
  emailShow: false,
  links: {
    telegram: 'active',
    whatsapp: 'hidden',
    instagram: 'hidden',
    youtube: 'hidden',
    tiktok: 'hidden',
    threads: 'hidden',
    chat: 'active',
    linkedin: 'hidden',
  },
};
let uiTextOverrides = {};

// ============================================
// 4. UTILITY FUNCTIONS
// ============================================
function detectLanguage() {
  const nav = navigator.language || navigator.userLanguage || 'en';
  const code = nav.split('-')[0].toLowerCase();
  return T[code] ? code : 'en';
}

function getEffectiveLang() {
  return state.lang === 'auto' ? detectLanguage() : state.lang;
}

function t(key) {
  const lang = getEffectiveLang();
  const overrideForLang = uiTextOverrides?.[lang]?.[key];
  if (overrideForLang) return overrideForLang;
  const builtIn = (T[lang] && T[lang][key]) || T.en[key];
  if (builtIn) return builtIn;
  const englishOverride = uiTextOverrides?.en?.[key];
  return englishOverride || key;
}

function resolveLocalizedContent(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value !== 'object' || Array.isArray(value)) return '';
  const lang = getEffectiveLang();
  return value[lang] || value.en || '';
}

function getEffectiveTheme() {
  if (state.theme === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return state.theme;
}

function getInitials(name) {
  return name.split(/\s+/).map(w => w[0] || '').slice(0, 2).join('').toUpperCase() || '?';
}

// Query param capture & forwarding
function captureQueryParams() {
  const params = window.location.search.slice(1);
  if (params) localStorage.setItem('ld_params', params);
}

function getStoredParams() {
  return localStorage.getItem('ld_params') || '';
}

function getStoredSearchParams() {
  return new URLSearchParams(getStoredParams());
}

function appendParams(url) {
  if (!url || url === '#') return url;
  const stored = getStoredParams();
  if (!stored) return url;
  try {
    const u = new URL(url, window.location.origin);
    const extra = new URLSearchParams(stored);
    extra.forEach((v, k) => { if (!u.searchParams.has(k)) u.searchParams.set(k, v); });
    return u.toString();
  } catch {
    return url + (url.includes('?') ? '&' : '?') + stored;
  }
}

function normalizeQuizFieldValue(value) {
  if (typeof value !== 'string') return '';
  return value.trim();
}

function parseQuotedArrayLikeValue(value) {
  if (typeof value !== 'string') return [];
  const trimmed = value.trim();
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) return [];

  try {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed.map(normalizeQuizFieldValue).filter(Boolean) : [];
  } catch (error) {
    const matches = [...trimmed.matchAll(/'([^']*)'|"([^"]*)"/g)];
    return matches
      .map((match) => normalizeQuizFieldValue(match[1] ?? match[2] ?? ''))
      .filter(Boolean);
  }
}

function parseQuizFieldParamValue(value) {
  const arrayValue = parseQuotedArrayLikeValue(value);
  if (arrayValue.length) return arrayValue;

  const normalized = normalizeQuizFieldValue(value);
  return normalized ? [normalized] : [];
}

function extractQuizFieldsFromSearchParams(searchParams) {
  const collected = [];
  const seen = new Set();

  QUIZ_FIELD_QUERY_KEYS.forEach((key) => {
    searchParams.getAll(key).forEach((rawValue) => {
      parseQuizFieldParamValue(rawValue).forEach((field) => {
        if (seen.has(field)) return;
        seen.add(field);
        collected.push(field);
      });
    });
  });

  return collected;
}

function getQuizFields() {
  const currentFields = extractQuizFieldsFromSearchParams(URL_PARAMS);
  if (currentFields.length) return currentFields;
  return extractQuizFieldsFromSearchParams(getStoredSearchParams());
}

function getTelegramLeadButtonLabel() {
  if (telegramLeadState.success) return t('telegramLeadSuccess');
  if (telegramLeadState.busy) return t('telegramLeadSending');
  return t('telegramLeadButton');
}

async function parseJsonResponse(response, fallbackMessage) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || fallbackMessage);
  }
  return payload;
}

function loadTelegramLoginScript(scriptUrl) {
  if (telegramLeadState.scriptPromise) return telegramLeadState.scriptPromise;

  telegramLeadState.scriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-telegram-login-script="1"]');
    if (existingScript) {
      if (window.Telegram?.Login) {
        resolve(window.Telegram.Login);
        return;
      }
      existingScript.addEventListener('load', () => resolve(window.Telegram?.Login), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Telegram Login SDK failed to load.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.dataset.telegramLoginScript = '1';
    script.onload = () => {
      if (!window.Telegram?.Login) {
        reject(new Error('Telegram Login SDK did not initialize.'));
        return;
      }
      resolve(window.Telegram.Login);
    };
    script.onerror = () => reject(new Error('Telegram Login SDK failed to load.'));
    document.head.appendChild(script);
  });

  telegramLeadState.scriptPromise = telegramLeadState.scriptPromise.catch((error) => {
    telegramLeadState.scriptPromise = null;
    throw error;
  });

  return telegramLeadState.scriptPromise;
}

async function initializeTelegramLead() {
  try {
    const response = await fetch(TELEGRAM_ENDPOINTS.status, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
    });
    const payload = await parseJsonResponse(response, t('telegramLeadUnavailable'));
    telegramLeadState.available = payload.enabled === true;
    telegramLeadState.scriptUrl = payload.scriptUrl || '';
  } catch (error) {
    telegramLeadState.available = false;
    telegramLeadState.scriptUrl = '';
  } finally {
    telegramLeadState.initialized = true;
    renderContactForm();
  }
}

async function startTelegramLeadAuth() {
  if (telegramLeadState.busy || telegramLeadState.success) return;

  const quizFields = getQuizFields();
  if (!quizFields.length) {
    showToast(t('telegramLeadMissingFields'));
    return;
  }

  telegramLeadState.busy = true;
  renderContactForm();
  captureAnalyticsEvent('linkdrop_telegram_auth_started', {
    quiz_field_count: quizFields.length,
  });

  try {
    const challengeResponse = await fetch(TELEGRAM_ENDPOINTS.challenge, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
    });
    const challenge = await parseJsonResponse(challengeResponse, t('telegramLeadUnavailable'));
    const telegramLogin = await loadTelegramLoginScript(challenge.scriptUrl || telegramLeadState.scriptUrl);

    await new Promise((resolve, reject) => {
      telegramLogin.auth(
        {
          client_id: Number(challenge.clientId),
          lang: getEffectiveLang(),
          nonce: challenge.nonce,
        },
        async (result) => {
          if (!result || result.error) {
            reject(new Error(result?.error || t('telegramLeadUnavailable')));
            return;
          }

          try {
            const leadResponse = await fetch(TELEGRAM_ENDPOINTS.lead, {
              method: 'POST',
              cache: 'no-store',
              credentials: 'include',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                idToken: result.id_token,
                quizFields,
              }),
            });

            await parseJsonResponse(leadResponse, t('telegramLeadUnavailable'));
            resolve();
          } catch (error) {
            reject(error);
          }
        },
      );
    });

    telegramLeadState.success = true;
    notePrimaryAction('telegram_auth');
    captureAnalyticsEvent('linkdrop_telegram_auth_succeeded', {
      quiz_field_count: quizFields.length,
    });
    renderContactForm();
    showToast(t('telegramLeadSuccess'));
  } catch (error) {
    const message = error instanceof Error ? error.message : t('telegramLeadUnavailable');
    captureAnalyticsEvent('linkdrop_telegram_auth_failed', {
      quiz_field_count: quizFields.length,
      error_message: message,
    });
    showToast(message);
  } finally {
    telegramLeadState.busy = false;
    renderContactForm();
  }
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

const PARTICLE_SETS = {
  6: ['money_0.webp','money_1.webp','money_2.webp','money_3.webp','money_4.webp','money_5.webp','money_6.webp','money_7.webp'],
  7: ['crystals_0.webp','crystals_1.webp','crystals_2.webp','crystals_3.webp','crystals_4.webp'],
  8: ['hacker_0.webp','hacker_1.webp','hacker_2.webp','hacker_3.webp','hacker_4.webp','hacker_5.webp','hacker_6.webp','hacker_7.webp'],
  9: ['luxury_0.webp','luxury_1.webp','luxury_2.webp','luxury_3.webp','luxury_4.webp','luxury_5.webp'],
  10: ['crypto_0.webp','crypto_1.webp','crypto_2.webp','crypto_3.webp','crypto_4.webp','crypto_5.webp','crypto_6.webp','crypto_7.webp'],
};

function renderParticles() {
  const c = document.getElementById('particles');
  c.innerHTML = '';
  const set = PARTICLE_SETS[state.design];
  if (!set) return;

  const vw = window.innerWidth;
  const mobile = vw < 600;
  const scale = mobile ? 0.35 : vw < 1024 ? 0.6 : 1;
  const count = Math.max(3, Math.round((state.particleDensity || 20) * scale));
  const speed = state.particleSpeed || 1;
  const minSize = Math.round((state.particleMinSize || 60) * (mobile ? 0.5 : 0.8));
  const maxSize = Math.round((state.particleMaxSize || 180) * (mobile ? 0.45 : 0.75));
  const opacity = (state.particleOpacity || 0.5) * (mobile ? 0.7 : 1);

  // Grid-based distribution: divide viewport into cells, place one particle per cell with jitter
  const cols = Math.ceil(Math.sqrt(count * 1.5));
  const rows = Math.ceil(count / cols);
  for (let i = 0; i < count; i++) {
    const img = document.createElement('img');
    img.src = 'assets/' + set[i % set.length];
    img.className = 'particle';
    const size = minSize + Math.random() * (maxSize - minSize);
    const dur = (12 + Math.random() * 16) / speed;
    const col = i % cols;
    const row = Math.floor(i / cols);
    // Each cell spans (100/cols)% wide and (100/rows)% tall, particle placed randomly within
    const cellW = 100 / cols;
    const cellH = 100 / rows;
    const left = col * cellW + Math.random() * cellW * 0.8;
    const top = row * cellH + Math.random() * cellH * 0.8;
    img.style.cssText = `
      top:${top}%;
      left:${left}%;
      width:${size}px;
      --rot:${Math.floor(Math.random() * 360)}deg;
      opacity:${opacity * (0.6 + Math.random() * 0.4)};
      animation-duration:${dur}s;
      animation-delay:${-Math.random() * dur}s;
    `;
    c.appendChild(img);
  }
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 2000);
}

// ============================================
// 5. RENDERING
// ============================================
function applyDesign() {
  updateBodyClasses();
}

function applyLanguage() {
  const lang = getEffectiveLang();
  const isRTL = RTL_LANGS.has(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

function renderProfile() {
  const name = document.getElementById('display-name');
  const resolvedName = resolveLocalizedContent(state.profile.nameValue) || state.name || t('namePlaceholder');
  name.textContent = resolvedName;
  name.classList.toggle('hidden', !state.profile.showName);
  const bio = document.getElementById('display-bio');
  const resolvedDescription = resolveLocalizedContent(state.profile.descriptionValue) || state.bio || '';
  const showDescription = state.profile.showDescription && Boolean(resolvedDescription.trim());
  bio.textContent = showDescription ? resolvedDescription : '';
  bio.classList.toggle('hidden', !showDescription);
  const av = document.getElementById('avatar');
  av.className = 'avatar' + (state.avatar.shape === 'square' ? ' square' : '') + (!state.avatar.show ? ' hidden' : '');
  if (state.avatar.url) {
    av.innerHTML = `<img src="${escapeAttr(state.avatar.url)}" alt="" onerror="this.remove();this.parentElement.textContent='${getInitials(resolvedName || '?')}'">`;
  } else {
    av.textContent = getInitials(resolvedName || '?');
  }
}

function renderLinks() {
  const container = document.getElementById('links-container');
  container.innerHTML = '';
  let idx = 0;
  state.links.forEach(link => {
    if (link.state === 'hidden') return;
    const isDisabled = link.state === 'disabled';
    const position = idx + 1;

    const el = document.createElement(isDisabled ? 'div' : 'a');
    el.className = 'link-item';
    if (isDisabled) {
      el.classList.add('is-disabled');
      el.setAttribute('role', 'button');
      el.tabIndex = 0;
    } else {
      el.href = appendParams(link.url) || '#';
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    }
    el.dataset.linkId = link.id;
    el.dataset.linkState = link.state;
    el.style.animationDelay = `${idx * 0.05}s`;
    const label = resolveLocalizedContent(link.label) || t(link.id);
    const disabledReason = resolveLocalizedContent(link.disabledReason) || t('comingSoon');
    el.innerHTML = `
      <span class="link-item-icon">${ICONS[link.id] || ''}</span>
      <span class="link-item-label">${label}</span>
      <span class="link-item-arrow">\u2192</span>
      ${isDisabled ? `<span class="link-item-reason">${disabledReason}</span>` : ''}
    `;

    if (isDisabled) {
      const handleDisabledClick = () => {
        analyticsState.disabledLinkClicks += 1;
        captureAnalyticsEvent('linkdrop_disabled_link_clicked', {
          link_id: link.id,
          link_state: link.state,
          disabled_reason: disabledReason,
        });
        showToast(disabledReason);
      };
      el.addEventListener('click', handleDisabledClick);
      el.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        handleDisabledClick();
      });
    } else {
      el.addEventListener('click', () => {
        analyticsState.totalLinkClicks += 1;
        notePrimaryAction('link_click');
        captureAnalyticsEvent('linkdrop_link_clicked', {
          link_id: link.id,
          link_state: link.state,
          destination_url: appendParams(link.url) || '',
          position,
        });
      });
    }

    container.appendChild(el);
    idx++;
  });
}

function renderContactForm() {
  const container = document.getElementById('contact-section');
  const showPhone = state.contactForm.phone;
  const showEmail = state.contactForm.email;
  const showTelegramLead = telegramLeadState.available;
  const existingPhoneValue = document.getElementById('visitor-phone')?.value || '';
  const existingEmailValue = document.getElementById('visitor-email')?.value || '';
  if (!showPhone && !showEmail && !showTelegramLead) { container.innerHTML = ''; return; }

  container.innerHTML = `
    <div class="contact-divider"></div>
    ${(showPhone || showEmail) ? `<p class="contact-title">${t('contactTitle')}</p>` : ''}
    ${showPhone ? `<input type="tel" class="contact-input ph-no-capture" id="visitor-phone" placeholder="${t('phonePlaceholder')}" autocomplete="tel">` : ''}
    ${showEmail ? `<input type="email" class="contact-input ph-no-capture" id="visitor-email" placeholder="${t('emailPlaceholder')}" autocomplete="email">` : ''}
    ${(showPhone || showEmail) ? `<button class="contact-submit" id="contact-submit">${t('submit')}</button>` : ''}
    ${showTelegramLead ? `
      <div class="telegram-auth-card">
        <p class="telegram-auth-title">${t('telegramLeadTitle')}</p>
        <p class="telegram-auth-copy">${telegramLeadState.success ? t('telegramLeadSuccess') : t('telegramLeadHint')}</p>
        <button class="contact-submit telegram-auth-btn" id="telegram-auth-btn" ${telegramLeadState.busy || telegramLeadState.success ? 'disabled' : ''}>
          <span class="telegram-auth-icon">${ICONS.telegram}</span>
          <span>${getTelegramLeadButtonLabel()}</span>
        </button>
      </div>
    ` : ''}
  `;

  if (showPhone) document.getElementById('visitor-phone').value = existingPhoneValue;
  if (showEmail) document.getElementById('visitor-email').value = existingEmailValue;

  container.querySelectorAll('.contact-input').forEach(input => {
    input.addEventListener('focus', () => {
      if (analyticsState.contactStarted) return;
      analyticsState.contactStarted = true;
      captureAnalyticsEvent('linkdrop_contact_started', {
        enabled_contact_fields: getEnabledContactFields(),
      });
    }, { once: true });
  });

  document.getElementById('contact-submit')?.addEventListener('click', () => {
    const phoneValue = showPhone ? (document.getElementById('visitor-phone')?.value || '').trim() : '';
    const emailValue = showEmail ? (document.getElementById('visitor-email')?.value || '').trim() : '';
    analyticsState.contactSubmitted = true;
    notePrimaryAction('contact_submit');
    captureAnalyticsEvent('linkdrop_contact_submitted', {
      enabled_contact_fields: getEnabledContactFields(),
      phone_provided: Boolean(phoneValue),
      email_provided: Boolean(emailValue),
    });
    container.innerHTML = `<div class="contact-divider"></div><p class="contact-submitted">${t('thankYou')}</p>`;
    setTimeout(() => renderContactForm(), 3000);
  });

  document.getElementById('telegram-auth-btn')?.addEventListener('click', () => {
    startTelegramLeadAuth();
  });
}

function renderDesignGrid() {
  const grid = document.getElementById('design-grid');
  if (!grid) return;
  const lang = getEffectiveLang();
  const names = (T[lang] && T[lang].designs) || T.en.designs;
  grid.innerHTML = '';
  const designs = ALL_DESIGNS;
  for (const i of designs) {
    const btn = document.createElement('button');
    btn.className = `design-option${state.design === i ? ' active' : ''}`;
    btn.dataset.design = i;
    btn.innerHTML = `<span class="design-swatch design-swatch-${i}"></span><span>${names[i-1]}</span>`;
    btn.addEventListener('click', () => applyDesignSelection(i, 'manual'));
    grid.appendChild(btn);
  }
}

function renderThemeBtns() {
  const container = document.getElementById('theme-btns');
  if (!container) return;
  container.innerHTML = '';
  ['auto', 'light', 'dark'].forEach(th => {
    const btn = document.createElement('button');
    btn.className = `theme-btn${state.theme === th ? ' active' : ''}`;
    btn.textContent = t(th);
    btn.addEventListener('click', () => { state.theme = th; onThemeChange(); });
    container.appendChild(btn);
  });
}

function renderLangSelect() {
  const sel = document.getElementById('lang-select');
  if (!sel) return;
  sel.innerHTML = `<option value="auto">${t('auto')} (${LANG_NAMES[detectLanguage()]})</option>`;
  Object.entries(LANG_NAMES).forEach(([code, name]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = name;
    opt.selected = state.lang === code;
    sel.appendChild(opt);
  });
}

function renderLinksConfig() {
  const container = document.getElementById('links-config');
  if (!container) return;
  container.innerHTML = '';
  state.links.forEach((link, idx) => {
    const div = document.createElement('div');
    div.className = 'link-config-item';
    div.innerHTML = `
      <div class="link-config-row">
        <span class="link-config-icon">${ICONS[link.id] || ''}</span>
        <span class="link-config-name">${t(link.id)}</span>
        <div class="state-btns">
          <button class="state-btn${link.state === 'active' ? ' active' : ''}" data-state="active">${t('stateOn')}</button>
          <button class="state-btn${link.state === 'disabled' ? ' active' : ''}" data-state="disabled">${t('stateOff')}</button>
          <button class="state-btn${link.state === 'hidden' ? ' active' : ''}" data-state="hidden">${t('stateHide')}</button>
        </div>
      </div>
      <input type="text" class="link-url-input" value="${escapeAttr(link.url)}"
             placeholder="https://..." data-idx="${idx}"
             style="display:${link.state !== 'hidden' ? 'block' : 'none'}">
      <input type="text" class="link-reason-input" value="${escapeAttr(link.disabledReason)}"
             placeholder="${t('comingSoon')}" data-idx="${idx}"
             style="display:${link.state === 'disabled' ? 'block' : 'none'}">
    `;

    div.querySelectorAll('.state-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.links[idx].state = btn.dataset.state;
        div.querySelectorAll('.state-btn').forEach(b => b.classList.toggle('active', b.dataset.state === btn.dataset.state));
        div.querySelector('.link-url-input').style.display = btn.dataset.state !== 'hidden' ? 'block' : 'none';
        div.querySelector('.link-reason-input').style.display = btn.dataset.state === 'disabled' ? 'block' : 'none';
        renderLinks();
      });
    });

    div.querySelector('.link-url-input').addEventListener('input', (e) => {
      state.links[idx].url = e.target.value;
      renderLinks();
    });
    div.querySelector('.link-reason-input').addEventListener('input', (e) => {
      state.links[idx].disabledReason = e.target.value;
      renderLinks();
    });

    container.appendChild(div);
  });
}

function renderAvatarConfig() {
  const c = document.getElementById('avatar-config');
  if (!c) return;
  c.innerHTML = `
    <div class="avatar-toggle-row">
      <label class="toggle">
        <input type="checkbox" id="av-show" ${state.avatar.show ? 'checked' : ''}>
        <span class="toggle-track"></span>
      </label>
      <span class="avatar-toggle-label">${t('showAvatar')}</span>
    </div>
    <div class="avatar-shape-row">
      <span class="avatar-shape-label">Shape</span>
      <div class="shape-btns">
        <button class="shape-btn${state.avatar.shape === 'round' ? ' active' : ''}" data-shape="round">${t('avatarRound')}</button>
        <button class="shape-btn${state.avatar.shape === 'square' ? ' active' : ''}" data-shape="square">${t('avatarSquare')}</button>
      </div>
    </div>
    <input type="text" class="config-input" id="av-url" value="${escapeAttr(state.avatar.url)}" placeholder="${t('avatarUrl')} (https://...)">
  `;
  c.querySelector('#av-show').addEventListener('change', (e) => {
    state.avatar.show = e.target.checked;
    renderProfile();
  });
  c.querySelectorAll('.shape-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.avatar.shape = btn.dataset.shape;
      c.querySelectorAll('.shape-btn').forEach(b => b.classList.toggle('active', b.dataset.shape === btn.dataset.shape));
      renderProfile();
    });
  });
  c.querySelector('#av-url').addEventListener('input', (e) => {
    state.avatar.url = e.target.value;
    renderProfile();
  });
}

function renderParticleConfig() {
  const c = document.getElementById('particle-config');
  if (!c) return;
  if (!PARTICLE_SETS[state.design]) {
    c.innerHTML = `<p class="no-particles-msg">${t('designs')[state.design - 1]} — no particles</p>`;
    return;
  }
  const sliders = [
    { key: 'particleDensity', label: t('density'), min: 5, max: 50, step: 1 },
    { key: 'particleSpeed', label: t('speed'), min: 0.2, max: 3, step: 0.1 },
    { key: 'particleMinSize', label: t('minSize'), min: 20, max: 150, step: 5 },
    { key: 'particleMaxSize', label: t('maxSize'), min: 80, max: 350, step: 10 },
    { key: 'particleOpacity', label: t('opacity'), min: 0.1, max: 1, step: 0.05 },
  ];
  c.innerHTML = sliders.map(s => `
    <div class="slider-row">
      <span class="slider-label">${s.label}</span>
      <input type="range" min="${s.min}" max="${s.max}" step="${s.step}" value="${state[s.key]}" data-key="${s.key}">
      <span class="slider-value">${state[s.key]}</span>
    </div>
  `).join('');
  c.querySelectorAll('input[type="range"]').forEach(inp => {
    inp.addEventListener('input', (e) => {
      state[e.target.dataset.key] = parseFloat(e.target.value);
      e.target.nextElementSibling.textContent = e.target.value;
      renderParticles();
    });
  });
}

function renderContactConfig() {
  const container = document.getElementById('contact-config');
  if (!container) return;
  container.innerHTML = '';
  ['phone', 'email'].forEach(field => {
    const row = document.createElement('div');
    row.className = 'contact-toggle-row';
    row.innerHTML = `
      <label class="toggle">
        <input type="checkbox" ${state.contactForm[field] ? 'checked' : ''}>
        <span class="toggle-track"></span>
      </label>
      <span class="contact-toggle-label">${t(field === 'phone' ? 'collectPhone' : 'collectEmail')}</span>
    `;
    row.querySelector('input').addEventListener('change', (e) => {
      state.contactForm[field] = e.target.checked;
      renderContactForm();
    });
    container.appendChild(row);
  });
}

function setExplicitLinkVisibility(linkId, show) {
  const link = state.links.find(entry => entry.id === linkId);
  if (!link || typeof show !== 'boolean') return;
  link.state = show ? 'active' : 'hidden';
}

function setExplicitLinkState(linkId, nextState) {
  const link = state.links.find(entry => entry.id === linkId);
  if (!link) return;
  if (!['active', 'disabled', 'hidden'].includes(nextState)) return;
  link.state = nextState;
}

function setLocalizedTextOverride(key, value) {
  if (!value) return;
  if (typeof value === 'string') {
    uiTextOverrides.en = { ...(uiTextOverrides.en || {}), [key]: value };
    return;
  }
  if (typeof value !== 'object' || Array.isArray(value)) return;
  Object.entries(value).forEach(([locale, text]) => {
    if (typeof text !== 'string' || !text.trim()) return;
    uiTextOverrides[locale] = { ...(uiTextOverrides[locale] || {}), [key]: text };
  });
}

function getMutableLink(linkId) {
  return state.links.find(entry => entry.id === linkId) || null;
}

function resetFeatureDrivenState() {
  state.name = BASE_PROFILE_COPY.name;
  state.bio = BASE_PROFILE_COPY.bio;
  state.profile.showName = BASE_FEATURE_STATE.nameShow;
  state.profile.nameValue = BASE_PROFILE_COPY.nameValue;
  state.profile.descriptionValue = BASE_PROFILE_COPY.descriptionValue;
  state.avatar.show = BASE_FEATURE_STATE.avatarShow;
  state.avatar.shape = BASE_FEATURE_STATE.avatarShape;
  state.avatar.url = BASE_FEATURE_STATE.avatarUrl;
  state.profile.showDescription = BASE_FEATURE_STATE.descriptionShow;
  state.contactForm.phone = BASE_FEATURE_STATE.phoneShow;
  state.contactForm.email = BASE_FEATURE_STATE.emailShow;
  Object.entries(BASE_FEATURE_STATE.links).forEach(([linkId, linkState]) => {
    const link = state.links.find(entry => entry.id === linkId);
    if (link) link.state = linkState;
  });
  state.links.forEach((link) => {
    const defaults = BASE_LINK_DEFAULTS[link.id];
    if (!defaults) return;
    link.url = defaults.url;
    link.disabledReason = defaults.disabledReason;
    link.label = defaults.label;
  });
  uiTextOverrides = {};
}

function applyConfigPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return;

  if (payload.profile?.name && typeof payload.profile.name.show === 'boolean') {
    state.profile.showName = payload.profile.name.show;
  }
  if (payload.profile?.name && Object.prototype.hasOwnProperty.call(payload.profile.name, 'value')) {
    state.profile.nameValue = payload.profile.name.value;
  }
  if (payload.profile?.avatar && typeof payload.profile.avatar.show === 'boolean') {
    state.avatar.show = payload.profile.avatar.show;
  }
  if (payload.profile?.avatar && typeof payload.profile.avatar.url === 'string') {
    state.avatar.url = payload.profile.avatar.url;
  }
  if (payload.profile?.avatar && typeof payload.profile.avatar.shape === 'string' && ['round', 'square'].includes(payload.profile.avatar.shape)) {
    state.avatar.shape = payload.profile.avatar.shape;
  }
  if (payload.profile?.description && typeof payload.profile.description.show === 'boolean') {
    state.profile.showDescription = payload.profile.description.show;
  }
  if (payload.profile?.description && Object.prototype.hasOwnProperty.call(payload.profile.description, 'value')) {
    state.profile.descriptionValue = payload.profile.description.value;
  }
  if (payload.contact?.phone && typeof payload.contact.phone.show === 'boolean') {
    state.contactForm.phone = payload.contact.phone.show;
  }
  if (payload.contact?.email && typeof payload.contact.email.show === 'boolean') {
    state.contactForm.email = payload.contact.email.show;
  }
  if (payload.links && typeof payload.links === 'object') {
    Object.entries(payload.links).forEach(([linkId, config]) => {
      if (!config || typeof config !== 'object' || Array.isArray(config)) return;
      const link = getMutableLink(linkId);
      if (!link) return;
      if (typeof config.state === 'string') {
        setExplicitLinkState(linkId, config.state);
      }
      if (typeof config.show === 'boolean') {
        setExplicitLinkVisibility(linkId, config.show);
      }
      if (typeof config.url === 'string') {
        link.url = config.url;
      }
      if ('label' in config) {
        link.label = config.label;
      }
      if ('disabledReason' in config) {
        link.disabledReason = config.disabledReason;
      }
    });
  }

  setLocalizedTextOverride('namePlaceholder', payload.profile?.namePlaceholder);
  setLocalizedTextOverride('bioPlaceholder', payload.profile?.bioPlaceholder);
  setLocalizedTextOverride('contactTitle', payload.contact?.title);
  setLocalizedTextOverride('phonePlaceholder', payload.contact?.phone?.placeholder);
  setLocalizedTextOverride('emailPlaceholder', payload.contact?.email?.placeholder);
  setLocalizedTextOverride('submit', payload.contact?.submit);
  setLocalizedTextOverride('thankYou', payload.contact?.thankYou);
}

function applyFlagPayload(flagKey, source = 'bootstrap') {
  const readPayload = source === 'runtime' ? getRuntimeFeatureFlagPayload : getBootstrapFeatureFlagPayload;
  const payload = normalizeFeatureFlagPayload(readPayload(flagKey));
  applyConfigPayload(payload);
}

function applyFeatureDrivenConfig(source = 'bootstrap') {
  resetFeatureDrivenState();
  applyFlagPayload(POSTHOG_CONFIG.featureFlagKeys.uiConfig, source);
  applyFlagPayload(POSTHOG_CONFIG.featureFlagKeys.profileExperiment, source);
  applyFlagPayload(POSTHOG_CONFIG.featureFlagKeys.contactOptionsExperiment, source);
}

function updateLinksConfigLabels() {
  document.querySelectorAll('.link-config-name').forEach((el, i) => {
    if (state.links[i]) el.textContent = t(state.links[i].id);
  });
  document.querySelectorAll('.state-btn').forEach(btn => {
    const key = { active: 'stateOn', disabled: 'stateOff', hidden: 'stateHide' }[btn.dataset.state];
    if (key) btn.textContent = t(key);
  });
}

function onDesignChange() {
  applyDesign();
  renderParticles();
  renderLinks();
  renderContactForm();
  if (APP_CONFIG.previewMode) {
    renderParticleConfig();
    renderDesignGrid();
    renderThemeBtns();
  }
}

function onThemeChange() {
  applyDesign();
  renderParticles();
  renderLinks();
  renderContactForm();
  if (APP_CONFIG.previewMode) renderThemeBtns();
  syncAnalyticsContext();
}

function onLangChange() {
  applyLanguage();
  renderLinks();
  renderContactForm();
  if (APP_CONFIG.previewMode) {
    renderDesignGrid();
    renderThemeBtns();
    renderLangSelect();
    updateLinksConfigLabels();
    renderContactConfig();
  }
  syncAnalyticsContext();
}

function render() {
  applyDesign();
  applyLanguage();
  renderParticles();
  renderProfile();
  renderLinks();
  renderContactForm();
  if (APP_CONFIG.previewMode) {
    renderDesignGrid();
    renderThemeBtns();
    renderLangSelect();
    renderAvatarConfig();
    renderLinksConfig();
    renderParticleConfig();
    renderContactConfig();
  }
}

// ============================================
// 6. EVENT HANDLERS
// ============================================
function setupEvents() {
  if (APP_CONFIG.previewMode) {
    const settingsBtn = document.getElementById('settings-btn');
    const panel = document.getElementById('config-panel');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('config-close');

    function openPanel() {
      panel.classList.add('open');
      overlay.classList.add('open');
      settingsBtn.classList.add('panel-open');
      analyticsState.settingsOpenCount += 1;
      captureAnalyticsEvent('linkdrop_settings_opened', {
        settings_open_count: analyticsState.settingsOpenCount,
      });
    }
    function closePanel() {
      panel.classList.remove('open');
      overlay.classList.remove('open');
      settingsBtn.classList.remove('panel-open');
    }

    settingsBtn.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    document.getElementById('input-name').addEventListener('input', (e) => {
      state.profile.nameValue = null;
      state.name = e.target.value;
      renderProfile();
    });
    document.getElementById('input-bio').addEventListener('input', (e) => {
      state.profile.descriptionValue = null;
      state.bio = e.target.value;
      renderProfile();
    });

    document.getElementById('lang-select').addEventListener('change', (e) => {
      state.lang = e.target.value;
      onLangChange();
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (state.theme === 'auto') onThemeChange();
  });

  window.addEventListener('pagehide', () => sendSessionSummary('pagehide'));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderParticles, 300);
  });
}

// ============================================
// 7. INITIALIZATION
// ============================================
function init() {
  captureQueryParams();
  applyFeatureDrivenConfig('bootstrap');
  if (!APP_CONFIG.previewMode) {
    document.getElementById('settings-btn')?.remove();
    document.getElementById('overlay')?.remove();
    document.getElementById('config-panel')?.remove();
  } else {
    document.getElementById('input-name').value = state.name;
    document.getElementById('input-bio').value = state.bio;
  }
  setupAnalytics();
  setupEvents();
  render();
  initializeTelegramLead();
  releaseInitialPaint();
}

window.__LD_DEBUG = {
  getStatus() {
    return {
      design: state.design,
      designSource: analyticsState.designSource,
      experimentVariant: analyticsState.experimentVariant,
      profileExperimentVariant: getFeatureFlagVariant(POSTHOG_CONFIG.featureFlagKeys.profileExperiment, 'runtime') ?? null,
      contactOptionsExperimentVariant: getFeatureFlagVariant(POSTHOG_CONFIG.featureFlagKeys.contactOptionsExperiment, 'runtime') ?? null,
      flagKey: POSTHOG_CONFIG.designFlagKey,
      flagValue: posthog.getFeatureFlag?.(POSTHOG_CONFIG.designFlagKey) ?? null,
      overrideVariant: getResolvedOverrideVariant() || null,
      distinctId: posthog.get_distinct_id?.() || null,
      posthogLoaded: Boolean(posthog.__loaded),
    };
  },
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
