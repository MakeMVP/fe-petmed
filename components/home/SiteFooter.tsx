import Image from "next/image";

import { FOOTER_LINKS, FOOTER_SOCIAL_LINKS } from "@/constants/home";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="login" aria-label="Footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <Image src="/logo.svg" alt="PetMed logo" width={36} height={36} />
            <span>PetMed</span>
          </div>
          <p>Advanced clinical decision support for modern veterinary professionals.</p>
        </div>

        <nav className="footer-links" aria-label="Footer links">
          <div className="footer-col">
            <h3>Platform</h3>
            {FOOTER_LINKS.platform.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h3>Company</h3>
            {FOOTER_LINKS.company.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h3>Legal</h3>
            {FOOTER_LINKS.legal.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="footer-social">
        {FOOTER_SOCIAL_LINKS.map((link) => (
          <a key={link.href} href={link.href} aria-label={link.ariaLabel}>
            {link.label}
          </a>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© 2024 PetMed AI, Inc. All rights reserved. Designed for veterinary professionals.</p>
      </div>
    </footer>
  );
}
