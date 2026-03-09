import { PRECISION_STEPS } from "@/constants/home";

export function PrecisionSection() {
  return (
    <section className="precision-section" aria-label="Precision in 3 steps">
      <h2>Precision in 3 Steps.</h2>
      <div className="precision-grid">
        {PRECISION_STEPS.map((step, index) => (
          <article
            className={`precision-card ${index === 0 ? "left" : ""} ${index === 2 ? "right" : ""}`.trim()}
            key={step.number}
          >
            <div className="precision-visual" aria-hidden="true">
              <span>{step.icon}</span>
            </div>
            <span className="precision-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
