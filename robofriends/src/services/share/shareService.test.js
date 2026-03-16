import { buildAvatarUrl, buildQrCodeUrl, buildShareUrl } from "./shareService";

describe("shareService", () => {
  it("builds avatar, share, and qr urls", () => {
    expect(buildAvatarUrl(7)).toBe("https://robohash.org/7?200x200");

    const shareUrl = buildShareUrl(
      { robotId: 3, robotName: "Robo Pal", ownerName: "Cam" },
      "https://share.example.com"
    );

    expect(shareUrl).toBe(
      "https://share.example.com/share?robot=3&name=Robo%20Pal&owner=Cam"
    );
    expect(buildQrCodeUrl(shareUrl, "https://qr.example.com")).toBe(
      `https://qr.example.com?size=220x220&data=${encodeURIComponent(shareUrl)}`
    );
  });
});
