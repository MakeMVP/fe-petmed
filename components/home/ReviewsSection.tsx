import { REVIEW_COLUMN_INDEXES } from "@/constants/home";
import type { TranslationCopy } from "@/types/home";

type ReviewsSectionProps = {
  t: TranslationCopy;
};

function renderReviewBody(body: string) {
  return body.split(/(@petmed)/gi).map((part, index) =>
    part.toLowerCase() === "@petmed" ? (
      <span className="review-mention" key={`${part}-${index}`}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function ReviewsSection({ t }: ReviewsSectionProps) {
  return (
    <section className="reviews-section" aria-label="Trusted in practice">
      <h2>{t.reviews.title}</h2>
      <p>{t.reviews.subtitle}</p>

      <div className="reviews-columns-wrap">
        <div className="reviews-columns-track">
          {[...REVIEW_COLUMN_INDEXES, ...REVIEW_COLUMN_INDEXES].map((column, columnIndex) => (
            <div className="review-column" key={`column-${columnIndex}`}>
              {column.map((reviewIndex, cardIndex) => {
                const review = t.reviews.cards[reviewIndex];
                return (
                  <article
                    className={`review-card${cardIndex === 1 ? " tilt-cw" : ""}`}
                    key={`${review.name}-${columnIndex}-${reviewIndex}`}
                  >
                    <div className="review-top">
                      <span className="avatar" aria-hidden="true" />
                      <div>
                        <h3>{review.name}</h3>
                        <span>{review.handle}</span>
                      </div>
                      <span className="review-bird" aria-hidden="true">
                        𝕏
                      </span>
                    </div>
                    <p>{renderReviewBody(review.body)}</p>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
