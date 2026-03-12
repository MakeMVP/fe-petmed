import type { ChangeEvent, FormEvent } from "react";

import type { DemoFormErrors, DemoFormValues, SubmitState, TranslationCopy } from "@/types/home";

type DemoRequestSectionProps = {
  values: DemoFormValues;
  errors: DemoFormErrors;
  submitState: SubmitState;
  submitMessage: string;
  t: TranslationCopy;
  onFieldChange: (field: keyof DemoFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function DemoRequestSection({
  values,
  errors,
  submitState,
  submitMessage,
  t,
  onFieldChange,
  onSubmit,
}: DemoRequestSectionProps) {
  return (
    <section className="demo-request-section" id="faq" aria-label="Request a platform demo">
      <h2>{t.demo.title}</h2>
      <p>{t.demo.subtitle}</p>

      <form className="demo-form" noValidate onSubmit={onSubmit}>
        <div className="demo-field">
          <label htmlFor="firstName">{t.demo.fields.firstName.label}</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder={t.demo.fields.firstName.placeholder}
            value={values.firstName}
            onChange={onFieldChange("firstName")}
            aria-invalid={Boolean(errors.firstName)}
          />
          {errors.firstName ? <span className="demo-error">{errors.firstName}</span> : null}
        </div>

        <div className="demo-field">
          <label htmlFor="lastName">{t.demo.fields.lastName.label}</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder={t.demo.fields.lastName.placeholder}
            value={values.lastName}
            onChange={onFieldChange("lastName")}
            aria-invalid={Boolean(errors.lastName)}
          />
          {errors.lastName ? <span className="demo-error">{errors.lastName}</span> : null}
        </div>

        <div className="demo-field">
          <label htmlFor="workEmail">{t.demo.fields.workEmail.label}</label>
          <input
            id="workEmail"
            name="workEmail"
            type="email"
            placeholder={t.demo.fields.workEmail.placeholder}
            value={values.workEmail}
            onChange={onFieldChange("workEmail")}
            aria-invalid={Boolean(errors.workEmail)}
          />
          {errors.workEmail ? <span className="demo-error">{errors.workEmail}</span> : null}
        </div>

        <div className="demo-field">
          <label htmlFor="clinicName">{t.demo.fields.clinicName.label}</label>
          <input
            id="clinicName"
            name="clinicName"
            type="text"
            placeholder={t.demo.fields.clinicName.placeholder}
            value={values.clinicName}
            onChange={onFieldChange("clinicName")}
            aria-invalid={Boolean(errors.clinicName)}
          />
          {errors.clinicName ? <span className="demo-error">{errors.clinicName}</span> : null}
        </div>

        <div className="demo-field demo-role-field">
          <label htmlFor="role">{t.demo.fields.role.label}</label>
          <select
            id="role"
            name="role"
            value={values.role}
            onChange={onFieldChange("role")}
            aria-invalid={Boolean(errors.role)}
          >
            <option value="">{t.demo.fields.role.placeholder}</option>
            {t.demo.fields.role.options.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption}
              </option>
            ))}
          </select>
          {errors.role ? <span className="demo-error">{errors.role}</span> : null}
        </div>

        <button className="demo-submit-btn" type="submit" disabled={submitState === "loading"}>
          {submitState === "loading" ? t.demo.submit.loading : t.demo.submit.idle}
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
