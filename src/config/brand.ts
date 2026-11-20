// Central place for brand / link settings so they can be changed in one spot.
// Values can be overridden with Vite env vars (VITE_*) at build time.
const env = (import.meta as any).env ?? {};

export const BRAND = "ComicX";

// Bot username used to build referral links (without the @).
export const BOT_USERNAME: string = env.VITE_BOT_USERNAME || "SLYMintX_bot";

// Mini-app short name used in t.me/<bot>/<short>?startapp=...
export const APP_SHORT_NAME: string = env.VITE_APP_SHORT_NAME || "start";

// Public channel where payouts are announced.
export const PAYMENT_CHANNEL_URL: string =
  env.VITE_PAYMENT_CHANNEL_URL || "https://t.me/SLYMintX_payment";
