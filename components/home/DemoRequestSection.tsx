import type { ChangeEvent, FormEvent } from "react";

import { DEMO_ROLE_OPTIONS } from "@/constants/home";
import type { DemoFormErrors, DemoFormValues, SubmitState } from "@/types/home";

type DemoRequestSectionProps = {
  values: DemoFormValues;
  errors: DemoFormErrors;
  submitState: SubmitState;
  submitMessage: string;
  onFieldChange: (field: keyof DemoFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function DemoRequestSection({
  values,
  errors,
  submitState,
  submitMessage,
  onFieldChange,
  onSubmit,
}: DemoRequestSectionProps) {
  return (
    <section className="demo-request-section" id="faq" aria-label="Request a platform demo">
      <h2>Request a Platform Demo</h2>
      <p>See how PetMed AI can transform your clinic&apos;s diagnostic workflow.</p>

      <form className="demo-form" noValidate onSubmit={onSubmit}>
        <div className="demo-field">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Dr. Jane"
            value={values.firstName}
            onChange={onFieldChange("firstName")}
            aria-invalid={Boolean(errors.firstName)}
          />
          {errors.firstName ? <span className="demo-error">{errors.firstName}</span> : null}
        </div>

        <div className="demo-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            value={values.lastName}
            onChange={onFieldChange("lastName")}
            aria-invalid={Boolean(errors.lastName)}
          />
          {errors.lastName ? <span className="demo-error">{errors.lastName}</span> : null}
        </div>

        <div className="demo-field">
          <label htmlFor="workEmail">Work Email</label>
          <input
            id="workEmail"
            name="workEmail"
            type="email"
            placeholder="doctor@clinic.com"
            value={values.workEmail}
            onChange={onFieldChange("workEmail")}
            aria-invalid={Boolean(errors.workEmail)}
          />
          {errors.workEmail ? <span className="demo-error">{errors.workEmail}</span> : null}
        </div>

        <div className="demo-field">
          <label htmlFor="clinicName">Clinic / Hospital Name</label>
          <input
            id="clinicName"
            name="clinicName"
            type="text"
            placeholder="Apex Veterinary Center"
            value={values.clinicName}
            onChange={onFieldChange("clinicName")}
            aria-invalid={Boolean(errors.clinicName)}
          />
          {errors.clinicName ? <span className="demo-error">{errors.clinicName}</span> : null}
        </div>

        <div className="demo-field demo-role-field">
          <label htmlFor="role">Professional Role</label>
          <select
            id="role"
            name="role"
            value={values.role}
            onChange={onFieldChange("role")}
            aria-invalid={Boolean(errors.role)}
          >
            <option value="">Select role</option>
            {DEMO_ROLE_OPTIONS.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption}
              </option>
            ))}
          </select>
          {errors.role ? <span className="demo-error">{errors.role}</span> : null}
        </div>

        <button className="demo-submit-btn" type="submit" disabled={submitState === "loading"}>
          {submitState === "loading" ? "Submitting..." : "Submit Demo Request"}
        </button>

        {submitMessage ? (
          <p
            className={`demo-submit-message ${submitState === "success" ? "success" : "error"}`}
            role="status"
            aria-live="polite"
          >
            {submitMessage}
          </p>
        ) : null}
      </form>
    </section>
  );
}
