import * as httpClient from "../http/httpClient";
import { buildRobotsUrl, fetchRobots } from "./robotService";

describe("robotService", () => {
  it("builds the robots endpoint", () => {
    expect(buildRobotsUrl("https://api.example.com")).toBe("https://api.example.com/users");
  });

  it("fetches robots through the http client", async () => {
    const getJsonSpy = jest.spyOn(httpClient, "getJson").mockResolvedValue([{ id: 1 }]);

    await expect(fetchRobots("https://api.example.com")).resolves.toEqual([{ id: 1 }]);
    expect(getJsonSpy).toHaveBeenCalledWith("https://api.example.com/users");

    getJsonSpy.mockRestore();
  });
});
