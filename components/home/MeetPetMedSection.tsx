import Image from "next/image";

import { CONCERN_ICONS } from "@/constants/home";
import type { TranslationCopy } from "@/types/home";

type MeetPetMedSectionProps = {
  t: TranslationCopy;
};

export function MeetPetMedSection({ t }: MeetPetMedSectionProps) {
  return (
    <section className="meet-petmed" aria-label="Meet PetMed">
      <div className="meet-petmed-inner">
        <h2>{t.meet.title}</h2>
        <p className="meet-subtitle">{t.meet.subtitle}</p>

        <ul className="meet-benefits" aria-label="Platform benefits">
          {t.meet.benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>

        <div className="concerns-grid">
          {t.meet.concerns.map((concern, index) => (
            <article className="concern-card" key={concern.title}>
              <h3>
                <span aria-hidden="true">
                  <Image
                    src={CONCERN_ICONS[index % CONCERN_ICONS.length]}
                    alt=""
                    width={24}
                    height={24}
                  />
                </span>
                {concern.title}
              </h3>
              <p>{concern.body}</p>
            </article>
          ))}
        </div>

        <button type="button" className="meet-cta">
          {t.meet.cta}
        </button>
      </div>
    </section>
  );
}
