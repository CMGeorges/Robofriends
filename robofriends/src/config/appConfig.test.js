import { createAppConfig, getEnvironmentLabel } from "./appConfig";

describe("appConfig", () => {
  it("builds config from defaults", () => {
    expect(createAppConfig({})).toEqual({
      environment: "local",
      apiBaseUrl: "https://jsonplaceholder.typicode.com",
      shareBaseUrl: "https://robofriends.app",
      qrBaseUrl: "https://api.qrserver.com/v1/create-qr-code/",
      authProvider: "local",
      enableQrSharing: true,
    });
  });

  it("builds config from environment variables", () => {
    expect(
      createAppConfig({
        REACT_APP_ENVIRONMENT: "staging",
        REACT_APP_API_BASE_URL: "https://api.example.com",
        REACT_APP_SHARE_BASE_URL: "https://share.example.com",
        REACT_APP_QR_BASE_URL: "https://qr.example.com",
        REACT_APP_AUTH_PROVIDER: "oidc",
        REACT_APP_ENABLE_QR_SHARING: "false",
      })
    ).toEqual({
      environment: "staging",
      apiBaseUrl: "https://api.example.com",
      shareBaseUrl: "https://share.example.com",
      qrBaseUrl: "https://qr.example.com",
      authProvider: "oidc",
      enableQrSharing: false,
    });
  });

  it("formats the environment label", () => {
    expect(getEnvironmentLabel("production")).toBe("Production");
  });
});
