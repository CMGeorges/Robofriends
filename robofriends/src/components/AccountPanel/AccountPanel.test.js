import { fireEvent, render, screen } from "@testing-library/react";
import AccountPanel from "./AccountPanel";

describe("AccountPanel", () => {
  it("shows account data, saves profile changes, and logs out", () => {
    const onSaveProfile = jest.fn();
    const onLogout = jest.fn();

    render(
      <AccountPanel
        account={{ displayName: "Cam", email: "cam@example.com" }}
        onSaveProfile={onSaveProfile}
        onLogout={onLogout}
      />
    );

    expect(screen.getByText("cam@example.com")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/profile display name/i), {
      target: { value: "Cameron" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save profile/i }));
    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    expect(onSaveProfile).toHaveBeenCalledWith({ displayName: "Cameron" });
    expect(onLogout).toHaveBeenCalled();
  });
});
