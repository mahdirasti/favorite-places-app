import { StyleSheet, Text, View } from "react-native"

import { Colors } from "../../constants/Colors"
import React from "react"

export default function AppLoading({ message = "Loading ..." }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary200
  },
  text: {
    color: Colors.gray700
  }
})
