import type { DemoFormValues } from "@/types/home";

const DEMO_REQUEST_ENDPOINT = "https://fake-petmed-api.com/demo-requests";

export async function submitDemoRequest(payload: DemoFormValues) {
  const response = await fetch(DEMO_REQUEST_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }
}
