import UiIcons from "./UiIcons";
import { BRAND } from "../config/brand";
import "../styles/splash.css";

type Props = { progress: number; fading?: boolean };

export default function SplashScreen({ progress, fading = false }: Props) {
  const value = Math.max(0, Math.min(100, progress));
  return (
    <div className={`splash${fading ? " fading" : ""}`}>
      <div className="splash-glow" />
      <main className="splash-center">
        <div className="splash-mark"><UiIcons name="gem" className="splash-gem" /></div>
        <div className="splash-wordmark">{BRAND}</div>
        <p>Collect · Earn · Withdraw</p>
        <div className="splash-rail"><i style={{ width: `${value}%` }} /></div>
        <span className="splash-pct">{Math.round(value)}%</span>
      </main>
    </div>
  );
}
