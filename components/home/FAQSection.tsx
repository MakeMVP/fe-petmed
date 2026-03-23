import type { TranslationCopy } from "@/types/home";

type FAQSectionProps = {
  t: TranslationCopy;
};

export function FAQSection({ t }: FAQSectionProps) {
  return (
    <section className="faq-section" id="faq">
      <div className="faq-heading">
        <h2>{t.faq.title}</h2>
        <p>{t.faq.subtitle}</p>
      </div>
      <div className="faq-grid">
        {t.faq.items.map((item) => (
          <article key={item.question} className="faq-card">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
