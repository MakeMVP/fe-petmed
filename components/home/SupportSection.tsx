import Image from "next/image";

import type { TranslationCopy } from "@/types/home";

type SupportSectionProps = {
  t: TranslationCopy;
};

export function SupportSection({ t }: SupportSectionProps) {
  return (
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
          <div className="image-block diagnosis-image" aria-hidden="true">
            <Image
              src="/diagonosis.svg"
              alt=""
              fill
              sizes="(max-width: 767px) 92vw, (max-width: 1023px) 80vw, 32vw"
            />
          </div>
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
  );
}
