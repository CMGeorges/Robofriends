const DEFAULT_CONFIG = {
  environment: "local",
  apiBaseUrl: "https://jsonplaceholder.typicode.com",
  shareBaseUrl: "https://robofriends.app",
  qrBaseUrl: "https://api.qrserver.com/v1/create-qr-code/",
  authProvider: "local",
  enableQrSharing: true,
};

const parseBoolean = (value, defaultValue) => {
  if (value === undefined) {
    return defaultValue;
  }

  return value === "true";
};

export const createAppConfig = (env = process.env) => ({
  environment: env.REACT_APP_ENVIRONMENT || DEFAULT_CONFIG.environment,
  apiBaseUrl: env.REACT_APP_API_BASE_URL || DEFAULT_CONFIG.apiBaseUrl,
  shareBaseUrl: env.REACT_APP_SHARE_BASE_URL || DEFAULT_CONFIG.shareBaseUrl,
  qrBaseUrl: env.REACT_APP_QR_BASE_URL || DEFAULT_CONFIG.qrBaseUrl,
  authProvider: env.REACT_APP_AUTH_PROVIDER || DEFAULT_CONFIG.authProvider,
  enableQrSharing: parseBoolean(
    env.REACT_APP_ENABLE_QR_SHARING,
    DEFAULT_CONFIG.enableQrSharing
  ),
});

export const appConfig = createAppConfig();

export const getEnvironmentLabel = (environment) =>
  environment.charAt(0).toUpperCase() + environment.slice(1);
