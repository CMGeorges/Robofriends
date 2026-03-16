import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

function AddFriendCard({ onSaveFriend }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    avatarSeed: "",
  });

  const updateField = (field) => (value) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!formValues.name.trim() || !formValues.email.trim()) {
      return;
    }

    await onSaveFriend(formValues);
    setFormValues({
      name: "",
      email: "",
      avatarSeed: "",
    });
  };

  return (
    <View style={styles.shell}>
      <Text style={styles.title}>Add a new friend</Text>
      <TextInput
        style={styles.input}
        placeholder="Friend name"
        placeholderTextColor="#7fa6ae"
        value={formValues.name}
        onChangeText={updateField("name")}
      />
      <TextInput
        style={styles.input}
        placeholder="Friend email"
        placeholderTextColor="#7fa6ae"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formValues.email}
        onChangeText={updateField("email")}
      />
      <TextInput
        style={styles.input}
        placeholder="Avatar seed (optional)"
        placeholderTextColor="#7fa6ae"
        value={formValues.avatarSeed}
        onChangeText={updateField("avatarSeed")}
      />
      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save friend</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    marginBottom: 18,
    padding: 18,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.08)",
    gap: 10,
  },
  title: {
    color: "#efffff",
    fontSize: 20,
    fontWeight: "800",
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#f3feff",
    color: "#083743",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#9ff4e8",
    alignItems: "center",
  },
  buttonText: {
    color: "#063640",
    fontWeight: "800",
  },
});

export default AddFriendCard;
