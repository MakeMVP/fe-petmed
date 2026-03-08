"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import translations from "@/content/translations.json";

type Locale = "en" | "ja";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = useMemo(() => translations[locale], [locale]);

  return (
    <div className="landing">
      <header className="top-nav">
        <div className="brand">
          <Image
            src="/logo.svg"
            alt="PetMed logo"
            width={42}
            height={42}
            className="brand-logo"
          />
          <span>PetMed</span>
        </div>

        <nav aria-label="Primary" className="desktop-nav">
          <a href="#how-it-works">{t.nav.howItWorks}</a>
          <a href="#pricing">{t.nav.pricing}</a>
          <a href="#faq">{t.nav.faq}</a>
          <a href="#login">{t.nav.login}</a>
        </nav>

        <div className="top-actions">
          <div className="lang-switch" role="group" aria-label="Language switch">
            <button
              type="button"
              className={locale === "en" ? "active" : ""}
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
            <button
              type="button"
              className={locale === "ja" ? "active" : ""}
              onClick={() => setLocale("ja")}
              aria-pressed={locale === "ja"}
            >
              JP
            </button>
          </div>

          <button type="button" className="btn btn-dark">
            {t.buttons.requestDemo}
          </button>
        </div>

        <details className="mobile-breadcrumb">
          <summary>
            {t.mobile.home}
          </summary>
          <nav aria-label="Mobile menu">
            <a href="#how-it-works">{t.nav.howItWorks}</a>
            <a href="#pricing">{t.nav.pricing}</a>
            <a href="#faq">{t.nav.faq}</a>
            <a href="#login">{t.nav.login}</a>
          </nav>
        </details>
      </header>

      <main>
        <section className="hero-area">
          <section className="hero-copy">
            <h1>
              <span className="muted-line">{t.hero.titleLine1}</span>
              <span className="muted-line">{t.hero.titleLine2}</span>
              <span className="highlight-wrap">
                <span className="highlight">{t.hero.titleHighlight}</span>
              </span>
            </h1>
            <p>{t.hero.subtitle}</p>
            <div className="hero-cta">
              <button type="button" className="btn btn-dark">
                {t.buttons.requestDemo}
                <span aria-hidden="true">↗</span>
              </button>
              <button type="button" className="btn btn-light">
                {t.buttons.seeHowItWorks}
              </button>
            </div>
          </section>

          <section className="assistant-card" aria-label="PetMed AI preview">
            <div className="window-top">
              <div className="dots">
                <span />
                <span />
                <span />
              </div>
              <p>{t.card.label}</p>
            </div>
            <div className="window-body">
              <article className="clinical-panel">
                <h2>{t.card.signsTitle}</h2>
                <div className="chips">
                  <span>{t.card.symptomOne}</span>
                  <span>{t.card.symptomTwo}</span>
                  <span>{t.card.symptomThree}</span>
                </div>
                <div className="prompt-bar">
                  <span>{t.card.inputPlaceholder}</span>
                  <div className="prompt-actions" aria-hidden="true">
                    <span>◔</span>
                    <span>▷</span>
                  </div>
                </div>
              </article>
              <div className="sr-only" aria-live="polite">
                {t.card.insightsTitle} {t.card.insightsBody}
              </div>
            </div>
          </section>
        </section>
        <hr className="section-divider" />

        <section className="support-section" id="how-it-works">
          <div className="support-heading">
            <h2>{t.support.title}</h2>
            <p>{t.support.subtitle}</p>
          </div>

          <div className="support-grid">
            <article className="support-card light">
              <span className="support-icon">☰</span>
              <h3>{t.support.overload.title}</h3>
              <p>{t.support.overload.body}</p>
              <div className="fake-lines">
                <span />
                <span />
                <span />
              </div>
            </article>

            <article className="support-card dark">
              <span className="support-icon">◷</span>
              <h3>{t.support.timeSensitive.title}</h3>
              <p>{t.support.timeSensitive.body}</p>
            </article>

            <article className="support-card lime">
              <span className="support-icon">✚</span>
              <div className="image-block" aria-hidden="true" />
              <h3>{t.support.uncertainty.title}</h3>
              <p>{t.support.uncertainty.body}</p>
            </article>

            <article className="support-card gray">
              <div className="shield-block" aria-hidden="true">
                🛡
              </div>
              <div className="gray-copy">
                <h3>{t.support.evidence.title}</h3>
                <p>{t.support.evidence.body}</p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
