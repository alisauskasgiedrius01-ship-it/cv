import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useReveal } from "../hooks/useReveal";
import { useContent } from "../content/ContentContext";
import { Editable } from "./Editable";
import "../style/ContactForm.css";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// EmailJS is configured only when all three keys exist and aren't the
// placeholder values that ship in the example .env file.
const IS_CONFIGURED = [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY].every(
  (v) => v && !v.startsWith("your_")
);

const INITIAL = { name: "", email: "", subject: "", message: "", _hp: "" };
const MIN_FILL_MS = 3000; // bots fill forms instantly

function ContactForm() {
  const { content } = useContent();
  const t = content.contact;
  const formRef    = useRef(null);
  const [headerRef, headerVisible] = useReveal();
  const [formCardRef, formCardVisible] = useReveal({ threshold: 0.1 });
  const [fields, setFields] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});
  const mountedAt  = useRef(Date.now());

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const errs = {};
    if (!fields.name.trim())    errs.name    = "Įveskite vardą";
    if (!fields.email.trim())   errs.email   = "Įveskite el. paštą";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                                errs.email   = "Neteisingas el. pašto formatas";
    if (!fields.subject.trim()) errs.subject = "Įveskite temą";
    if (!fields.message.trim()) errs.message = "Įveskite žinutę";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Honeypot — bots fill the hidden field, humans never see it
    if (fields._hp) return;

    // Timing check — bots submit faster than any human can read the form
    if (Date.now() - mountedAt.current < MIN_FILL_MS) return;

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (!IS_CONFIGURED) {
      console.error(
        "EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, " +
          "VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in your .env file " +
          "with real values from https://dashboard.emailjs.com, then restart the dev server."
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("success");
      setFields(INITIAL);
    } catch (err) {
      console.error("EmailJS sendForm failed:", err);
      setStatus("error");
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-header reveal reveal-up ${
            headerVisible ? "is-visible" : ""
          }`}
        >
          <Editable as="h2" editKey="contact.title" label="Antraštė" className="section-title">
            {t.title}
          </Editable>
          <Editable as="p" editKey="contact.sub" label="Paantraštė" className="section-sub">
            {t.sub}
          </Editable>
        </div>

        <div
          ref={formCardRef}
          className={`reveal reveal-zoom ${formCardVisible ? "is-visible" : ""}`}
        >
        <form
          ref={formRef}
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Honeypot — visually hidden, only bots fill this */}
          <input
            type="text"
            name="_hp"
            value={fields._hp}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="contact-honeypot"
          />

          <div className="contact-row">
            <div className="contact-field">
              <label className="contact-label" htmlFor="cf-name">
                <Editable editKey="contact.nameLabel" label="Vardas etiketė">{t.nameLabel}</Editable>{" "}
                <span className="contact-required">*</span>
              </label>
              <input
                id="cf-name"
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
                placeholder={t.namePlaceholder}
                className={`contact-input${errors.name ? " contact-input--error" : ""}`}
                autoComplete="name"
              />
              {errors.name && <span className="contact-error">{errors.name}</span>}
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="cf-email">
                <Editable editKey="contact.emailLabel" label="El. paštas etiketė">{t.emailLabel}</Editable>{" "}
                <span className="contact-required">*</span>
              </label>
              <input
                id="cf-email"
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                placeholder={t.emailPlaceholder}
                className={`contact-input${errors.email ? " contact-input--error" : ""}`}
                autoComplete="email"
              />
              {errors.email && <span className="contact-error">{errors.email}</span>}
            </div>
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="cf-subject">
              <Editable editKey="contact.subjectLabel" label="Tema etiketė">{t.subjectLabel}</Editable>{" "}
              <span className="contact-required">*</span>
            </label>
            <input
              id="cf-subject"
              type="text"
              name="subject"
              value={fields.subject}
              onChange={handleChange}
              placeholder={t.subjectPlaceholder}
              className={`contact-input${errors.subject ? " contact-input--error" : ""}`}
            />
            {errors.subject && <span className="contact-error">{errors.subject}</span>}
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="cf-message">
              <Editable editKey="contact.messageLabel" label="Žinutė etiketė">{t.messageLabel}</Editable>{" "}
              <span className="contact-required">*</span>
            </label>
            <textarea
              id="cf-message"
              name="message"
              value={fields.message}
              onChange={handleChange}
              placeholder={t.messagePlaceholder}
              rows={6}
              className={`contact-textarea${errors.message ? " contact-input--error" : ""}`}
            />
            {errors.message && <span className="contact-error">{errors.message}</span>}
          </div>

          <div className="contact-footer">
            {status === "success" && (
              <Editable as="p" editKey="contact.successMsg" label="Sėkmės žinutė" className="contact-status contact-status--success">
                {t.successMsg}
              </Editable>
            )}
            {status === "error" && (
              <Editable as="p" editKey="contact.errorMsg" label="Klaidos žinutė" className="contact-status contact-status--error">
                {t.errorMsg}
              </Editable>
            )}

            <button
              type="submit"
              className="btn btn-primary contact-btn"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <span className="contact-spinner" aria-hidden="true" />
                  {t.sendingLabel}
                </>
              ) : (
                <>
                  <Editable editKey="contact.submitLabel" label="Siuntimo mygtukas">
                    {t.submitLabel}
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
                </>
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
