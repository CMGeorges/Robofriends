import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { buildAvatarUrl, buildQrCodeUrl, buildShareUrl } from "../services/share/shareService";

function ShareSheet({ robot, accountName, onClose }) {
  const shareUrl = buildShareUrl({
    robotId: robot.id,
    robotName: robot.name,
    ownerName: accountName,
  });

  return (
    <View style={styles.shell}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Avatar share</Text>
          <Text style={styles.title}>{robot.name}</Text>
        </View>
        <Pressable onPress={onClose}>
          <Text style={styles.close}>Close</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gallery}>
        <Image source={{ uri: buildQrCodeUrl(shareUrl) }} style={styles.qrImage} />
        <Image source={{ uri: buildAvatarUrl(robot.id) }} style={styles.avatarImage} />
      </ScrollView>

      <Text style={styles.urlLabel}>Share link</Text>
      <Text style={styles.urlValue}>{shareUrl}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    marginBottom: 18,
    padding: 18,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.1)",
    gap: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eyebrow: {
    color: "#9ff4e8",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  title: {
    color: "#efffff",
    fontSize: 22,
    fontWeight: "800",
  },
  close: {
    color: "#9ff4e8",
    fontWeight: "700",
  },
  gallery: {
    gap: 14,
  },
  qrImage: {
    width: 220,
    height: 220,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  avatarImage: {
    width: 220,
    height: 220,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  urlLabel: {
    color: "#b5d7dd",
    fontWeight: "700",
  },
  urlValue: {
    color: "#efffff",
    lineHeight: 20,
  },
});

export default ShareSheet;
