import { appConfig } from "../../config/appConfig";

export const fetchRobots = async () => {
  const response = await fetch(`${appConfig.apiBaseUrl}/users`);

  if (!response.ok) {
    throw new Error("Unable to load robot profiles right now.");
  }

  return response.json();
};
