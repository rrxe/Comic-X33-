type IconName =
  | "home"
  | "tasks"
  | "collection"
  | "referrals"
  | "profile"
  | "coins"
  | "energy"
  | "play"
  | "back"
  | "exchange"
  | "withdraw"
  | "leaderboard"
  | "star"
  | "gem"
  | "wallet"
  | "trophy";

type Props = {
  name: IconName;
  className?: string;
};

export default function UiIcons({ name, className = "" }: Props) {
  switch (name) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6.2h-5V21H5a1 1 0 0 1-1-1v-8.5Z" fill="currentColor" />
        </svg>
      );
    case "tasks":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M6 4.5h12a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "collection":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M12 3 4.5 7.2v9.6L12 21l7.5-4.2V7.2L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 7.2v13.8" fill="none" stroke="currentColor" strokeWidth="1.8" opacity=".35" />
        </svg>
      );
    case "referrals":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M9.5 11a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 9.5 11Zm8 0A2.5 2.5 0 1 0 15 8.5a2.5 2.5 0 0 0 2.5 2.5ZM4.5 19c.6-2.9 2.8-4.5 5-4.5s4.4 1.6 5 4.5ZM15.5 19c.3-1.9 1.5-3.1 3.5-3.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "profile":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M12 12.2a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 7.3c1.2-3.4 3.7-5 7-5s5.8 1.6 7 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "coins":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.2 10.2c0-1.2 1.3-2.1 2.8-2.1s2.8.9 2.8 2.1-1.1 1.7-2.8 2.2-2.8 1-2.8 2.2 1.3 2.1 2.8 2.1 2.8-.9 2.8-2.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "energy":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" fill="currentColor" />
        </svg>
      );
    case "play":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M9 7.8v8.4a1 1 0 0 0 1.5.86l7-4.2a1 1 0 0 0 0-1.72l-7-4.2A1 1 0 0 0 9 7.8Z" fill="currentColor" />
        </svg>
      );
    case "back":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M14.5 5 8 11.5l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 11.5h7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case "exchange":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M7 7h11l-2.5-2.5M17 17H6l2.5 2.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "withdraw":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M12 4v12M7.5 9.5 12 14l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 20h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "leaderboard":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M5 19h14M7 19V9m5 10V5m5 14v-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M12 2.8 14.6 9l6.6.5-5 4.4 1.6 6.4L12 16.9 6.2 20.3l1.6-6.4-5-4.4L9.4 9 12 2.8Z"
            fill="currentColor"
          />
        </svg>
      );
    case "gem":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path d="M8 24 20 10h24l12 14-24 30L8 24Z" fill="#a8ec45" />
          <path d="M20 10 32 24 44 10H20Z" fill="#e4fbb5" />
          <path d="M8 24h48L32 54 8 24Z" fill="#8ee02f" />
          <path d="M32 24v30L20 24h12Z" fill="#c5f27c" />
          <path d="M32 24v30l12-30H32Z" fill="#74cf1d" />
        </svg>
      );
    case "wallet":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3H6.5a.5.5 0 0 0 0 1H19a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 17.5v-10Z" fill="currentColor" />
          <circle cx="16.5" cy="13.5" r="1.3" fill="#fff" />
        </svg>
      );
    case "trophy":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" fill="currentColor" />
          <path d="M8 6H5v1.5A3 3 0 0 0 8 10.5M16 6h3v1.5a3 3 0 0 1-3 3M12 13v4m-3.5 3h7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}
