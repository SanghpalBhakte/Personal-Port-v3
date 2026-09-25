"use client";

import React, { useRef, useState } from "react";
import { siteConfig } from "@/lib/data";
import { useToast } from "./Toast";

export const ContactSection: React.FC = () => {
  const { showToast } = useToast();
  const [copyStatus, setCopyStatus] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // When the form was opened. Bots submit instantly; people take a few seconds.
  const openedAt = useRef(0);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contactEmail);
      setCopyStatus("Copied");
      showToast("Email copied.", "success");
    } catch {
      setCopyStatus(`Email: ${siteConfig.contactEmail}`);
    }
    setTimeout(() => {
      setCopyStatus("");
    }, 2200);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, _elapsed: Date.now() - openedAt.current }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.code === "delivery_unavailable") {
          const subject = encodeURIComponent(`Portfolio note from ${formData.name}`);
          const body = encodeURIComponent(
            `${formData.message}\n\nFrom ${formData.name} (${formData.email})`
          );
          showToast("The form isn’t working right now, so I’m opening your email app instead.", "info");
          window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
          return;
        }
        if (result.errors) {
          setFormErrors(result.errors);
        }
        showToast(result.message || "Couldn’t send that. Please try again or email me directly.", "error");
      } else {
        showToast(result.message || "Sent! I’ll get back to you soon.", "success");
        setFormData({ name: "", email: "", message: "", _gotcha: "" });
        setIsFormOpen(false);
      }
    } catch {
      showToast("Couldn’t send that. Check your connection or email me directly.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact">
      <div className="footer-top">
        <p className="eyebrow">07 / Contact</p>
        <span className="footer-subtext">Where you can find me</span>
      </div>

      <h2>
        Let&rsquo;s talk.<br />
        <a href={`mailto:${siteConfig.contactEmail}`}>Email me.</a>
      </h2>

      <div className="footer-links">
        {siteConfig.socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target={social.name !== "Email" ? "_blank" : undefined}
            rel={social.name !== "Email" ? "noreferrer" : undefined}
          >
            <span>{social.name}</span>
            <span className="link-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <div className="email-action">
        <a href={`mailto:${siteConfig.contactEmail}`}>
          {siteConfig.contactEmail}
        </a>
        <button type="button" id="copy-email" onClick={handleCopyEmail}>
          Copy email
        </button>
        <span id="copy-status" aria-live="polite">
          {copyStatus}
        </span>
        <button
          type="button"
          className="form-toggle-btn"
          onClick={() => {
            if (!isFormOpen) openedAt.current = Date.now();
            setIsFormOpen(!isFormOpen);
          }}
          style={{ marginLeft: "auto" }}
        >
          {isFormOpen ? "Close note form ↑" : "Send a quick note ↓"}
        </button>
      </div>

      {isFormOpen && (
        <div className="note-form-wrapper">
          <form onSubmit={handleSubmit} className="note-form">
            {/* Honeypot field for spam detection */}
            <div style={{ display: "none" }} aria-hidden="true">
              <label htmlFor="_gotcha">Leave this blank</label>
              <input
                type="text"
                id="_gotcha"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
              />
              {formErrors.name && (
                <span className="form-field-error">{formErrors.name[0]}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
              />
              {formErrors.email && (
                <span className="form-field-error">{formErrors.email[0]}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="What’s on your mind?"
              />
              {formErrors.message && (
                <span className="form-field-error">{formErrors.message[0]}</span>
              )}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send note ↗"}
              </button>
            </div>
          </form>
        </div>
      )}

      <p className="copyright">
        © 2026 {siteConfig.name} · v{siteConfig.version}{" "}
        <span>Made in {siteConfig.locationCity}</span>
      </p>
    </footer>
  );
};
