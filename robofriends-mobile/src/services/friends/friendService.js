import AsyncStorage from "@react-native-async-storage/async-storage";

const FRIENDS_STORAGE_KEY = "robofriends.mobile.friends";

export const getSavedFriends = async () => {
  const rawValue = await AsyncStorage.getItem(FRIENDS_STORAGE_KEY);
  return rawValue ? JSON.parse(rawValue) : [];
};

export const saveFriend = async ({ name, email, avatarSeed }) => {
  const currentFriends = await getSavedFriends();

  const newFriend = {
    id: `friend-${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    avatarSeed: avatarSeed.trim() || name.trim(),
  };

  const nextFriends = [newFriend, ...currentFriends];
  await AsyncStorage.setItem(FRIENDS_STORAGE_KEY, JSON.stringify(nextFriends));

  return newFriend;
};
