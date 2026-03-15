import { getWebVitals } from "./webVitals";

describe("webVitals utils", () => {
  it("returns the installed web-vitals module", () => {
    const vitals = getWebVitals();

    expect(vitals).toEqual(
      expect.objectContaining({
        getCLS: expect.any(Function),
        getFID: expect.any(Function),
        getFCP: expect.any(Function),
        getLCP: expect.any(Function),
        getTTFB: expect.any(Function),
      })
    );
  });
});
