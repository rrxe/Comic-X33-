import { useCallback, useEffect, useMemo, useState } from "react";
import UiIcons from "../components/UiIcons";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/withdrawal.css";

type LiveWithdrawal = {
  id: string;
  user: string;
  amount: number;
  method: "binance" | "bnb";
  status: "pending" | "completed";
  createdAt: string;
};

type LeaderUser = { rank: number; name: string; coins: string; tier: string };

type Props = {
  coins: number;
  usdt: number;
  onOpenExchange: () => void;
  onOpenWithdraw: () => void;
};

function formatRelativeTime(value: string) {
  const stamp = new Date(value).getTime();
  if (!Number.isFinite(stamp)) return "—";
  const diff = Math.max(0, Date.now() - stamp);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function Withdrawal({ coins, usdt, onOpenExchange, onOpenWithdraw }: Props) {
  const { t } = useLanguage();
  const [live, setLive] = useState<LiveWithdrawal[]>([]);
  const [leaders, setLeaders] = useState<LeaderUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAll = useCallback(async (quiet = false) => {
    if (quiet) setRefreshing(true);
    else setLoading(true);

    const [liveRes, leadersRes] = await Promise.allSettled([
      fetch("/api/withdrawals/live", { headers: { "Cache-Control": "no-cache" } }).then((r) => r.json()),
      fetch("/api/leaderboard", { headers: { "Cache-Control": "no-cache" } }).then((r) => r.json()),
    ]);

    if (liveRes.status === "fulfilled" && Array.isArray(liveRes.value?.withdrawals)) {
      setLive(liveRes.value.withdrawals);
    }
    if (leadersRes.status === "fulfilled" && Array.isArray(leadersRes.value)) {
      setLeaders(leadersRes.value);
    }

    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchAll();
    const interval = window.setInterval(() => fetchAll(true), 25000);
    return () => window.clearInterval(interval);
  }, [fetchAll]);

  const latestTen = useMemo(
    () => live.filter((item) => item.status === "pending" || item.status === "completed").slice(0, 10),
    [live]
  );

  return (
    <section className="wd-page">
      <header className="wd-head">
        <div>
          <span className="wd-kicker"><i />{t("withdrawal.livePayouts")}</span>
          <h1>{t("withdrawal.title")}</h1>
        </div>
        <button
          type="button"
          className={`wd-refresh ${refreshing ? "spinning" : ""}`}
          onClick={() => fetchAll(true)}
          aria-label={t("withdrawal.refresh")}
        >
          <UiIcons name="exchange" />
        </button>
      </header>

      <section className="wd-balance">
        <div className="wd-balance-main">
          <span>{t("withdrawal.availableBalance")}</span>
          <strong>{usdt.toFixed(4)} <em>USDT</em></strong>
          <small>{t("withdrawal.readyToWithdraw")}</small>
        </div>
        <div className="wd-coin-badge">
          <UiIcons name="gem" className="wd-coin-icon" />
          <div>
            <span>{t("withdrawal.coinsBalance")}</span>
            <strong>{coins.toLocaleString()}</strong>
          </div>
        </div>
        <div className="wd-actions">
          <button type="button" className="wd-btn ghost" onClick={onOpenExchange}>
            <UiIcons name="exchange" />
            <span>{t("withdrawal.exchange")}</span>
          </button>
          <button type="button" className="wd-btn primary" onClick={onOpenWithdraw}>
            <UiIcons name="withdraw" />
            <span>{t("withdrawal.withdrawUsdt")}</span>
          </button>
        </div>
      </section>

      <section className="wd-card">
        <div className="wd-card-head">
          <div>
            <span>{t("withdrawal.communityFeed")}</span>
            <h2>{t("withdrawal.latestWithdrawals")}</h2>
          </div>
          <b className="wd-count">{latestTen.length}/10</b>
        </div>

        <div className="wd-list">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <div className="wd-row skeleton" key={i} />)
          ) : latestTen.length === 0 ? (
            <div className="wd-empty">
              <UiIcons name="withdraw" />
              <strong>{t("withdrawal.noLiveWithdrawals")}</strong>
              <span>{t("withdrawal.noLiveWithdrawalsSub")}</span>
            </div>
          ) : (
            latestTen.map((item) => (
              <article className="wd-row" key={item.id}>
                <div className={`wd-method ${item.method}`}>{item.method === "binance" ? "B" : "T"}</div>
                <div className="wd-row-user">
                  <strong>{item.user}</strong>
                  <span>
                    {item.method === "binance" ? t("withdrawal.binance") : t("withdrawal.ton")} · {formatRelativeTime(item.createdAt)}
                  </span>
                </div>
                <div className="wd-row-amount">
                  <strong>{Number(item.amount).toFixed(4)} <small>USDT</small></strong>
                  <span className={`wd-status ${item.status === "completed" ? "paid" : "pending"}`}>
                    {item.status === "completed" ? t("withdrawal.paid") : t("withdrawal.pending")}
                  </span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="wd-card">
        <div className="wd-card-head">
          <div>
            <span>{t("withdrawal.leaderboardEyebrow")}</span>
            <h2>{t("withdrawal.leaderboardTitle")}</h2>
          </div>
          <UiIcons name="trophy" className="wd-trophy" />
        </div>

        <div className="wd-list">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <div className="wd-row skeleton" key={i} />)
          ) : leaders.length === 0 ? (
            <div className="wd-empty">
              <UiIcons name="trophy" />
              <strong>{t("home.noLeaderboardData")}</strong>
            </div>
          ) : (
            leaders.slice(0, 10).map((player) => (
              <article className={`wd-row leader ${player.rank <= 3 ? `top-${player.rank}` : ""}`} key={player.rank}>
                <span className="wd-rank">{player.rank}</span>
                <div className="wd-avatar">{player.name?.replace("@", "").slice(0, 1).toUpperCase() || "P"}</div>
                <div className="wd-row-user">
                  <strong>{player.name}</strong>
                  <span>{t("withdrawal.tierLabel", { tier: player.tier })}</span>
                </div>
                <div className="wd-row-amount">
                  <strong className="wd-leader-coins">
                    <UiIcons name="gem" className="wd-mini-gem" />
                    {player.coins}
                  </strong>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </section>
  );
}
