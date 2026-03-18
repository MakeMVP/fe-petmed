"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { INITIAL_DEMO_FORM } from "@/constants/home";
import { submitDemoRequest } from "@/lib/api/demo-request";
import { useLocale } from "@/lib/i18n";
import { validateDemoForm } from "@/lib/validation/demo-form";
import { ClinicalAreasSection } from "@/components/home/ClinicalAreasSection";
import { DemoRequestSection } from "@/components/home/DemoRequestSection";
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { MeetPetMedSection } from "@/components/home/MeetPetMedSection";
import { PrecisionSection } from "@/components/home/PrecisionSection";
import { PricingSection } from "@/components/home/PricingSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SupportSection } from "@/components/home/SupportSection";
import type { DemoFormErrors, DemoFormValues, Locale, SubmitState } from "@/types/home";

export default function Home() {
  const { locale, setLocale, t } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoForm, setDemoForm] = useState(INITIAL_DEMO_FORM);
  const [demoErrors, setDemoErrors] = useState<DemoFormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const onDemoFieldChange =
    (field: keyof DemoFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setDemoForm((prev) => ({ ...prev, [field]: value }));
      setDemoErrors((prev) => ({ ...prev, [field]: "" }));

      if (submitState !== "idle") {
        setSubmitState("idle");
        setSubmitMessage("");
      }
    };

  const handleDemoSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateDemoForm(demoForm, t.demo.validation);
    setDemoErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitState("loading");
    setSubmitMessage("");

    try {
      await submitDemoRequest({
        firstName: demoForm.firstName.trim(),
        lastName: demoForm.lastName.trim(),
        workEmail: demoForm.workEmail.trim(),
        clinicName: demoForm.clinicName.trim(),
        role: demoForm.role,
      });

      setSubmitState("success");
      setSubmitMessage(t.demo.messages.success);
      setDemoForm(INITIAL_DEMO_FORM);
    } catch {
      setSubmitState("error");
      setSubmitMessage(t.demo.messages.error);
    }
  };

  return (
    <div className="landing">
      <Header
        locale={locale}
        mobileMenuOpen={mobileMenuOpen}
        t={t}
        onLocaleChange={setLocale}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
      />

      <main>
        <HeroSection t={t} />
        <hr className="section-divider" />
        <SupportSection t={t} />
        <ClinicalAreasSection t={t} />
        <MeetPetMedSection t={t} />
        <ReviewsSection t={t} />
        <PrecisionSection t={t} />
        <PricingSection t={t} />
        <DemoRequestSection
          values={demoForm}
          errors={demoErrors}
          submitState={submitState}
          submitMessage={submitMessage}
          t={t}
          onFieldChange={onDemoFieldChange}
          onSubmit={handleDemoSubmit}
        />
      </main>

      <SiteFooter t={t} />
    </div>
  );
}
