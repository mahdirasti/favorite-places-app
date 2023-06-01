import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react"

import { Colors } from "../constants/Colors"
import OutlinedButton from "../components/UI/OutlinedButton"

export default function PlaceDetailsScreen({ route, navigation }) {
  const place = route.params?.place

  const openMapHandler = () => {
    navigation.navigate("Map", { location: place.location })
  }

  useEffect(() => {
    navigation.setOptions({
      title: place.title
    })
  }, [place, navigation])

  if (!!!place) return null

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageHolder}>
        <Image style={styles.image} source={{ uri: place.imageUri }} />
      </View>
      <View style={styles.details}>
        <View style={styles.titleHolder}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address}>{place?.address}</Text>
        </View>
        <View style={styles.actions}>
          <OutlinedButton onPress={openMapHandler} icon={"map"}>
            View on Map
          </OutlinedButton>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageHolder: {
    width: "100%",
    height: 300
  },
  image: {
    width: "100%",
    height: "100%"
  },
  titleHolder: {
    flexDirection: "column",
    gap: 8
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary200
  },
  address: {
    fontSize: 16,
    color: Colors.primary200
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16
  },
  details: {
    padding: 16
  }
})
