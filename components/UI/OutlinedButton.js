import { Pressable, StyleSheet, Text, View } from "react-native"

import { Colors } from "../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import React from "react"

export default function OutlinedButton({
  children,
  onPress,
  icon,
  iconSize = 24,
  iconColor = Colors.primary200,
  loading = false
}) {
  let viewContent = (
    <>
      {icon && <Ionicons name={icon} size={iconSize} color={iconColor} />}
      <Text style={styles.label}>{children}</Text>
    </>
  )

  if (loading) viewContent = <Text style={styles.label}>Loading ...</Text>

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        (pressed || loading) && styles.pressed
      ]}
      onPress={onPress}
    >
      {viewContent}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: Colors.primary200,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  pressed: {
    opacity: 0.7
  },
  label: {
    color: Colors.primary200
  }
})
