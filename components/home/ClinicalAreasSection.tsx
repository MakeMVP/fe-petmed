import Image from "next/image";

import { CLINICAL_AREA_ICONS } from "@/constants/home";
import type { TranslationCopy } from "@/types/home";

type ClinicalAreasSectionProps = {
  t: TranslationCopy;
};

export function ClinicalAreasSection({ t }: ClinicalAreasSectionProps) {
  return (
    <section className="clinical-areas-section" aria-label="Clinical areas">
      <h2 className="clinical-areas-title">{t.clinicalAreas.title}</h2>
      <div className="areas-carousel">
        <div className="areas-track">
          {[...t.clinicalAreas.cards, ...t.clinicalAreas.cards].map((card, index) => (
            <article className="area-card" key={`${card.title}-${index}`}>
              <h3>
                <span className="area-icon" aria-hidden="true">
                  <Image
                    src={CLINICAL_AREA_ICONS[index % CLINICAL_AREA_ICONS.length]}
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                </span>
                {card.title}
              </h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
