import Image from "next/image";

import type { TranslationCopy } from "@/types/home";

type SiteFooterProps = {
  t: TranslationCopy;
};

export function SiteFooter({ t }: SiteFooterProps) {
  const socialIcons: Record<string, string> = {
    "#youtube": "/youtube.svg",
    "#instagram": "/instagram.svg",
    "#facebook": "/facebook.svg",
  };

  return (
    <footer className="site-footer" id="login" aria-label="Footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <Image src="/logo.svg" alt="PetMed logo" width={36} height={36} />
            <span>PetMed</span>
          </div>
          <p>{t.footer.tagline}</p>
        </div>

        <nav className="footer-links" aria-label="Footer links">
          <div className="footer-col">
            <h3>{t.footer.columns.platform}</h3>
            {t.footer.links.platform.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h3>{t.footer.columns.company}</h3>
            {t.footer.links.company.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h3>{t.footer.columns.legal}</h3>
            {t.footer.links.legal.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="footer-social">
        {t.footer.social.map((link) => {
          const iconSrc = socialIcons[link.href];
          return (
            <a key={link.href} href={link.href} aria-label={link.ariaLabel}>
              {iconSrc ? (
                <Image src={iconSrc} alt="" width={16} height={16} aria-hidden="true" />
              ) : null}
              <span>{link.label}</span>
            </a>
          );
        })}
      </div>

      <div className="footer-bottom">
        <p>{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
