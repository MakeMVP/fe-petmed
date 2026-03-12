import type { TranslationCopy } from "@/types/home";

import Image from "next/image";

type HeroSectionProps = {
  t: TranslationCopy;
};

export function HeroSection({ t }: HeroSectionProps) {
  return (
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
            <Image src="/Vector.svg" alt="" width={16} height={16} aria-hidden="true" />
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
                <span><Image src="/Mic.svg" alt="" width={16} height={16} aria-hidden="true" /></span>
                <span><Image src="/Go.svg" alt="" width={16} height={16} aria-hidden="true" /></span>
              </div>
            </div>
          </article>
          <div className="sr-only" aria-live="polite">
            {t.card.insightsTitle} {t.card.insightsBody}
          </div>
        </div>
      </section>
    </section>
  );
}
