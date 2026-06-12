import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { useContent } from "../content/ContentContext";
import { Editable } from "./Editable";
import "../style/Projects.css";

function TimelineItem({ exp, i, total, isActive, onToggle }) {
  const [itemRef, visible] = useReveal({ threshold: 0.2 });

  return (
    <div
      ref={itemRef}
      className={`timeline-item reveal reveal-up ${visible ? "is-visible" : ""} ${
        isActive ? "is-active" : ""
      }`}
      style={{ transitionDelay: `${i * 0.12}s` }}
    >
      <div className="timeline-left">
        <Editable editKey={`projects.experience.${i}.period`} label="Laikotarpis" className="timeline-period">
          {exp.period}
        </Editable>
      </div>
      <div className="timeline-connector">
        <button
          type="button"
          className="timeline-dot"
          aria-expanded={isActive}
          aria-label={`Toggle ${exp.title}`}
          onClick={() => onToggle(i)}
        />
        {i < total - 1 && <div className="timeline-line" />}
      </div>
      <div className="timeline-right">
        <button
          type="button"
          className="timeline-head"
          aria-expanded={isActive}
          onClick={() => onToggle(i)}
        >
          <Editable as="h3" editKey={`projects.experience.${i}.title`} label="Pareigų pavadinimas" className="timeline-role">
            {exp.title}
          </Editable>
          {exp.company && (
            <Editable as="p" editKey={`projects.experience.${i}.company`} label="Įmonė" className="timeline-company">
              {exp.company}
            </Editable>
          )}
          <svg
            className="timeline-chevron"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            width="18"
            height="18"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <div className="timeline-body">
          <Editable as="ul" editKey={`projects.experience.${i}.desc`} label="Punktų sąrašas">
            {Array.isArray(exp.desc) ? (
              exp.desc.map((d, j) => <li key={j}>{d}</li>)
            ) : (
              <li>{exp.desc}</li>
            )}
          </Editable>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, i, statusLabels }) {
  const [cardRef, visible] = useReveal({ threshold: 0.15 });
  const isDone = project.status === "done";
  return (
    <a
      ref={cardRef}
      href={project.link}
      rel="noreferrer"
      className={`project-card card-pop ${visible ? "is-visible" : ""}`}
      style={{ animationDelay: `${i * 0.12}s` }}
    >
      <div className="project-card-top">
        <Editable
          editKey={isDone ? "projects.statusDone" : "projects.statusProgress"}
          label="Statuso tekstas"
          className={`project-status project-status--${project.status}`}
        >
          {isDone ? statusLabels.done : statusLabels.progress}
        </Editable>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          width="18"
          height="18"
          className="project-arrow"
          aria-hidden="true"
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
      <Editable as="h3" editKey={`projects.items.${i}.title`} label="Projekto pavadinimas" className="project-title">
        {project.title}
      </Editable>
      <Editable as="p" editKey={`projects.items.${i}.desc`} label="Projekto aprašymas" className="project-desc">
        {project.desc}
      </Editable>
      <Editable editKey={`projects.items.${i}.tags`} label="Žymos" className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-tag">
            {tag}
          </span>
        ))}
      </Editable>
    </a>
  );
}

function Projects() {
  const { content } = useContent();
  const t = content.projects;
  const [activeIdx, setActiveIdx] = useState(0);
  const [careerHeaderRef, careerVisible] = useReveal();
  const [projectsHeaderRef, projectsVisible] = useReveal();

  const handleToggle = (idx) => {
    setActiveIdx((cur) => (cur === idx ? -1 : idx));
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        {/* ── Work experience ──────────────────── */}
        <div
          ref={careerHeaderRef}
          className={`section-header reveal reveal-up ${
            careerVisible ? "is-visible" : ""
          }`}
        >

          <Editable as="h2" editKey="projects.careerTitle" label="Antraštė" className="section-title">
            {t.careerTitle}
          </Editable>
          <Editable as="p" editKey="projects.careerSub" label="Paantraštė" className="section-sub">
            {t.careerSub}
          </Editable>
        </div>

        <div className="timeline">
          {t.experience.map((exp, i) => (
            <TimelineItem
              key={i}
              exp={exp}
              i={i}
              total={t.experience.length}
              isActive={activeIdx === i}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {/* ── Projects grid ────────────────────── */}
        <div
          ref={projectsHeaderRef}
          className={`section-header projects-header reveal reveal-up ${
            projectsVisible ? "is-visible" : ""
          }`}
        >

          <Editable as="h2" editKey="projects.projectsTitle" label="Antraštė" className="section-title">
            {t.projectsTitle}
          </Editable>
          <Editable as="p" editKey="projects.projectsSub" label="Paantraštė" className="section-sub">
            {t.projectsSub}
          </Editable>
        </div>

        <div className="projects-grid">
          {t.items.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              i={i}
              statusLabels={{ done: t.statusDone, progress: t.statusProgress }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
