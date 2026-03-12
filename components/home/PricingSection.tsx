import Image from "next/image";

import { TRUSTED_LOGOS } from "@/constants/home";
import type { TranslationCopy } from "@/types/home";

type PricingSectionProps = {
  t: TranslationCopy;
};

export function PricingSection({ t }: PricingSectionProps) {
  return (
    <section className="pricing-cta-section" id="pricing" aria-label="Pricing and demo">
      <div className="pricing-cta-inner">
        <h2>{t.pricing.title}</h2>
        <p>{t.pricing.subtitle}</p>

        <div className="pricing-cards">
          <article className="pricing-card practice-plan">
            <span className="plan-label">{t.pricing.practicePlan.label}</span>
            <p className="plan-price">
              <strong>{t.pricing.practicePlan.price}</strong>
              {t.pricing.practicePlan.priceSuffix}
            </p>
            <ul>
              {t.pricing.practicePlan.features.map((feature) => (
                <li key={feature}>
                  <Image src="/check-1.svg" alt="" width={14} height={14} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button type="button" className="plan-btn light">
              {t.pricing.practicePlan.cta}
            </button>
          </article>

          <article className="pricing-card hospital-plan">
            <span className="plan-label">{t.pricing.hospitalPlan.label}</span>
            <p className="plan-price">
              <strong>{t.pricing.hospitalPlan.price}</strong>
              {t.pricing.hospitalPlan.priceSuffix}
            </p>
            <ul>
              {t.pricing.hospitalPlan.features.map((feature) => (
                <li key={feature}>
                  <Image src="/check-2.svg" alt="" width={14} height={14} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button type="button" className="plan-btn dark">
              {t.pricing.hospitalPlan.cta}
            </button>
          </article>
        </div>

        <div className="trusted-row" aria-label="Trusted by clinics">
          <p>{t.pricing.trusted.label}</p>
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
