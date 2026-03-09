import { HOSPITAL_PLAN_FEATURES, PRACTICE_PLAN_FEATURES, TRUSTED_LOGOS } from "@/constants/home";

export function PricingSection() {
  return (
    <section className="pricing-cta-section" id="pricing" aria-label="Pricing and demo">
      <div className="pricing-cta-inner">
        <h2>Ready to elevate your practice?</h2>
        <p>Join 2,000+ veterinary hospitals using PetMed to redefine animal care.</p>

        <div className="pricing-cards">
          <article className="pricing-card practice-plan">
            <span className="plan-label">Practice Plan</span>
            <p className="plan-price">
              <strong>¥199</strong>/mo
            </p>
            <ul>
              {PRACTICE_PLAN_FEATURES.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button type="button" className="plan-btn light">
              Start Free 14-Day Trial
            </button>
          </article>

          <article className="pricing-card hospital-plan">
            <span className="plan-label">Hospital Network</span>
            <p className="plan-price">
              <strong>Custom</strong>
            </p>
            <ul>
              {HOSPITAL_PLAN_FEATURES.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button type="button" className="plan-btn dark">
              Book a Demo
            </button>
          </article>
        </div>

        <div className="trusted-row" aria-label="Trusted by clinics">
          <p>Trusted by world-leading clinics</p>
          <div className="trusted-logos" aria-hidden="true">
            {TRUSTED_LOGOS.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
