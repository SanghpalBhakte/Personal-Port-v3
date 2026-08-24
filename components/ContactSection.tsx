"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/data";
import { useToast } from "./Toast";
import { Button } from "./ui/Button";

export const ContactSection: React.FC = () => {
  const { showToast } = useToast();
  const [copyStatus, setCopyStatus] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "", // Honeypot spam trap
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contactEmail);
      setCopyStatus("Copied");
      showToast("Email address copied to clipboard!", "success");
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
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.errors) {
          setFormErrors(result.errors);
        }
        showToast(result.message || "Failed to send message.", "error");
      } else {
        showToast("Message sent successfully! Thank you.", "success");
        setFormData({ name: "", email: "", message: "", _gotcha: "" });
        setIsFormOpen(false);
      }
    } catch (err) {
      console.error("Submission error:", err);
      showToast("Network error. Please try again or email directly.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact">
      <p className="eyebrow">07 / Contact</p>
      <h2>
        Elsewhere on<br />
        the <a href={`mailto:${siteConfig.contactEmail}`}>internet.</a>
      </h2>

      <div className="footer-links">
        {siteConfig.socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target={social.name !== "Email" ? "_blank" : undefined}
            rel={social.name !== "Email" ? "noreferrer" : undefined}
          >
            {social.name} ↗
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
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="ml-auto text-[10px] font-mono border border-[#747b74] px-2 py-1 hover:border-[var(--accent)] text-[#d4d7d0] hover:text-white transition-colors"
        >
          {isFormOpen ? "Close message form ↑" : "Send a quick note ↓"}
        </button>
      </div>

      {/* Interactive Serverless Contact Form */}
      {isFormOpen && (
        <div className="mt-8 pt-8 border-t border-[#59615b] max-w-xl animate-fade-in">
          <h3 className="font-mono text-xs text-[#b9beb7] uppercase tracking-wider mb-4">
            Send a direct message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            {/* Honeypot field - invisible to real users, catches bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="_gotcha">Leave this field blank</label>
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

            <div>
              <label htmlFor="name" className="block text-[#abb0aa] mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="w-full bg-[#181a18] border border-[#59615b] focus:border-[var(--accent)] text-white px-3 py-2 outline-none font-sans text-sm"
              />
              {formErrors.name && (
                <p className="text-[#b94a32] text-[11px] mt-1">{formErrors.name[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-[#abb0aa] mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="w-full bg-[#181a18] border border-[#59615b] focus:border-[var(--accent)] text-white px-3 py-2 outline-none font-sans text-sm"
              />
              {formErrors.email && (
                <p className="text-[#b94a32] text-[11px] mt-1">{formErrors.email[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-[#abb0aa] mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="What are you working on or thinking about?"
                className="w-full bg-[#181a18] border border-[#59615b] focus:border-[var(--accent)] text-white px-3 py-2 outline-none font-sans text-sm resize-y"
              />
              {formErrors.message && (
                <p className="text-[#b94a32] text-[11px] mt-1">{formErrors.message[0]}</p>
              )}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
              >
                Send Message ↗
              </Button>
              <span className="text-[10px] text-[#abb0aa]">
                Protected by rate limiting & honeypot.
              </span>
            </div>
          </form>
        </div>
      )}

      <p className="copyright">
        © 2026 {siteConfig.name}{" "}
        <span>Made with patience in {siteConfig.originCity}.</span>
      </p>
    </footer>
  );
};
