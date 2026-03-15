import { buildAvatarUrl, buildQrCodeUrl, buildShareUrl } from "./share";

describe("share utils", () => {
  it("builds avatar and share urls", () => {
    expect(buildAvatarUrl(5)).toBe("https://robohash.org/5?200x200");

    const shareUrl = buildShareUrl({
      robotId: 3,
      robotName: "Robo Pal",
      ownerName: "Cam",
    });

    expect(shareUrl).toContain("robot=3");
    expect(shareUrl).toContain("name=Robo%20Pal");
    expect(shareUrl).toContain("owner=Cam");
    expect(buildQrCodeUrl(shareUrl)).toContain(encodeURIComponent(shareUrl));
  });
});
