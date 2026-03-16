import { getJson } from "./httpClient";

describe("httpClient", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("returns parsed json for successful requests", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1 }],
    });

    await expect(getJson("https://api.example.com/users")).resolves.toEqual([{ id: 1 }]);
  });

  it("throws for unsuccessful requests", async () => {
    global.fetch.mockResolvedValue({ ok: false });

    await expect(getJson("https://api.example.com/users")).rejects.toThrow(
      "Unable to load robot profiles right now."
    );
  });
});
