import { Pressable, StyleSheet } from "react-native"

import { Ionicons } from "@expo/vector-icons"
import React from "react"
export default function IconButton({ name, color, size, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  pressed: {
    opacity: 0.7
  }
})
