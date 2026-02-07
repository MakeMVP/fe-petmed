export default function Home() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">
            PetMed
            <span className="logo-dot" aria-hidden="true" />
          </div>
          <nav className="nav-tabs" aria-label="Primary">
            <a className="tab active" href="#home">
              Home
            </a>
            <a className="tab" href="#strengths">
              Strengths
            </a>
            <a className="tab" href="#use-cases">
              Use Cases
            </a>
            <a className="tab" href="#pricing">
              Pricing
            </a>
          </nav>
          <div className="header-actions">
            <button className="ghost-btn" type="button">
              Log in
            </button>
            <button className="primary-btn" type="button">
              Start free
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">AI chat for pet parents</p>
              <h1 className="hero-title">
                Confidence in every pet decision, powered by AI.
              </h1>
              <p className="hero-subtitle">
                PetMed is a conversational AI companion that turns everyday
                pet questions into clear, friendly guidance. Ask once, get a
                tailored answer in seconds.
              </p>
              <div className="hero-actions">
                <button className="primary-btn" type="button">
                  Start free trial
                </button>
                <button className="ghost-btn" type="button">
                  Watch demo
                </button>
              </div>
              <div className="hero-trust">
                <div>
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Always-on chat</span>
                </div>
                <div>
                  <span className="stat-number">Vet-Reviewed</span>
                  <span className="stat-label">Guidance you can trust</span>
                </div>
                <div>
                  <span className="stat-number">Multi-Pet</span>
                  <span className="stat-label">Profiles for every pet</span>
                </div>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-top">
                <div className="hero-badge">Live chat preview</div>
                <h2>Ask anything, anytime</h2>
                <p>Behavior, nutrition, training, and wellness.</p>
              </div>
              <div className="chat-window">
                <div className="chat-bubble user">
                  My dog keeps licking his paws at night. Should I worry?
                </div>
                <div className="chat-bubble bot">
                  Here are common causes and gentle steps you can try tonight.
                  If it continues, I can help you prepare questions for a vet.
                </div>
                <div className="chat-bubble user">
                  What can I do right now?
                </div>
                <div className="chat-bubble bot">
                  Start with a quick check for redness and switch to a cone for
                  24 hours. I’ll set a reminder to follow up tomorrow.
                </div>
              </div>
              <div className="hero-card-foot">
                <span>Suggested: Sleep + skin check-in</span>
                <button className="link-btn" type="button">
                  Add routine
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="value-strip" id="strengths">
          <div className="container value-grid">
            <div>
              <h3>Why PetMed feels different</h3>
              <p>
                Built for pet parents, not professionals. Clear answers, calm
                tone, and follow-up steps you can actually use.
              </p>
            </div>
            <div className="value-list">
              <span>Vet-reviewed knowledge base</span>
              <span>Personalized to each pet</span>
              <span>Actionable next steps</span>
              <span>Shareable chat summaries</span>
            </div>
          </div>
        </section>

        <section className="feature-section" id="use-cases">
          <div className="container feature-grid">
            <div className="feature-card">
              <p className="feature-tag">Behavior</p>
              <h3>Decode the “why” behind their behavior</h3>
              <p>
                Spot patterns in barking, chewing, sleep, or anxiety and get
                gentle training tips tailored to your pet.
              </p>
              <ul className="feature-pills" aria-label="Behavior features">
                <li>Behavior insights</li>
                <li>Routine tracking</li>
                <li>Calming plans</li>
              </ul>
            </div>
            <div className="feature-card">
              <p className="feature-tag">Nutrition</p>
              <h3>Food guidance that fits your pet</h3>
              <p>
                Ask about ingredients, portion size, allergies, and treats with
                confidence.
              </p>
              <ul className="feature-pills" aria-label="Nutrition features">
                <li>Ingredient checks</li>
                <li>Portion calculator</li>
                <li>Hydration tips</li>
              </ul>
            </div>
            <div className="feature-card">
              <p className="feature-tag">Health</p>
              <h3>Know when it’s urgent</h3>
              <p>
                Understand symptoms, capture notes, and get help preparing for
                your next vet visit.
              </p>
              <ul className="feature-pills" aria-label="Health features">
                <li>Symptom checklists</li>
                <li>Visit prep notes</li>
                <li>Follow-up reminders</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="steps" id="how">
          <div className="container steps-grid">
            <div className="steps-header">
              <p className="eyebrow">How it works</p>
              <h3>Get reliable answers in three quick steps</h3>
            </div>
            <div className="steps-list">
              <div className="step-card">
                <span className="step-number">01</span>
                <h4>Ask your question</h4>
                <p>Type or speak your concern in natural language.</p>
              </div>
              <div className="step-card">
                <span className="step-number">02</span>
                <h4>Receive guided answers</h4>
                <p>PetMed responds with clear guidance and next steps.</p>
              </div>
              <div className="step-card">
                <span className="step-number">03</span>
                <h4>Save the summary</h4>
                <p>Share summaries with family or your veterinarian.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing" id="pricing">
          <div className="container pricing-grid">
            <div className="pricing-copy">
              <p className="eyebrow">Pricing</p>
              <h3>Start free. Upgrade when you need more.</h3>
              <p>
                Try PetMed with unlimited chats for one pet. Upgrade to add more
                profiles, deeper routines, and shared access.
              </p>
            </div>
            <div className="pricing-card">
              <div>
                <p className="pricing-label">PetMed Plus</p>
                <div className="pricing-amount">
                  <span>$19</span>
                  <small>/month</small>
                </div>
                <p className="pricing-note">Cancel anytime.</p>
              </div>
              <ul className="pricing-list">
                <li>Unlimited AI chat</li>
                <li>Up to 5 pet profiles</li>
                <li>Daily reminders</li>
                <li>Share with family</li>
              </ul>
              <button className="primary-btn" type="button">
                Start free trial
              </button>
            </div>
          </div>
        </section>

        <section className="auth" id="login">
          <div className="container auth-grid">
            <div className="auth-card">
              <div className="auth-header">
                <h3>Log in</h3>
                <p>Continue your chat history and pet routines.</p>
              </div>
              <form className="auth-form">
                <label>
                  Email
                  <input type="email" placeholder="you@email.com" />
                </label>
                <label>
                  Password
                  <input type="password" placeholder="••••••••" />
                </label>
                <div className="auth-row">
                  <label className="checkbox">
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <button className="link-btn" type="button">
                    Forgot password?
                  </button>
                </div>
                <button className="primary-btn" type="submit">
                  Log in
                </button>
              </form>
            </div>

            <div className="auth-card featured">
              <div className="auth-header">
                <h3>Create an account</h3>
                <p>Set up your pet profile and start chatting right away.</p>
              </div>
              <form className="auth-form">
                <label>
                  Full name
                  <input type="text" placeholder="Jordan Lee" />
                </label>
                <label>
                  Email
                  <input type="email" placeholder="jordan@email.com" />
                </label>
                <label>
                  Pet type
                  <select>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Other</option>
                  </select>
                </label>
                <button className="primary-btn" type="submit">
                  Create account
                </button>
                <p className="fine-print">
                  By joining, you agree to the membership terms and privacy
                  policy.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h4>PetMed</h4>
            <p>AI chat support for everyday pet questions.</p>
          </div>
          <div>
            <p className="footer-label">Contact</p>
            <p>support@petmed.com</p>
            <p>1-800-PET-MED</p>
          </div>
          <div>
            <p className="footer-label">Locations</p>
            <p>Atlanta · Seattle · Austin</p>
            <p>New clinic openings weekly</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
