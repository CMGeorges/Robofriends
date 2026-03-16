import { fireEvent, render, screen } from "@testing-library/react";
import AuthPanel from "./AuthPanel";

describe("AuthPanel", () => {
  it("submits signup details", () => {
    const onCreateAccount = jest.fn();
    const onLogin = jest.fn();

    render(<AuthPanel onCreateAccount={onCreateAccount} onLogin={onLogin} errorMessage="" />);

    fireEvent.change(screen.getByLabelText(/display name/i), {
      target: { value: "Cam" },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "cam@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secret" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(onCreateAccount).toHaveBeenCalledWith({
      displayName: "Cam",
      email: "cam@example.com",
      password: "secret",
    });
    expect(onLogin).not.toHaveBeenCalled();
  });

  it("switches to login and submits existing credentials", () => {
    const onCreateAccount = jest.fn();
    const onLogin = jest.fn();

    render(
      <AuthPanel
        onCreateAccount={onCreateAccount}
        onLogin={onLogin}
        errorMessage="Incorrect email or password."
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Open login tab" }));
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "cam@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secret" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(onLogin).toHaveBeenCalledWith({
      email: "cam@example.com",
      password: "secret",
    });
    expect(screen.getByText("Incorrect email or password.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open create account tab" }));
    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
  });
});
