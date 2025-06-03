import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../../colors";

export default function Input({ placeholder, value, onChangeText, ...rest }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={colors.gray}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: colors.dark,
    marginBottom: 15,
  },
});
