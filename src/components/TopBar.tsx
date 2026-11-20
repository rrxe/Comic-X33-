import "../styles/topbar.css";
import UiIcons from "./UiIcons";
import type { Page } from "../App";
import { useLanguage } from "../i18n/LanguageContext";
import { BRAND } from "../config/brand";

type Props = { page: Page; coins: number; usdt: number };

function getTelegramUser() {
  try {
    return (window as any).Telegram?.WebApp?.initDataUnsafe?.user ?? null;
  } catch {
    return null;
  }
}

export default function TopBar({ page, coins, usdt }: Props) {
  const { t } = useLanguage();
  const user = getTelegramUser();
  const displayName: string = user?.username || user?.first_name || "Player";
  const photo: string | undefined = user?.photo_url;
  const sub = page === "home" ? "" : t(`topbar.${page}.label`);

  return (
    <header className="topbar">
      <div className="topbar-user">
        <div className="topbar-avatar">
          {photo ? <img src={photo} alt="" /> : <span>{displayName.slice(0, 1).toUpperCase()}</span>}
        </div>
        <div className="topbar-copy">
          <span className="topbar-brand">{BRAND.toUpperCase()}</span>
          <strong>{displayName}</strong>
          {sub ? <small className="sr-only">{sub}</small> : null}
        </div>
      </div>

      <div className="topbar-chips">
        <div className="topbar-chip">
          <UiIcons name="gem" className="topbar-chip-icon" />
          <strong>{coins.toLocaleString()}</strong>
        </div>
        <div className="topbar-chip usdt">
          <span className="topbar-chip-tag">$</span>
          <strong>{usdt.toFixed(2)}</strong>
        </div>
      </div>
    </header>
  );
}
