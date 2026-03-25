"use client";

import { AuthProvider } from "react-oidc-context";

const appBaseUrl =
  process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
const cognitoAuthority =
  process.env.NEXT_PUBLIC_COGNITO_AUTHORITY ||
  "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_ExxGd47Ar";
const cognitoClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "3al3l0i924diqhrus97bijos2o";

const cognitoAuthConfig = {
  authority: cognitoAuthority,
  client_id: cognitoClientId,
  redirect_uri: `${appBaseUrl}/assistant`,
  response_type: "code",
  scope: "openid email",
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
}
