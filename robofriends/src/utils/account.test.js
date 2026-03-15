import {
  ACCOUNT_STORAGE_KEY,
  SESSION_STORAGE_KEY,
  clearSession,
  createAccountRecord,
  getAuthenticatedAccount,
  loadStoredAccount,
  loadStoredSession,
  loginAccount,
  registerAccount,
  saveAccount,
  saveSession,
  updateAccountProfile,
} from "./account";

describe("account utils", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("creates, saves, and reads account records", () => {
    const account = createAccountRecord({
      displayName: " Cam ",
      email: " CAM@example.com ",
      password: "secret",
    });

    expect(account).toEqual({
      displayName: "Cam",
      email: "cam@example.com",
      password: "secret",
    });

    saveAccount(account);
    saveSession(account.email);

    expect(loadStoredAccount()).toEqual(account);
    expect(loadStoredSession()).toBe("cam@example.com");
    expect(window.localStorage.getItem(ACCOUNT_STORAGE_KEY)).toContain("cam@example.com");
    expect(window.localStorage.getItem(SESSION_STORAGE_KEY)).toBe("cam@example.com");
  });

  it("registers, authenticates, updates, and clears a session", async () => {
    const account = await registerAccount({
      displayName: "Cam",
      email: "cam@example.com",
      password: "secret",
    });

    await expect(getAuthenticatedAccount()).resolves.toEqual(account);
    await expect(loginAccount({ email: " CAM@example.com ", password: "secret" })).resolves.toEqual(
      account
    );

    const updatedAccount = await updateAccountProfile({ displayName: "Cam S" });
    expect(updatedAccount.displayName).toBe("Cam S");
    await expect(getAuthenticatedAccount()).resolves.toEqual(updatedAccount);

    clearSession();
    await expect(getAuthenticatedAccount()).resolves.toBeNull();
    expect(loadStoredSession()).toBe("");
  });

  it("throws for invalid login and missing account updates", async () => {
    await expect(loginAccount({ email: "nope@example.com", password: "secret" })).rejects.toThrow(
      "Incorrect email or password."
    );

    await expect(updateAccountProfile({ displayName: "Cam" })).rejects.toThrow(
      "No account found to update."
    );
  });
});
