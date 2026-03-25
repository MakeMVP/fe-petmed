"use client";

import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_ExxGd47Ar",
  client_id: "3al3l0i924diqhrus97bijos2o",
  redirect_uri: "http://localhost:3000/assistant",
  response_type: "code",
  scope: "openid email",
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
}
