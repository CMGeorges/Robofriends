import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { buildAvatarUrl } from "../services/share/shareService";

function RobotCard({ robot, onShare }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: buildAvatarUrl(robot.avatarSeed || robot.id) }} style={styles.image} />
      </View>
      <Text style={styles.name}>{robot.name}</Text>
      <Text style={styles.email}>{robot.email}</Text>
      <Pressable style={styles.button} onPress={() => onShare(robot)}>
        <Text style={styles.buttonText}>Share avatar QR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 24,
    backgroundColor: "#cffff0",
    gap: 10,
  },
  imageWrap: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.52)",
  },
  image: {
    width: 160,
    height: 160,
  },
  name: {
    color: "#083743",
    fontSize: 20,
    fontWeight: "800",
  },
  email: {
    color: "rgba(8, 55, 67, 0.76)",
  },
  button: {
    marginTop: 6,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#083743",
    alignItems: "center",
  },
  buttonText: {
    color: "#efffff",
    fontWeight: "800",
  },
});

export default RobotCard;
