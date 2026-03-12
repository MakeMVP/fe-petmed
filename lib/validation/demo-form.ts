import type { DemoFormErrors, DemoFormValues } from "@/types/home";

const NAME_REGEX = /^[A-Za-z][A-Za-z\s'-]{1,39}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type DemoValidationMessages = {
  firstName: string;
  lastName: string;
  workEmail: string;
  clinicName: string;
  role: string;
};

export function validateDemoForm(
  values: DemoFormValues,
  messages: DemoValidationMessages,
): DemoFormErrors {
  const errors: DemoFormErrors = {};

  if (!NAME_REGEX.test(values.firstName.trim())) {
    errors.firstName = messages.firstName;
  }

  if (!NAME_REGEX.test(values.lastName.trim())) {
    errors.lastName = messages.lastName;
  }

  if (!EMAIL_REGEX.test(values.workEmail.trim())) {
    errors.workEmail = messages.workEmail;
  }

  const clinicName = values.clinicName.trim();
  if (clinicName.length < 2 || clinicName.length > 80) {
    errors.clinicName = messages.clinicName;
  }

  if (!values.role.trim()) {
    errors.role = messages.role;
  }

  return errors;
}
