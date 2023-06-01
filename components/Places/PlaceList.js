import { FlatList, StyleSheet, Text, View } from "react-native"

import { Colors } from "../../constants/Colors"
import PlaceItem from "./PlaceItem"
import React from "react"
import { useNavigation } from "@react-navigation/native"

export default function PlaceList({ places }) {
  const navigation = useNavigation()

  function placeClickHandler(item) {
    navigation.navigate("PlaceDetails", { place: item })
  }

  if ((places.length === 0) | !places) {
    return (
      <View style={styles.fllbackContainer}>
        <Text style={styles.fallbackText}>
          No Places added, start to add some!
        </Text>
      </View>
    )
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={placeClickHandler} />
      )}
      style={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 8
  },
  fllbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fallbackText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary200
  }
})
