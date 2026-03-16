import { appConfig } from "../../config/appConfig";
import { getJson } from "../http/httpClient";

export const buildRobotsUrl = (baseUrl = appConfig.apiBaseUrl) => `${baseUrl}/users`;

export const fetchRobots = async (baseUrl) => getJson(buildRobotsUrl(baseUrl));
