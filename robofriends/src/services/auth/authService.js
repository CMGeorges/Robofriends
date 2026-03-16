import { appConfig } from "../../config/appConfig";
import { localAuthProvider } from "./localAuthProvider";

const providers = {
  local: localAuthProvider,
};

export const getAuthProvider = (providerName = appConfig.authProvider) => {
  const provider = providers[providerName];

  if (!provider) {
    throw new Error(`Unsupported auth provider: ${providerName}`);
  }

  return provider;
};

export const authService = getAuthProvider();
