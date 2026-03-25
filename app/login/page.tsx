"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { useLocale } from "@/lib/i18n";

export default function LoginPage() {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/assistant");
    }
  }, [auth.isAuthenticated, router]);

  const signOutRedirect = () => {
    const clientId = "3al3l0i924diqhrus97bijos2o";
    const logoutUri = "http://localhost:3000/login";
    const cognitoDomain = "https://petmed.auth.ap-northeast-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
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

          <div className="auth-form">
            <div className="auth-actions">
              <button
                type="button"
                className="btn btn-dark auth-primary"
                onClick={() => auth.signinRedirect()}
                disabled={auth.isLoading}
              >
                {t.auth.login.signInCognito}
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={signOutRedirect}
                disabled={auth.isLoading}
              >
                {t.auth.login.signOut}
              </button>
            </div>

            {auth.isLoading ? <p className="auth-message">{t.auth.login.loading}</p> : null}
            {auth.error ? <p className="auth-message">{t.auth.login.error}</p> : null}
          </div>
        </section>

        <aside className="auth-visual auth-visual-login" aria-hidden="true" />
      </main>
    </div>
  );
}
