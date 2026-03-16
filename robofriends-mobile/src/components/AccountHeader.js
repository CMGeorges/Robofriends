import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { buildAvatarUrl } from "../services/share/shareService";

function AccountHeader({ account, onSaveProfile, onLogout }) {
  const [displayName, setDisplayName] = useState(account.displayName);
  const [avatarSeed, setAvatarSeed] = useState(account.avatarSeed || account.displayName);

  useEffect(() => {
    setDisplayName(account.displayName);
    setAvatarSeed(account.avatarSeed || account.displayName);
  }, [account]);

  return (
    <View style={styles.shell}>
      <View style={styles.topRow}>
        <Image
          source={{ uri: buildAvatarUrl(avatarSeed || displayName || "robofriend") }}
          style={styles.avatar}
        />
        <View style={styles.copyBlock}>
          <Text style={styles.eyebrow}>Signed in via {account.provider || "email"}</Text>
          <Text style={styles.name}>{account.displayName}</Text>
          <Text style={styles.email}>{account.email}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Profile display name"
          placeholderTextColor="#7fa6ae"
        />
        <TextInput
          style={styles.input}
          value={avatarSeed}
          onChangeText={setAvatarSeed}
          placeholder="Avatar seed"
          placeholderTextColor="#7fa6ae"
        />
        <View style={styles.buttonRow}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => onSaveProfile({ displayName, avatarSeed })}
          >
            <Text style={styles.primaryButtonText}>Save</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={onLogout}>
            <Text style={styles.secondaryButtonText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    padding: 20,
    borderRadius: 28,
    backgroundColor: "rgba(6, 30, 49, 0.82)",
    borderWidth: 1,
    borderColor: "rgba(159, 244, 232, 0.18)",
    gap: 16,
  },
  topRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#ffffff",
  },
  copyBlock: {
    gap: 4,
    flex: 1,
  },
  eyebrow: {
    color: "#9ff4e8",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  name: {
    color: "#efffff",
    fontSize: 24,
    fontWeight: "800",
  },
  email: {
    color: "#b5d7dd",
  },
  actions: {
    gap: 12,
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#f3feff",
    color: "#083743",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#9ff4e8",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#063640",
    fontWeight: "800",
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#efffff",
    fontWeight: "700",
  },
});

export default AccountHeader;
