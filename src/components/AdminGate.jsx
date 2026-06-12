import { useState, useEffect } from "react";
import { useContent } from "../content/ContentContext";
import "../style/AdminPanel.css";

// The secret route. Visiting /007helper (path) or #007helper (hash)
// shows the login. Hash form works on any static host without rewrites.
const ROUTE = "007helper";

function routeWantsAdmin() {
  if (typeof window === "undefined") return false;
  const p = window.location.pathname.toLowerCase();
  const h = window.location.hash.toLowerCase();
  return p.includes(ROUTE) || h.includes(ROUTE);
}

export default function AdminGate() {
  const { authed, login } = useContent();
  const [wants, setWants] = useState(routeWantsAdmin);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onNav = () => setWants(routeWantsAdmin());
    window.addEventListener("hashchange", onNav);
    window.addEventListener("popstate", onNav);
    return () => {
      window.removeEventListener("hashchange", onNav);
      window.removeEventListener("popstate", onNav);
    };
  }, []);

  if (!wants || authed) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    const ok = await login(pw);
    setBusy(false);
    if (ok) {
      // Drop the secret route from the URL once logged in.
      window.history.replaceState(null, "", import.meta.env.BASE_URL || "/");
      setWants(false);
    } else {
      setError(true);
      setPw("");
    }
  }

  return (
    <div className="ag-overlay" role="dialog" aria-modal="true" aria-label="Prisijungimas">
      <form className="ag-card" onSubmit={handleSubmit}>
        <div className="ag-badge">🔒</div>
        <h2 className="ag-title">Administratoriaus prisijungimas</h2>
        <p className="ag-sub">Įveskite slaptažodį, kad galėtumėte redaguoti tekstą.</p>

        <input
          type="password"
          className={`ag-input${error ? " ag-input--error" : ""}`}
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setError(false);
          }}
          placeholder="Slaptažodis"
          autoFocus
          autoComplete="current-password"
        />
        {error && <span className="ag-error">Neteisingas slaptažodis</span>}

        <button type="submit" className="ag-btn" disabled={busy || !pw}>
          {busy ? "Tikrinama…" : "Prisijungti"}
        </button>

        <a className="ag-back" href={import.meta.env.BASE_URL || "/"}>
          ← Grįžti į svetainę
        </a>
      </form>
    </div>
  );
}
