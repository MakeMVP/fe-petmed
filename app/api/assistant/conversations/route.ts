const API_BASE = process.env.PETMED_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://bkjva58hd2.ap-northeast-1.awsapprunner.com";

function buildHeaders(request: Request) {
  const headers = new Headers();
  const auth = request.headers.get("authorization");
  if (auth) {
    headers.set("authorization", auth);
  }
  return headers;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.toString();
  const upstream = `${API_BASE}/v1/conversations${search ? `?${search}` : ""}`;

  const response = await fetch(upstream, {
    method: "GET",
    headers: buildHeaders(request),
  });

  return new Response(await response.text(), {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/json",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.text();

  const response = await fetch(`${API_BASE}/v1/conversations`, {
    method: "POST",
    headers: {
      ...Object.fromEntries(buildHeaders(request)),
      "Content-Type": request.headers.get("Content-Type") ?? "application/json",
    },
    body,
  });

  return new Response(await response.text(), {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/json",
    },
  });
}
