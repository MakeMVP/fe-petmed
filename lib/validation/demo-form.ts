import { DEMO_VALIDATION_MESSAGES } from "@/constants/home";
import type { DemoFormErrors, DemoFormValues } from "@/types/home";

const NAME_REGEX = /^[A-Za-z][A-Za-z\s'-]{1,39}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateDemoForm(values: DemoFormValues): DemoFormErrors {
  const errors: DemoFormErrors = {};

  if (!NAME_REGEX.test(values.firstName.trim())) {
    errors.firstName = DEMO_VALIDATION_MESSAGES.firstName;
  }

  if (!NAME_REGEX.test(values.lastName.trim())) {
    errors.lastName = DEMO_VALIDATION_MESSAGES.lastName;
  }

  if (!EMAIL_REGEX.test(values.workEmail.trim())) {
    errors.workEmail = DEMO_VALIDATION_MESSAGES.workEmail;
  }

  const clinicName = values.clinicName.trim();
  if (clinicName.length < 2 || clinicName.length > 80) {
    errors.clinicName = DEMO_VALIDATION_MESSAGES.clinicName;
  }

  if (!values.role.trim()) {
    errors.role = DEMO_VALIDATION_MESSAGES.role;
  }

  return errors;
}
