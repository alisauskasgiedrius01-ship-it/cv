import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { defaultContent } from "./defaults";

const STORAGE_KEY = "cv_content_v1";
const SESSION_KEY = "cv_admin_auth";

// SHA-256 hash of the admin password. Override at build time with
// VITE_ADMIN_PASSWORD_HASH; otherwise the default password is "007helper".
// To set a new password, generate its SHA-256 hex and put it in .env:
//   node -e "console.log(require('crypto').createHash('sha256').update('YOUR_PASSWORD').digest('hex'))"
const ADMIN_HASH = (
  import.meta.env.VITE_ADMIN_PASSWORD_HASH ||
  "4a5660ffe46979e69477bbe571e09e1021fb3f65bbc6a61059d975acc4e4057b"
).toLowerCase();

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ── helpers ─────────────────────────────────────────────────────
function isObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

// Merge stored overrides onto the code defaults. Arrays merge by
// index so new default items appear even if storage is older.
function deepMerge(base, override) {
  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base;
    return base.map((item, i) =>
      i in override ? deepMerge(item, override[i]) : item
    );
  }
  if (isObject(base)) {
    const out = { ...base };
    if (isObject(override)) {
      for (const key of Object.keys(base)) {
        if (key in override) out[key] = deepMerge(base[key], override[key]);
      }
    }
    return out;
  }
  // primitive — override wins when defined
  return override === undefined ? base : override;
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Set a value at a dot path like "company.ecommerce.0.about"
function setByPath(root, path, value) {
  const keys = path.split(".");
  const next = clone(root);
  let node = next;
  for (let i = 0; i < keys.length - 1; i++) node = node[keys[i]];
  node[keys[keys.length - 1]] = value;
  return next;
}

function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ── context ─────────────────────────────────────────────────────
const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    const overrides = loadOverrides();
    return overrides ? deepMerge(defaultContent, overrides) : clone(defaultContent);
  });

  // Admin is unlocked only after logging in via /007helper. The
  // session flag keeps you logged in until the tab is closed.
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });
  const admin = authed;
  const [panelOpen, setPanelOpen] = useState(false);
  const [highlight, setHighlight] = useState(true);
  const [activeKey, setActiveKey] = useState(null);

  const login = useCallback(async (password) => {
    const hex = await sha256Hex(password);
    if (hex === ADMIN_HASH) {
      setAuthed(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore storage failure */
      }
      setPanelOpen(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAuthed(false);
    setPanelOpen(false);
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  // When logged in, Ctrl+Shift+E toggles the panel.
  useEffect(() => {
    function onKey(e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e" && authed) {
        e.preventDefault();
        setPanelOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [authed]);

  // Toggle the body class that drives on-page edit outlines.
  useEffect(() => {
    const on = admin && highlight;
    document.body.classList.toggle("admin-highlight", on);
    return () => document.body.classList.remove("admin-highlight");
  }, [admin, highlight]);

  // Delegated click: clicking an outlined element opens the panel
  // focused on the matching field.
  useEffect(() => {
    if (!admin) return;
    function onClick(e) {
      const el = e.target.closest("[data-edit-key]");
      if (!el) return;
      // In admin mode a click means "edit this", not "follow the link
      // / toggle the card" — so swallow the event entirely.
      e.preventDefault();
      e.stopPropagation();
      const key = el.getAttribute("data-edit-key");
      setActiveKey(key);
      setPanelOpen(true);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [admin]);

  const setField = useCallback((path, value) => {
    setContent((cur) => setByPath(cur, path, value));
  }, []);

  const save = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      return true;
    } catch {
      return false;
    }
  }, [content]);

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(clone(defaultContent));
  }, []);

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cv-content.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [content]);

  const value = useMemo(
    () => ({
      content,
      setField,
      save,
      resetAll,
      exportJson,
      admin,
      authed,
      login,
      logout,
      panelOpen,
      setPanelOpen,
      highlight,
      setHighlight,
      activeKey,
      setActiveKey,
    }),
    [content, setField, save, resetAll, exportJson, admin, authed, login, logout, panelOpen, highlight, activeKey]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
