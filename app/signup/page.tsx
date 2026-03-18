"use client";

import Image from "next/image";
import Link from "next/link";

import { useLocale } from "@/lib/i18n";

export default function SignupPage() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="auth-page auth-signup">
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
          <Link href="/login" className="btn btn-light">
            {t.auth.common.login}
          </Link>
        </div>
      </header>

      <main className="auth-shell">
        <section className="auth-card">
          <div className="auth-card-header">
            <p className="auth-eyebrow">{t.auth.signup.eyebrow}</p>
            <h1>{t.auth.signup.title}</h1>
            <p>{t.auth.signup.subtitle}</p>
          </div>

          <form className="auth-form auth-grid">
            <label className="auth-field">
              <span>{t.auth.signup.fullNameLabel}</span>
              <input type="text" name="fullName" placeholder={t.auth.signup.fullNamePlaceholder} required />
            </label>
            <label className="auth-field">
              <span>{t.auth.signup.clinicNameLabel}</span>
              <input type="text" name="clinicName" placeholder={t.auth.signup.clinicNamePlaceholder} required />
            </label>
            <label className="auth-field auth-span">
              <span>{t.auth.signup.emailLabel}</span>
              <input type="email" name="email" placeholder={t.auth.signup.emailPlaceholder} required />
            </label>
            <label className="auth-field">
              <span>{t.auth.signup.licenseLabel}</span>
              <input type="text" name="license" placeholder={t.auth.signup.licensePlaceholder} required />
            </label>
            <label className="auth-field">
              <span>{t.auth.signup.passwordLabel}</span>
              <input type="password" name="password" placeholder={t.auth.signup.passwordPlaceholder} required />
            </label>
            <label className="auth-field">
              <span>{t.auth.signup.confirmPasswordLabel}</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder={t.auth.signup.confirmPasswordPlaceholder}
                required
              />
            </label>
            <button type="submit" className="btn btn-dark auth-primary auth-span">
              {t.auth.signup.submit}
            </button>
            <p className="auth-meta auth-span">
              {t.auth.signup.alreadyAccount} <Link href="/login">{t.auth.common.login}</Link>
            </p>
          </form>
        </section>

        <aside className="auth-visual auth-visual-signup" aria-hidden="true" />
      </main>
    </div>
  );
}
