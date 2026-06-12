import { useState, useEffect, useRef } from "react";
import { useContent } from "../content/ContentContext";
import "../style/AdminPanel.css";

// Read a value from the content tree by dot path.
function getByPath(root, path) {
  return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), root);
}

// Build the editor layout from the current content. Every entry maps
// a field path to a human label + input type, grouped by component.
function buildSchema(content) {
  const sections = [];

  sections.push({
    id: "hero",
    title: "Hero — viršutinė dalis",
    blocks: [
      {
        fields: [
          { path: "hero.greeting", label: "Pasisveikinimas", type: "text" },
          { path: "hero.name", label: "Vardas ir pavardė", type: "text" },
          { path: "hero.role", label: "Pareigos / specializacija", type: "text" },
          { path: "hero.bio", label: "Aprašymas (bio)", type: "textarea" },
          { path: "hero.ctaPrimary", label: "Mygtukas (pagrindinis)", type: "text" },
          { path: "hero.ctaSecondary", label: "Mygtukas (antrinis)", type: "text" },
        ],
      },
    ],
  });

  const projBlocks = [
    {
      title: "Skiltis: Karjera",
      fields: [
        { path: "projects.careerLabel", label: "Etiketė", type: "text" },
        { path: "projects.careerTitle", label: "Antraštė", type: "text" },
        { path: "projects.careerSub", label: "Paantraštė", type: "text" },
      ],
    },
    {
      title: "Skiltis: Projektai",
      fields: [
        { path: "projects.projectsLabel", label: "Etiketė", type: "text" },
        { path: "projects.projectsTitle", label: "Antraštė", type: "text" },
        { path: "projects.projectsSub", label: "Paantraštė", type: "text" },
        { path: "projects.statusDone", label: "Statusas: atlikta", type: "text" },
        { path: "projects.statusProgress", label: "Statusas: kuriama", type: "text" },
      ],
    },
  ];
  content.projects.experience.forEach((exp, i) => {
    projBlocks.push({
      title: `Patirtis #${i + 1}`,
      fields: [
        { path: `projects.experience.${i}.period`, label: "Laikotarpis", type: "text" },
        { path: `projects.experience.${i}.title`, label: "Pavadinimas", type: "text" },
        { path: `projects.experience.${i}.company`, label: "Įmonė", type: "text" },
        { path: `projects.experience.${i}.desc`, label: "Punktai (po vieną eilutėje)", type: "lines" },
      ],
    });
  });
  content.projects.items.forEach((p, i) => {
    projBlocks.push({
      title: `Projektas #${i + 1}`,
      fields: [
        { path: `projects.items.${i}.title`, label: "Pavadinimas", type: "text" },
        { path: `projects.items.${i}.desc`, label: "Aprašymas", type: "textarea" },
        { path: `projects.items.${i}.tags`, label: "Žymos (kableliais)", type: "tags" },
      ],
    });
  });
  sections.push({ id: "projects", title: "Projektai ir patirtis", blocks: projBlocks });

  const companyBlocks = [
    {
      title: "Antraštės",
      fields: [
        { path: "company.label", label: "Etiketė", type: "text" },
        { path: "company.title", label: "Antraštė", type: "text" },
        { path: "company.sub", label: "Paantraštė", type: "text" },
        { path: "company.createdLabel", label: "„Sukurta“ žodis", type: "text" },
        { path: "company.ecommerceTitle", label: "E-komercijos kategorija", type: "text" },
        { path: "company.businessTitle", label: "Verslo kategorija", type: "text" },
      ],
    },
  ];
  const companyGroups = [
    ["ecommerce", "E-komercija"],
    ["business", "Verslo"],
  ];
  companyGroups.forEach(([key, gLabel]) => {
    content.company[key].forEach((c, i) => {
      companyBlocks.push({
        title: `${gLabel}: ${c.name || `#${i + 1}`}`,
        fields: [
          { path: `company.${key}.${i}.name`, label: "Pavadinimas", type: "text" },
          { path: `company.${key}.${i}.url`, label: "Nuoroda (URL)", type: "text" },
          { path: `company.${key}.${i}.about`, label: "Aprašymas", type: "textarea" },
          { path: `company.${key}.${i}.created`, label: "Sukurta (darbai)", type: "textarea" },
          { path: `company.${key}.${i}.tags`, label: "Žymos (kableliais)", type: "tags" },
        ],
      });
    });
  });
  sections.push({ id: "company", title: "Portfelis (įmonės)", blocks: companyBlocks });

  sections.push({
    id: "contact",
    title: "Kontaktų forma",
    blocks: [
      {
        fields: [
          { path: "contact.label", label: "Etiketė", type: "text" },
          { path: "contact.title", label: "Antraštė", type: "text" },
          { path: "contact.sub", label: "Paantraštė", type: "textarea" },
          { path: "contact.nameLabel", label: "„Vardas“ etiketė", type: "text" },
          { path: "contact.namePlaceholder", label: "„Vardas“ placeholder", type: "text" },
          { path: "contact.emailLabel", label: "„El. paštas“ etiketė", type: "text" },
          { path: "contact.emailPlaceholder", label: "„El. paštas“ placeholder", type: "text" },
          { path: "contact.subjectLabel", label: "„Tema“ etiketė", type: "text" },
          { path: "contact.subjectPlaceholder", label: "„Tema“ placeholder", type: "text" },
          { path: "contact.messageLabel", label: "„Žinutė“ etiketė", type: "text" },
          { path: "contact.messagePlaceholder", label: "„Žinutė“ placeholder", type: "text" },
          { path: "contact.submitLabel", label: "Siuntimo mygtukas", type: "text" },
          { path: "contact.sendingLabel", label: "Siunčiama tekstas", type: "text" },
          { path: "contact.successMsg", label: "Sėkmės žinutė", type: "textarea" },
          { path: "contact.errorMsg", label: "Klaidos žinutė", type: "textarea" },
        ],
      },
    ],
  });

  return sections;
}

function Field({ path, label, type }) {
  const { content, setField, activeKey, setActiveKey } = useContent();
  const ref = useRef(null);
  const raw = getByPath(content, path);

  // Convert stored value <-> editor string for list/tag types.
  let value = raw;
  if (type === "lines") value = Array.isArray(raw) ? raw.join("\n") : "";
  if (type === "tags") value = Array.isArray(raw) ? raw.join(", ") : "";

  const active = activeKey === path;

  useEffect(() => {
    if (active && ref.current) {
      ref.current.scrollIntoView({ block: "center", behavior: "smooth" });
      const input = ref.current.querySelector("input, textarea");
      if (input) input.focus({ preventScroll: true });
    }
  }, [active]);

  function handleChange(e) {
    const v = e.target.value;
    if (type === "lines") {
      setField(path, v.split("\n"));
    } else if (type === "tags") {
      setField(path, v.split(",").map((t) => t.trim()).filter(Boolean));
    } else {
      setField(path, v);
    }
  }

  const multiline = type === "textarea" || type === "lines";

  return (
    <div
      ref={ref}
      className={`ap-field${active ? " ap-field--active" : ""}`}
    >
      <label className="ap-field-label">{label}</label>
      {multiline ? (
        <textarea
          className="ap-input ap-textarea"
          value={value}
          rows={type === "lines" ? 5 : 3}
          onFocus={() => setActiveKey(path)}
          onChange={handleChange}
        />
      ) : (
        <input
          className="ap-input"
          type="text"
          value={value}
          onFocus={() => setActiveKey(path)}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

function Section({ section, open, onToggle }) {
  return (
    <div className="ap-section">
      <button type="button" className="ap-section-head" onClick={onToggle}>
        <span>{section.title}</span>
        <span className={`ap-chevron${open ? " is-open" : ""}`}>▾</span>
      </button>
      {open && (
        <div className="ap-section-body">
          {section.blocks.map((block, bi) => (
            <div key={bi} className="ap-block">
              {block.title && <h4 className="ap-block-title">{block.title}</h4>}
              {block.fields.map((f) => (
                <Field key={f.path} {...f} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPanel() {
  const {
    content,
    admin,
    panelOpen,
    setPanelOpen,
    highlight,
    setHighlight,
    save,
    resetAll,
    exportJson,
    logout,
    activeKey,
  } = useContent();

  const [openId, setOpenId] = useState("hero");
  const [savedFlash, setSavedFlash] = useState(false);

  const sections = buildSchema(content);

  // When a page element is clicked, the section holding its field
  // should be open — derive that rather than syncing via an effect.
  const activeSectionId = activeKey
    ? sections.find((s) =>
        s.blocks.some((b) => b.fields.some((f) => f.path === activeKey))
      )?.id
    : null;
  const effectiveOpenId = activeSectionId ?? openId;

  if (!admin) return null;

  function handleSave() {
    if (save()) {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1800);
    }
  }

  function handleReset() {
    if (window.confirm("Atstatyti visą tekstą į pradinę versiją?")) resetAll();
  }

  return (
    <>
      {!panelOpen && (
        <button
          type="button"
          className="ap-fab"
          onClick={() => setPanelOpen(true)}
          aria-label="Atidaryti teksto redaktorių"
        >
          ✎ Redaguoti tekstą
        </button>
      )}

      <aside className={`ap-panel${panelOpen ? " is-open" : ""}`} aria-hidden={!panelOpen}>
        <header className="ap-header">
          <div>
            <strong className="ap-title">Teksto redaktorius</strong>
            <span className="ap-subtitle">Redaguojamas tik tekstas</span>
          </div>
          <button
            type="button"
            className="ap-close"
            onClick={() => setPanelOpen(false)}
            aria-label="Uždaryti"
          >
            ✕
          </button>
        </header>

        <div className="ap-toolbar">
          <label className="ap-switch">
            <input
              type="checkbox"
              checked={highlight}
              onChange={(e) => setHighlight(e.target.checked)}
            />
            Pažymėti puslapyje
          </label>
          <button type="button" className="ap-logout" onClick={logout}>
            Atsijungti
          </button>
        </div>

        <div className="ap-scroll">
          {sections.map((s) => (
            <Section
              key={s.id}
              section={s}
              open={effectiveOpenId === s.id}
              onToggle={() => setOpenId((id) => (id === s.id ? null : s.id))}
            />
          ))}
        </div>

        <footer className="ap-footer">
          <button type="button" className="ap-btn ap-btn--primary" onClick={handleSave}>
            {savedFlash ? "✓ Išsaugota" : "Išsaugoti"}
          </button>
          <button type="button" className="ap-btn" onClick={exportJson}>
            Eksportuoti
          </button>
          <button type="button" className="ap-btn ap-btn--ghost" onClick={handleReset}>
            Atstatyti
          </button>
        </footer>
      </aside>
    </>
  );
}
