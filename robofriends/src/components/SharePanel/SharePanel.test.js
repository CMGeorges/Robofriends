import { fireEvent, render, screen } from "@testing-library/react";
import SharePanel from "./SharePanel";

describe("SharePanel", () => {
  it("renders share content and closes", () => {
    const onClose = jest.fn();

    render(
      <SharePanel
        robot={{ id: 1, name: "Leanne Graham" }}
        accountName="Cam"
        onClose={onClose}
      />
    );

    expect(screen.getByText(/Avatar QR share/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /qr code for sharing leanne graham/i })).toHaveAttribute(
      "src",
      expect.stringContaining("api.qrserver.com")
    );
    expect(screen.getByRole("link", { name: /open share link/i })).toHaveAttribute(
      "href",
      expect.stringContaining("robofriends.app")
    );

    fireEvent.click(screen.getByRole("button", { name: /close share panel/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
