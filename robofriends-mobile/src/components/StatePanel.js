import React from "react";
import { StyleSheet, Text, View } from "react-native";

function StatePanel({ title, description, tone = "default" }) {
  return (
    <View style={[styles.shell, tone === "error" && styles.errorShell]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(159, 244, 232, 0.18)",
    gap: 8,
  },
  errorShell: {
    borderColor: "rgba(255, 166, 178, 0.32)",
    backgroundColor: "rgba(109, 18, 42, 0.28)",
  },
  title: {
    color: "#efffff",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
  description: {
    color: "#b5d7dd",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default StatePanel;
