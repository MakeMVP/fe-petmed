import { CLINICAL_AREA_CARDS } from "@/constants/home";

export function ClinicalAreasSection() {
  return (
    <section className="clinical-areas-section" aria-label="Clinical areas">
      <h2 className="clinical-areas-title">Covering Comprehensive Clinical Areas</h2>
      <div className="areas-carousel">
        <div className="areas-track">
          {[...CLINICAL_AREA_CARDS, ...CLINICAL_AREA_CARDS].map((card, index) => (
            <article className="area-card" key={`${card.title}-${index}`}>
              <h3>
                <span className="area-icon" aria-hidden="true">
                  {card.icon}
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
