import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

function AuthCard({ onCreateAccount, onLogin, errorMessage }) {
  const [mode, setMode] = useState("signup");
  const [formValues, setFormValues] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  const updateField = (field) => (value) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (mode === "signup") {
      onCreateAccount(formValues);
      return;
    }

    onLogin({
      email: formValues.email,
      password: formValues.password,
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.tabRow}>
        <Pressable
          style={[styles.tab, mode === "signup" && styles.tabActive]}
          onPress={() => setMode("signup")}
        >
          <Text style={[styles.tabText, mode === "signup" && styles.tabTextActive]}>
            Create account
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, mode === "login" && styles.tabActive]}
          onPress={() => setMode("login")}
        >
          <Text style={[styles.tabText, mode === "login" && styles.tabTextActive]}>Login</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>
        {mode === "signup" ? "Create your mobile account" : "Sign into RoboFriends"}
      </Text>
      <Text style={styles.subtitle}>
        {mode === "signup"
          ? "Set up your mobile identity before sharing robot avatars."
          : "Access your profile and shareable robot cards."}
      </Text>

      {mode === "signup" ? (
        <TextInput
          placeholder="Display name"
          placeholderTextColor="#7fa6ae"
          style={styles.input}
          value={formValues.displayName}
          onChangeText={updateField("displayName")}
        />
      ) : null}

      <TextInput
        placeholder="Email"
        placeholderTextColor="#7fa6ae"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        value={formValues.email}
        onChangeText={updateField("email")}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#7fa6ae"
        secureTextEntry
        style={styles.input}
        value={formValues.password}
        onChangeText={updateField("password")}
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{mode === "signup" ? "Continue" : "Sign in"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 28,
    backgroundColor: "rgba(6, 30, 49, 0.82)",
    borderWidth: 1,
    borderColor: "rgba(159, 244, 232, 0.18)",
    gap: 12,
  },
  tabRow: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#9ff4e8",
  },
  tabText: {
    color: "#d8ffff",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#063640",
  },
  title: {
    color: "#efffff",
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    color: "#b5d7dd",
    lineHeight: 20,
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#f3feff",
    color: "#083743",
  },
  error: {
    color: "#ffc5cf",
  },
  submitButton: {
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: "#9ff4e8",
    alignItems: "center",
  },
  submitText: {
    color: "#063640",
    fontWeight: "800",
  },
});

export default AuthCard;
