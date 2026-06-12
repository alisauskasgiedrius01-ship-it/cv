import { useEffect, useState } from "react";
import { heroImg } from "../content/defaults";
import { useContent } from "../content/ContentContext";
import { Editable } from "./Editable";
import "../style/Hero.css";

function Hero() {
  const { content } = useContent();
  const t = content.hero;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const cls = (extra = "") =>
    `reveal reveal-up ${extra} ${mounted ? "is-visible" : ""}`.trim();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <Editable as="p" editKey="hero.greeting" label="Pasisveikinimas" className={cls("hero-greeting delay-1")}>
                {t.greeting}
              </Editable>
              <Editable as="h1" editKey="hero.name" label="Vardas" className={cls("hero-name delay-2")}>
                {t.name}
              </Editable>
              <Editable as="h2" editKey="hero.role" label="Pareigos" className={cls("hero-role delay-3")}>
                {t.role}
              </Editable>
            </div>

            <Editable as="p" editKey="hero.bio" label="Aprašymas" className={cls("hero-bio delay-4")}>
              {t.bio}
            </Editable>

            <div className={cls("hero-social delay-5")}>
              <a
                href="https://github.com/alisauskasgiedrius01-ship-it"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/giedrius-alisauskas-001788267/"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>

              <a
                href="mailto:alisauskas.giedrius01@gmail.com"
                className="social-link"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Email me
              </a>
            </div>

            <div className={cls("hero-actions delay-6")}>
              <a href="mailto:you@email.com" className="btn btn-primary">
                <Editable editKey="hero.ctaPrimary" label="Pagrindinis mygtukas">
                  {t.ctaPrimary}
                </Editable>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#projects" className="btn btn-outline">
                <Editable editKey="hero.ctaSecondary" label="Antrinis mygtukas">
                  {t.ctaSecondary}
                </Editable>
              </a>
            </div>
          </div>

          <div
            className={`hero-photo-wrap reveal reveal-zoom delay-2 ${
              mounted ? "is-visible" : ""
            }`}
          >
            <div className="hero-photo-ring">
              <img src={heroImg} alt="Profile photo" className="hero-photo" />
            </div>
            <div className="hero-dots" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
