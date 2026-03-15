import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

const mockUsers = [
  { id: 1, name: "Leanne Graham", email: "leanne@example.com" },
  { id: 2, name: "Ervin Howell", email: "ervin@example.com" },
];

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
    global.fetch = jest.fn();
    process.env.REACT_APP_ENABLE_QR_SHARING = "true";
  });

  it("loads robots, supports auth, search, profile updates, sharing, no matches, and logout", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    render(<App />);

    expect(screen.getByText(/loading robots/i)).toBeInTheDocument();
    expect(await screen.findByText(/local environment/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in to explore and share/i)).toBeInTheDocument();

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

    expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/search robot directory/i), {
      target: { value: "ervin" },
    });
    expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
    expect(screen.getByText("Ervin Howell")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /share avatar qr/i }));
    expect(await screen.findByText(/avatar qr share/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close share panel/i }));

    fireEvent.change(screen.getByLabelText(/profile display name/i), {
      target: { value: "Cameron" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save profile/i }));
    expect(screen.getByText("Cameron")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/search robot directory/i), {
      target: { value: "zzz" },
    });
    expect(screen.getByText(/no matches found/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
    expect(await screen.findByText(/sign in to explore and share/i)).toBeInTheDocument();
  });

  it("shows auth errors when login fails", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    render(<App />);
    await screen.findByText(/sign in to explore and share/i);

    fireEvent.click(screen.getByRole("button", { name: "Open login tab" }));
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "cam@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrong" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(screen.getByText(/incorrect email or password/i)).toBeInTheDocument();
  });

  it("logs in successfully with an existing stored account", async () => {
    window.localStorage.setItem(
      "robofriends.account",
      JSON.stringify({
        displayName: "Cam",
        email: "cam@example.com",
        password: "secret",
      })
    );

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    render(<App />);
    await screen.findByText(/sign in to explore and share/i);

    fireEvent.click(screen.getByRole("button", { name: "Open login tab" }));
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "cam@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secret" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByText("Cam")).toBeInTheDocument();
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
  });

  it("shows an error state when the robot request fails", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
    });

    render(<App />);

    expect(await screen.findByText(/unable to load robots/i)).toBeInTheDocument();
  });

  it("shows an error state when the robot request rejects", async () => {
    global.fetch.mockRejectedValue(new Error("Network down"));

    render(<App />);

    expect(await screen.findByText(/unable to load robots/i)).toBeInTheDocument();
    expect(screen.getByText("Network down")).toBeInTheDocument();
  });

  it("shows the fallback error message when the rejection has no message", async () => {
    global.fetch.mockRejectedValue({});

    render(<App />);

    expect(await screen.findByText(/unable to load robots/i)).toBeInTheDocument();
    expect(screen.getByText("Something went wrong while loading robots.")).toBeInTheDocument();
  });

  it("restores an existing session from storage", async () => {
    window.localStorage.setItem(
      "robofriends.account",
      JSON.stringify({
        displayName: "Cam",
        email: "cam@example.com",
        password: "secret",
      })
    );
    window.localStorage.setItem("robofriends.session", "cam@example.com");

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    render(<App />);

    expect(await screen.findByText("Cam")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Leanne Graham")).toBeInTheDocument());
  });

  it("hides the share panel when QR sharing is disabled", async () => {
    process.env.REACT_APP_ENABLE_QR_SHARING = "false";

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    render(<App />);
    await screen.findByText(/sign in to explore and share/i);

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

    fireEvent.click(screen.getByRole("button", { name: /share avatar qr/i }));
    expect(screen.queryByText(/avatar qr share/i)).not.toBeInTheDocument();
  });

  it("avoids state updates after unmount while fetch is still pending", async () => {
    let resolveFetch;
    global.fetch.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      })
    );

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { unmount } = render(<App />);

    unmount();
    resolveFetch({
      ok: true,
      json: async () => mockUsers,
    });

    await Promise.resolve();
    await Promise.resolve();

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it("avoids error state updates after unmount when fetch rejects", async () => {
    let rejectFetch;
    global.fetch.mockReturnValue(
      new Promise((_, reject) => {
        rejectFetch = reject;
      })
    );

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { unmount } = render(<App />);

    unmount();
    rejectFetch(new Error("late failure"));

    await Promise.resolve();
    await Promise.resolve();

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
