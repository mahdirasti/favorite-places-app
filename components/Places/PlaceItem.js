import { Image, Pressable, StyleSheet, Text, View } from "react-native"

import { Colors } from "../../constants/Colors"
import React from "react"

export default function PlaceItem({ place, onSelect }) {
  function selectPlaceHandler() {
    if (onSelect) onSelect(place)
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.place, pressed && styles.pressed]}
      onPress={selectPlaceHandler}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.details}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  place: {
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    marginBottom: 8,
    backgroundColor: Colors.primary200
  },
  pressed: {
    opacity: 0.7
  },
  image: {
    width: 100,
    height: 100
  },
  details: {
    flexDirection: "column",
    padding: 8,
    flex: 1
  },
  title: {
    color: Colors.gray700,
    fontWeight: "bold",
    fontSize: 20
  },
  address: {
    marginTop: 4,
    color: Colors.gray700
  }
})
