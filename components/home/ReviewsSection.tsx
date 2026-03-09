import { REVIEW_COLUMNS } from "@/constants/home";

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

export function ReviewsSection() {
  return (
    <section className="reviews-section" aria-label="Trusted in practice">
      <h2>Trusted in Practice</h2>
      <p>
        Real experiences from veterinarians and independent doctors integrate PetMed AI into everyday cases.
      </p>

      <div className="reviews-columns-wrap">
        <div className="reviews-columns-track">
          {[...REVIEW_COLUMNS, ...REVIEW_COLUMNS].map((column, columnIndex) => (
            <div className="review-column" key={`column-${columnIndex}`}>
              {column.map((review, cardIndex) => (
                <article className="review-card" key={`${review.name}-${columnIndex}-${cardIndex}`}>
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
