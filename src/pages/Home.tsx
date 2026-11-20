import { useEffect, useMemo, useState, type CSSProperties } from "react";
import UiIcons from "../components/UiIcons";
import { useLanguage } from "../i18n/LanguageContext";
import { BRAND } from "../config/brand";
import type { Page } from "../App";
import "../styles/home.css";

type MiningState = {
  active: boolean;
  reward: number;
  cycleHours: number;
  startedAt: string | null;
  claimAvailableAt: string | null;
  claimReady: boolean;
};

type RedeemResult = { success: boolean; message: string };

type Props = {
  streak: number;
  mining: MiningState;
  miningBusy: boolean;
  onMining: () => void;
  onRedeemGiftCode: (code: string) => Promise<RedeemResult>;
  onNavigate: (page: Page) => void;
};

const DAILY_POINTS = 250;
const milestones = [
  { days: 3, chestKey: "milestoneCommon" },
  { days: 7, chestKey: "milestoneEpic" },
  { days: 14, chestKey: "milestoneLegendary" },
  { days: 50, chestKey: "milestoneMythic" },
] as const;

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function Home({ streak, mining, miningBusy, onMining, onRedeemGiftCode, onNavigate }: Props) {
  const { t } = useLanguage();
  const [now, setNow] = useState(() => Date.now());
  const [giftCode, setGiftCode] = useState("");
  const [giftBusy, setGiftBusy] = useState(false);
  const [giftStatus, setGiftStatus] = useState<"idle" | "success" | "error">("idle");
  const [giftMessage, setGiftMessage] = useState("");

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const cycleMs = Math.max(1, mining.cycleHours) * 3600 * 1000;
  const remainingMs =
    mining.active && mining.claimAvailableAt
      ? Math.max(0, new Date(mining.claimAvailableAt).getTime() - now)
      : 0;
  const claimReady = mining.active && (mining.claimReady || remainingMs <= 0);
  const progress = !mining.active ? 0 : claimReady ? 100 : Math.min(100, Math.max(2, (1 - remainingMs / cycleMs) * 100));

  const currentChest = milestones.filter((item) => streak >= item.days).at(-1) ?? null;
  const nextMilestone = milestones.find((item) => item.days > streak) ?? null;
  const progressToNext = useMemo(() => {
    if (!nextMilestone) return 1;
    const previous = milestones.filter((item) => item.days < nextMilestone.days).at(-1)?.days ?? 0;
    const span = nextMilestone.days - previous;
    return span > 0 ? Math.min(1, Math.max(0, (streak - previous) / span)) : 0;
  }, [streak, nextMilestone]);

  const handleRedeemGiftCode = async () => {
    const trimmed = giftCode.trim();
    if (!trimmed || giftBusy) return;
    setGiftBusy(true);
    setGiftMessage("");
    const result = await onRedeemGiftCode(trimmed);
    setGiftBusy(false);
    setGiftStatus(result.success ? "success" : "error");
    setGiftMessage(result.message);
    if (result.success) setGiftCode("");
  };

  const ringStyle = { "--p": progress } as CSSProperties;

  return (
    <section className="home-page">
      <section className="hero-card">
        <span className="hero-kicker">{BRAND.toUpperCase()} EARN</span>
        <h1>{t("home.heroTitle")}</h1>
        <p>{t("home.heroDesc")}</p>
        <div className="hero-actions">
          <button type="button" className="btn-lime" onClick={() => onNavigate("withdraw")}>
            <UiIcons name="wallet" />
            <span>{t("home.walletWithdraw")}</span>
          </button>
          <button type="button" className="btn-glass" onClick={() => onNavigate("referrals")}>
            <UiIcons name="referrals" />
            <span>{t("home.inviteFriends")}</span>
          </button>
        </div>
        <UiIcons name="gem" className="hero-gem" />
      </section>

      <section className="mine-stage">
        <div className="mine-ring" style={ringStyle}>
          <div className="mine-ring-inner">
            <UiIcons name="gem" className="mine-gem" />
          </div>
        </div>
        <div className="mine-rate">
          <i />
          <span>
            {mining.active && !claimReady
              ? formatTime(remainingMs)
              : t("home.ratePill", { amount: mining.reward.toLocaleString(), hours: mining.cycleHours })}
          </span>
        </div>
      </section>

      <button
        className={`mine-action ${claimReady ? "ready" : ""}`}
        onClick={onMining}
        disabled={miningBusy || (mining.active && !claimReady)}
        type="button"
      >
        <span className="mine-action-icon">
          <UiIcons name={claimReady ? "gem" : "play"} />
        </span>
        <strong>
          {miningBusy
            ? t("home.buttonBusy")
            : !mining.active
              ? t("home.buttonStart")
              : claimReady
                ? t("home.buttonClaim", { amount: mining.reward.toLocaleString() })
                : t("home.buttonInProgress")}
        </strong>
      </button>

      <section className="quick-grid">
        <div className="quick-stat">
          <span className="quick-icon"><UiIcons name="energy" /></span>
          <div><small>{t("home.statCycle")}</small><strong>{mining.cycleHours}H</strong></div>
        </div>
        <div className="quick-stat">
          <span className="quick-icon"><UiIcons name="star" /></span>
          <div><small>{t("home.statStreak")}</small><strong>{streak} {t("common.days")}</strong></div>
        </div>
        <div className="quick-stat">
          <span className="quick-icon"><UiIcons name="coins" /></span>
          <div><small>{t("home.statReward")}</small><strong>+{mining.reward.toLocaleString()}</strong></div>
        </div>
      </section>

      <section className="code-strip">
        <div className="code-strip-head"><span>{t("home.giftEyebrow")}</span><strong>{t("home.giftTitle")}</strong></div>
        <div className="code-strip-form">
          <input
            className="gift-code-input"
            value={giftCode}
            onChange={(e) => setGiftCode(e.target.value)}
            placeholder={t("home.giftPlaceholder")}
            autoCapitalize="characters"
            disabled={giftBusy}
          />
          <button onClick={handleRedeemGiftCode} disabled={!giftCode.trim() || giftBusy} type="button">
            {giftBusy ? "..." : t("home.redeem")}
          </button>
        </div>
        {giftMessage ? <p className={`gift-code-message ${giftStatus}`}>{giftMessage}</p> : null}
      </section>

      <section className="streak-board">
        <div className="streak-board-main">
          <div className="streak-badge"><strong>{streak}</strong><span>{t("common.days")}</span></div>
          <div>
            <span className="section-kicker">{t("home.checkinEyebrow")}</span>
            <h2>{t("home.checkinPoints", { points: DAILY_POINTS })}</h2>
            <small>{t("home.checkinStatus")}</small>
          </div>
        </div>
        <div className="streak-track"><span style={{ width: `${progressToNext * 100}%` }} /></div>
        <div className="streak-marks">
          {milestones.map((item) => (
            <span key={item.days} className={streak >= item.days ? "done" : nextMilestone?.days === item.days ? "next" : ""}>
              <b>{item.days}</b>
              <small>{t(`home.${item.chestKey}`)}</small>
            </span>
          ))}
        </div>
        <div className="streak-foot">
          <span>{nextMilestone ? t("home.nextRewardIn", { days: nextMilestone.days - streak }) : t("home.allRewardsUnlocked")}</span>
          <span>{currentChest ? t("home.chestUnlocked", { chest: t(`home.${currentChest.chestKey}`) }) : t("home.keepStreakGoing")}</span>
        </div>
      </section>
    </section>
  );
}
