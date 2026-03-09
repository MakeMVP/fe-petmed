import translations from "@/content/translations.json";

export type Locale = keyof typeof translations;
export type TranslationCopy = (typeof translations)["en"];

export type DemoFormValues = {
  firstName: string;
  lastName: string;
  workEmail: string;
  clinicName: string;
  role: string;
};

export type DemoFormErrors = Partial<Record<keyof DemoFormValues, string>>;

export type SubmitState = "idle" | "loading" | "success" | "error";
