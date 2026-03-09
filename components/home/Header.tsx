import Image from "next/image";

import { NAV_LINKS } from "@/constants/home";
import type { Locale, TranslationCopy } from "@/types/home";

type HeaderProps = {
  locale: Locale;
  mobileMenuOpen: boolean;
  t: TranslationCopy;
  onLocaleChange: (locale: Locale) => void;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
};

export function Header({
  locale,
  mobileMenuOpen,
  t,
  onLocaleChange,
  onToggleMobileMenu,
  onCloseMobileMenu,
}: HeaderProps) {
  return (
    <header className="top-nav">
      <div className="brand">
        <Image src="/logo.svg" alt="PetMed logo" width={42} height={42} className="brand-logo" />
        <span>PetMed</span>
      </div>

      <nav aria-label="Primary" className="desktop-nav">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {t.nav[link.labelKey]}
          </a>
        ))}
      </nav>

      <div className="top-actions">
        <div className="lang-switch" role="group" aria-label="Language switch">
          <button
            type="button"
            className={locale === "en" ? "active" : ""}
            onClick={() => onLocaleChange("en")}
            aria-pressed={locale === "en"}
          >
            EN
          </button>
          <button
            type="button"
            className={locale === "ja" ? "active" : ""}
            onClick={() => onLocaleChange("ja")}
            aria-pressed={locale === "ja"}
          >
            JP
          </button>
        </div>

        <button type="button" className="btn btn-dark">
          {t.buttons.requestDemo}
        </button>
      </div>

      <button
        type="button"
        className={`mobile-menu-toggle${mobileMenuOpen ? " open" : ""}`}
        aria-label="Toggle mobile menu"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu-panel"
        onClick={onToggleMobileMenu}
      >
        <span />
        <span />
        <span />
      </button>

      <section
        id="mobile-menu-panel"
        className={`mobile-menu${mobileMenuOpen ? " open" : ""}`}
        aria-label="Mobile menu"
      >
        <nav aria-label="Mobile links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={onCloseMobileMenu}>
              {t.nav[link.labelKey]}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <div className="lang-switch" role="group" aria-label="Language switch">
            <button
              type="button"
              className={locale === "en" ? "active" : ""}
              onClick={() => onLocaleChange("en")}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
            <button
              type="button"
              className={locale === "ja" ? "active" : ""}
              onClick={() => onLocaleChange("ja")}
              aria-pressed={locale === "ja"}
            >
              JP
            </button>
          </div>
          <button type="button" className="btn btn-dark">
            {t.buttons.requestDemo}
          </button>
        </div>
      </section>
    </header>
  );
}
