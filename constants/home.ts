import type { DemoFormValues } from "@/types/home";

export const NAV_LINKS = [
  { href: "#how-it-works", labelKey: "howItWorks" },
  { href: "#pricing", labelKey: "pricing" },
  { href: "#faq", labelKey: "faq" },
  { href: "#login", labelKey: "login" },
] as const;

export const CLINICAL_AREA_CARDS = [
  {
    icon: "⚕",
    title: "Internal Medicine",
    body: "Comprehensive support for diagnosis and treatment management of general internal medicine diseases.",
  },
  {
    icon: "✣",
    title: "Surgery / Emergency",
    body: "Criteria for initial evaluation and surgical intervention in emergency cases.",
  },
  {
    icon: "♡",
    title: "Cardiology",
    body: "Diagnosis, staging, and treatment protocols for cardiac diseases.",
  },
  {
    icon: "⌘",
    title: "Gastroenterology",
    body: "Differential diagnosis of digestive diseases and interpretation of endoscopic findings.",
  },
  {
    icon: "◌",
    title: "Pulmonology",
    body: "Image diagnosis and treatment options for respiratory diseases.",
  },
  {
    icon: "◎",
    title: "Neurology",
    body: "Interpretation of neurological examinations and diagnostic support for neurological diseases.",
  },
] as const;

const REVIEW_CARDS = [
  {
    name: "Tom Critchlow",
    handle: "@AMCNY",
    body: "The ability to quickly explore differential diagnoses and literature insights saves our team valuable time.",
  },
  {
    name: "VCA Animal Hospitals",
    handle: "@Angellpets",
    body: "✨ @petmed really is so useful and intuitive.",
  },
  {
    name: "Dr. Jan Pol",
    handle: "@thedrpol",
    body: "✨ @petmed tools look like PetMed are becoming essential in modern veterinary medicine.",
  },
  {
    name: "Dan Rowden",
    handle: "@dr",
    body: "Wow @petmed is good ⚡",
  },
  {
    name: "Dr. Lauren Thielen",
    handle: "@dr.laurenthielen",
    body: "Exotic animal medicine often requires quick research across multiple conditions.",
  },
  {
    name: "BluePearl Hospitals",
    handle: "@bluepearlvet",
    body: "@petmed helps our teams align quickly so they can focus on care.",
  },
] as const;

export const REVIEW_COLUMNS = [
  [REVIEW_CARDS[0], REVIEW_CARDS[3], REVIEW_CARDS[4]],
  [REVIEW_CARDS[1], REVIEW_CARDS[2], REVIEW_CARDS[5]],
  [REVIEW_CARDS[3], REVIEW_CARDS[0], REVIEW_CARDS[2]],
] as const;

export const PRECISION_STEPS = [
  {
    number: "01",
    icon: "☁",
    title: "Sync Patient Data",
    body: "Connect your existing EMR. PetMed instantly ingests histories, labs, and imaging notes.",
  },
  {
    number: "02",
    icon: "🧠",
    title: "AI Reasoning",
    body: "Our clinical engine maps findings against thousands of validated case studies and protocols.",
  },
  {
    number: "03",
    icon: "🪪",
    title: "Confirm & Act",
    body: "Receive a structured report with weighted options, ready for your final clinical judgment.",
  },
] as const;

export const MEET_BENEFITS = [
  "Instant Analysis Of Bloodwork & Imaging",
  "Context-Aware Differential Diagnoses",
  "Seamless EMR Integration",
] as const;

export const CONCERN_CARDS = [
  {
    icon: "⚠",
    title: "Difficulty in Emergency Judgment",
    body: '"My pet might have ingested something... I\'m unsure whether I should take them to the hospital immediately."',
  },
  {
    icon: "?",
    title: "Anxiety About Subtle Symptoms",
    body: '"My pet is favoring or dragging a leg but doesn\'t seem to be in pain... Should I go to the hospital?"',
  },
  {
    icon: "🐾",
    title: "Training and Behavioral Questions",
    body: '"House training isn\'t going well... I want to know how to make it successful."',
  },
  {
    icon: "🍽",
    title: "Diet and Health Management Concerns",
    body: '"Diarrhea has continued after changing food... Could it be that the new food doesn\'t suit my pet?"',
  },
] as const;

export const PRACTICE_PLAN_FEATURES = [
  "Unlimited AI consults",
  "Imaging & Lab analysis",
  "3 User seats included",
] as const;

export const HOSPITAL_PLAN_FEATURES = [
  "Enterprise-grade EMR sync",
  "Custom training models",
  "Dedicated success manager",
] as const;

export const TRUSTED_LOGOS = ["VCA", "BLUEPEARL", "ANICURA"] as const;

export const DEMO_ROLE_OPTIONS = [
  "Clinic Owner / Medical Director",
  "Veterinarian",
  "Practice Manager",
  "Technician / Nurse",
] as const;

export const INITIAL_DEMO_FORM: DemoFormValues = {
  firstName: "",
  lastName: "",
  workEmail: "",
  clinicName: "",
  role: "",
};

export const DEMO_VALIDATION_MESSAGES = {
  firstName: "Enter a valid first name (2-40 letters).",
  lastName: "Enter a valid last name (2-40 letters).",
  workEmail: "Enter a valid work email address.",
  clinicName: "Clinic/Hospital name must be 2-80 characters.",
  role: "Please select your professional role.",
} as const;

export const DEMO_SUBMIT_MESSAGES = {
  success: "Demo request submitted successfully.",
  error: "Unable to submit right now. Please try again.",
} as const;

export const FOOTER_LINKS = {
  platform: [
    { href: "#diagnostic-simulator", label: "Diagnostic Simulator" },
    { href: "#treatment-guidelines", label: "Treatment Guidelines" },
    { href: "#api-integration", label: "API Integration" },
  ],
  company: [
    { href: "#about-us", label: "About Us" },
    { href: "#clinical-validation", label: "Clinical Validation" },
    { href: "#careers", label: "Careers" },
  ],
  legal: [
    { href: "#privacy-policy", label: "Privacy Policy" },
    { href: "#terms-of-service", label: "Terms of Service" },
    { href: "#medical-disclaimer", label: "Medical Disclaimer" },
  ],
} as const;

export const FOOTER_SOCIAL_LINKS = [
  { href: "#twitter", label: "𝕏 Twitter", ariaLabel: "Twitter" },
  { href: "#youtube", label: "▶ YouTube", ariaLabel: "YouTube" },
  { href: "#instagram", label: "◉ Instagram", ariaLabel: "Instagram" },
  { href: "#facebook", label: "ƒ Facebook", ariaLabel: "Facebook" },
] as const;
