"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "react-oidc-context";

import { useLocale } from "@/lib/i18n";

export default function SignupPage() {
  const { locale, setLocale, t } = useLocale();
  const auth = useAuth();

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

          <div className="auth-form">
            <div className="auth-actions">
              <button
                type="button"
                className="btn btn-dark auth-primary"
                onClick={() => auth.signinRedirect({ extraQueryParams: { screen_hint: "signup" } })}
                disabled={auth.isLoading}
              >
                {t.auth.signup.createWithCognito}
              </button>
            </div>

            {auth.isLoading ? <p className="auth-message">{t.auth.signup.loading}</p> : null}
            {auth.error ? <p className="auth-message">{t.auth.signup.error}</p> : null}

            <p className="auth-meta">
              {t.auth.signup.alreadyAccount} <Link href="/login">{t.auth.common.login}</Link>
            </p>
          </div>
        </section>

        <aside className="auth-visual auth-visual-signup" aria-hidden="true" />
      </main>
    </div>
  );
}
