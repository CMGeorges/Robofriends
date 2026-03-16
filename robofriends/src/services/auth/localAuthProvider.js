const ACCOUNT_STORAGE_KEY = "robofriends.account";
const SESSION_STORAGE_KEY = "robofriends.session";

export const createAccountRecord = ({ displayName, email, password }) => ({
  displayName: displayName.trim(),
  email: email.trim().toLowerCase(),
  password,
});

export const loadStoredAccount = () => {
  const rawValue = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);

  return rawValue ? JSON.parse(rawValue) : null;
};

export const loadStoredSession = () => window.localStorage.getItem(SESSION_STORAGE_KEY) || "";

export const saveAccount = (account) => {
  window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(account));
};

export const saveSession = (email) => {
  window.localStorage.setItem(SESSION_STORAGE_KEY, email);
};

export const clearSession = () => {
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
};

export const registerAccount = async ({ displayName, email, password }) => {
  const account = createAccountRecord({ displayName, email, password });

  saveAccount(account);
  saveSession(account.email);

  return account;
};

export const loginAccount = async ({ email, password }) => {
  const account = loadStoredAccount();
  const normalizedEmail = email.trim().toLowerCase();

  if (!account || account.email !== normalizedEmail || account.password !== password) {
    throw new Error("Incorrect email or password.");
  }

  saveSession(account.email);

  return account;
};

export const updateAccountProfile = async ({ displayName }) => {
  const account = loadStoredAccount();

  if (!account) {
    throw new Error("No account found to update.");
  }

  const updatedAccount = {
    ...account,
    displayName: displayName.trim(),
  };

  saveAccount(updatedAccount);

  return updatedAccount;
};

export const getAuthenticatedAccount = async () => {
  const account = loadStoredAccount();
  const sessionEmail = loadStoredSession();

  if (account && sessionEmail && account.email === sessionEmail) {
    return account;
  }

  return null;
};

export const localAuthProvider = {
  clearSession,
  getAuthenticatedAccount,
  loginAccount,
  registerAccount,
  updateAccountProfile,
};

export { ACCOUNT_STORAGE_KEY, SESSION_STORAGE_KEY };
