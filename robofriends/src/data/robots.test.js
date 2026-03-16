import { robots } from "./robots";

describe("robots data", () => {
  it("contains the seeded robot list", () => {
    expect(robots).toHaveLength(10);
    expect(robots[0]).toEqual(
      expect.objectContaining({
        id: 1,
        name: "Leanne Graham",
      })
    );
  });
});
