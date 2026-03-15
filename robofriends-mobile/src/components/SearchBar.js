import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.shell}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search robots by name"
        placeholderTextColor="#7fa6ae"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    marginTop: 18,
    marginBottom: 18,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 18,
    backgroundColor: "#f3feff",
    color: "#083743",
  },
});

export default SearchBar;
