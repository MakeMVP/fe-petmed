import type { DemoFormValues } from "@/types/home";

export const NAV_LINKS = [
  { href: "#how-it-works", labelKey: "howItWorks" },
  { href: "#pricing", labelKey: "pricing" },
  { href: "#faq", labelKey: "faq" },
  { href: "#login", labelKey: "login" },
] as const;

export const CLINICAL_AREA_ICONS = [
  "/med-1.svg",
  "/med-2.svg",
  "/med-3.svg",
  "/med-4.svg",
  "/med-5.svg",
  "/med-6.svg",
] as const;

export const PRECISION_STEPS_META = [
  { number: "01", icon: "/step-1.svg" },
  { number: "02", icon: "/step-2.svg" },
  { number: "03", icon: "/step-3.svg" },
] as const;

export const CONCERN_ICONS = ["/meet-1.svg", "/meet-2.svg", "/meet-3.svg", "/meet-4.svg"] as const;

export const REVIEW_COLUMN_INDEXES = [
  [0, 3, 4],
  [1, 2, 5],
  [3, 0, 2],
] as const;

export const TRUSTED_LOGOS = ["VCA", "BLUEPEARL", "ANICURA"] as const;

export const INITIAL_DEMO_FORM: DemoFormValues = {
  firstName: "",
  lastName: "",
  workEmail: "",
  clinicName: "",
  role: "",
};
