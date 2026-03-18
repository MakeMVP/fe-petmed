"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { useLocale } from "@/lib/i18n";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const { locale, setLocale, t } = useLocale();
  const formatMessage = (template: string, value: string) => template.replace("{email}", value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === "email") {
      setStep("otp");
      setMessage(formatMessage(t.auth.login.sentCode, email || t.auth.login.fallbackEmail));
      return;
    }

    setMessage(t.auth.login.verified);
    router.push("/assistant");
  };

  const handleBack = () => {
    setStep("email");
    setOtp("");
    setMessage("");
  };

  const handleResend = () => {
    setMessage(formatMessage(t.auth.login.resent, email || t.auth.login.fallbackEmail));
  };

  return (
    <div className="auth-page auth-login">
      <header className="auth-header">
        <Link href="/" className="brand" aria-label={t.auth.common.home}>
          <Image src="/logo.svg" alt="PetMed logo" width={42} height={42} className="brand-logo" />
          <span>PetMed</span>
        </Link>
        <div className="auth-header-links">
          <Link href="/">{t.auth.common.home}</Link>
          <div className="lang-switch" role="group" aria-label={t.auth.common.languageToggle}>
            <button
              type="button"
              className={locale === "en" ? "active" : ""}
              aria-pressed={locale === "en"}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={locale === "ja" ? "active" : ""}
              aria-pressed={locale === "ja"}
              onClick={() => setLocale("ja")}
            >
              JA
            </button>
          </div>
          <Link href="/signup" className="btn btn-light">
            {t.auth.common.signup}
          </Link>
        </div>
      </header>

      <main className="auth-shell">
        <section className="auth-card">
          <div className="auth-card-header">
            <p className="auth-eyebrow">{t.auth.login.eyebrow}</p>
            <h1>{t.auth.login.title}</h1>
            <p>{t.auth.login.subtitle}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {step === "email" ? (
              <label className="auth-field">
                <span>{t.auth.login.emailLabel}</span>
                <input
                  type="email"
                  name="email"
                  placeholder={t.auth.login.emailPlaceholder}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>
            ) : (
              <label className="auth-field">
                <span>{t.auth.login.otpLabel}</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="otp"
                  placeholder={t.auth.login.otpPlaceholder}
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  required
                />
              </label>
            )}

            <div className="auth-actions">
              {step === "otp" && (
                <button type="button" className="btn btn-light" onClick={handleBack}>
                  {t.auth.login.back}
                </button>
              )}
              <button type="submit" className="btn btn-dark auth-primary">
                {step === "email" ? t.auth.login.sendOtp : t.auth.login.verify}
              </button>
            </div>

            {message ? <p className="auth-message">{message}</p> : null}

            {step === "otp" ? (
              <div className="auth-meta">
                <span>{t.auth.login.didntGetCode}</span>
                <button type="button" className="auth-link" onClick={handleResend}>
                  {t.auth.login.resend}
                </button>
              </div>
            ) : null}
          </form>
        </section>

        <aside className="auth-visual auth-visual-login" aria-hidden="true" />
      </main>
    </div>
  );
}
