import { useState, useRef, useLayoutEffect } from "react";
import { useReveal } from "../hooks/useReveal";
import { useContent } from "../content/ContentContext";
import { Editable } from "./Editable";
import "../style/Company.css";

function ExpandableText({ text, className, label, editKey, editLabel }) {
  const { admin, highlight, activeKey } = useContent();
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    // Measured while clamped (collapsed), so scrollHeight reflects full content.
    setOverflowing(el.scrollHeight - el.clientHeight > 1);
  }, [text, expanded]);

  // Marking attributes applied directly on the <p> so the measuring
  // ref keeps pointing at the real text element.
  const marked = admin && highlight;
  const markClass = marked
    ? ` ed-mark${activeKey === editKey ? " ed-mark--active" : ""}`
    : "";
  const markProps = marked
    ? { "data-edit-key": editKey, title: `Redaguoti: ${editLabel}` }
    : {};

  return (
    <div className="company-expandable">
      {label && <span className="company-created-label">{label}</span>}
      <p
        ref={textRef}
        className={`${className} ${expanded ? "is-expanded" : "is-clamped"}${markClass}`}
        {...markProps}
      >
        {text}
      </p>
      {overflowing && (
        <button
          type="button"
          className="company-showmore"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Rodyti mažiau" : "Rodyti daugiau"}
        </button>
      )}
    </div>
  );
}

function CompanyCard({ logo, url, name, about, created, tags, groupKey, createdLabel, i }) {
  const [cardRef, visible] = useReveal({ threshold: 0.12 });
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      ref={cardRef}
      className={`company-card card-pop ${visible ? "is-visible" : ""}`}
      style={{ animationDelay: `${(i % 3) * 0.1}s` }}
    >
      <div className="company-card-logo">
        <a href={url} target="_blank" rel="noreferrer">
          {logo ? (
            <img src={logo} alt={`${name} logo`} className="company-logo-img" />
          ) : (
            <span className="company-logo-initials">{initials}</span>
          )}
        </a>
      </div>
      <h3 className="company-name">
        <Editable
          as="a"
          editKey={`company.${groupKey}.${i}.name`}
          label="Įmonės pavadinimas"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {name}
        </Editable>
      </h3>
      <ExpandableText
        className="company-about"
        text={about}
        editKey={`company.${groupKey}.${i}.about`}
        editLabel="Aprašymas"
      />
      <div className="company-created">
        <ExpandableText
          className="company-created-value"
          text={created}
          label={createdLabel}
          editKey={`company.${groupKey}.${i}.created`}
          editLabel="Sukurta (darbai)"
        />
      </div>
      <Editable
        editKey={`company.${groupKey}.${i}.tags`}
        label="Žymos"
        className="company-tags"
      >
        {tags.map((tag) => (
          <span key={tag} className="project-tag">
            {tag}
          </span>
        ))}
      </Editable>
    </div>
  );
}

function CompanyCategory({ id, title, titleKey, items, groupKey, createdLabel }) {
  const [titleRef, visible] = useReveal({ threshold: 0.2 });
  const { admin, highlight, activeKey } = useContent();
  const marked = admin && highlight;
  return (
    <div id={id} className="company-category">
      <h4
        ref={titleRef}
        className={`company-category-title reveal reveal-left ${
          visible ? "is-visible" : ""
        }${marked ? ` ed-mark${activeKey === titleKey ? " ed-mark--active" : ""}` : ""}`}
        {...(marked ? { "data-edit-key": titleKey, title: "Redaguoti: Kategorija" } : {})}
      >
        {title}
        <span className="company-category-count">{items.length}</span>
      </h4>
      <div className="company-grid">
        {items.map((c, i) => (
          <CompanyCard
            key={i}
            i={i}
            groupKey={groupKey}
            createdLabel={createdLabel}
            {...c}
          />
        ))}
      </div>
    </div>
  );
}

function Company() {
  const { content } = useContent();
  const t = content.company;
  const [headerRef, headerVisible] = useReveal();

  return (
    <section className="company">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-header reveal reveal-up ${
            headerVisible ? "is-visible" : ""
          }`}
        >
          <Editable as="h2" editKey="company.title" label="Antraštė" className="section-title">
            {t.title}
          </Editable>
          <Editable as="p" editKey="company.sub" label="Paantraštė" className="section-sub">
            {t.sub}
          </Editable>
        </div>

        <CompanyCategory
          id="komercijos"
          title={t.ecommerceTitle}
          titleKey="company.ecommerceTitle"
          items={t.ecommerce}
          groupKey="ecommerce"
          createdLabel={t.createdLabel}
        />

        <CompanyCategory
          id="verslo"
          title={t.businessTitle}
          titleKey="company.businessTitle"
          items={t.business}
          groupKey="business"
          createdLabel={t.createdLabel}
        />
      </div>
    </section>
  );
}

export default Company;
