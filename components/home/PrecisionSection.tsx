import Image from "next/image";

import { PRECISION_STEPS_META } from "@/constants/home";
import type { TranslationCopy } from "@/types/home";

type PrecisionSectionProps = {
  t: TranslationCopy;
};

export function PrecisionSection({ t }: PrecisionSectionProps) {
  return (
    <section className="precision-section" aria-label="Precision in 3 steps">
      <h2>{t.precision.title}</h2>
      <div className="precision-grid">
        {t.precision.steps.map((step, index) => (
          <article
            className={`precision-card ${index === 0 ? "left" : ""} ${index === 2 ? "right" : ""}`.trim()}
            key={PRECISION_STEPS_META[index]?.number ?? step.title}
          >
            <div className="precision-visual" aria-hidden="true">
              <Image
                src={PRECISION_STEPS_META[index]?.icon ?? ""}
                alt=""
                width={48}
                height={48}
                aria-hidden="true"
              />
            </div>
            <span className="precision-number">{PRECISION_STEPS_META[index]?.number}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
