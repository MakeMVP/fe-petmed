import { CONCERN_CARDS, MEET_BENEFITS } from "@/constants/home";

export function MeetPetMedSection() {
  return (
    <section className="meet-petmed" aria-label="Meet PetMed">
      <div className="meet-petmed-inner">
        <h2>Meet PetMed.</h2>
        <p className="meet-subtitle">Enhanced intuition with real-time data processing.</p>

        <ul className="meet-benefits" aria-label="Platform benefits">
          {MEET_BENEFITS.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>

        <div className="concerns-grid">
          {CONCERN_CARDS.map((concern) => (
            <article className="concern-card" key={concern.title}>
              <h3>
                <span aria-hidden="true">{concern.icon}</span>
                {concern.title}
              </h3>
              <p>{concern.body}</p>
            </article>
          ))}
        </div>

        <button type="button" className="meet-cta">
          Explore the Platform
        </button>
      </div>
    </section>
  );
}
