import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCOUNT_STORAGE_KEY = "robofriends.mobile.account";
const SESSION_STORAGE_KEY = "robofriends.mobile.session";

const createAccountRecord = ({ displayName, email, password }) => ({
  displayName: displayName.trim(),
  email: email.trim().toLowerCase(),
  password,
});

const loadStoredAccount = async () => {
  const rawValue = await AsyncStorage.getItem(ACCOUNT_STORAGE_KEY);
  return rawValue ? JSON.parse(rawValue) : null;
};

const loadStoredSession = async () => (await AsyncStorage.getItem(SESSION_STORAGE_KEY)) || "";

const saveAccount = async (account) => {
  await AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(account));
};

const saveSession = async (email) => {
  await AsyncStorage.setItem(SESSION_STORAGE_KEY, email);
};

export const getAuthenticatedAccount = async () => {
  const [account, sessionEmail] = await Promise.all([loadStoredAccount(), loadStoredSession()]);

  if (account && sessionEmail && account.email === sessionEmail) {
    return account;
  }

  return null;
};

export const registerAccount = async ({ displayName, email, password }) => {
  const account = createAccountRecord({ displayName, email, password });

  await Promise.all([saveAccount(account), saveSession(account.email)]);

  return account;
};

export const loginAccount = async ({ email, password }) => {
  const account = await loadStoredAccount();
  const normalizedEmail = email.trim().toLowerCase();

  if (!account || account.email !== normalizedEmail || account.password !== password) {
    throw new Error("Incorrect email or password.");
  }

  await saveSession(account.email);

  return account;
};

export const updateAccountProfile = async ({ displayName }) => {
  const account = await loadStoredAccount();

  if (!account) {
    throw new Error("No account found to update.");
  }

  const updatedAccount = {
    ...account,
    displayName: displayName.trim(),
  };

  await saveAccount(updatedAccount);

  return updatedAccount;
};

export const clearSession = async () => {
  await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
};
