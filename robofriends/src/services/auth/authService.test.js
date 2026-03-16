import { getAuthProvider } from "./authService";

describe("authService", () => {
  it("returns the local provider", () => {
    expect(getAuthProvider("local")).toEqual(
      expect.objectContaining({
        clearSession: expect.any(Function),
        getAuthenticatedAccount: expect.any(Function),
        loginAccount: expect.any(Function),
        registerAccount: expect.any(Function),
        updateAccountProfile: expect.any(Function),
      })
    );
  });

  it("throws for unsupported providers", () => {
    expect(() => getAuthProvider("oidc")).toThrow("Unsupported auth provider: oidc");
  });
});
