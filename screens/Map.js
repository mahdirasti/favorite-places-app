import { Alert, StyleSheet } from "react-native"
import MapView, { Marker } from "react-native-maps"
import React, { useCallback, useLayoutEffect, useState } from "react"

import IconButton from "../components/UI/IconButton"

export default function MapScreen({ navigation, route }) {
  const [selectedLocation, setSelectedLocation] = useState()
  const defaultSelectedLocation = route.params?.location

  React.useEffect(() => {
    setSelectedLocation(defaultSelectedLocation)
  }, [defaultSelectedLocation, route])

  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  function selectLocationHandler(event) {
    if (!!defaultSelectedLocation) {
      return
    }

    const lat = event.nativeEvent.coordinate.latitude
    const lng = event.nativeEvent.coordinate.longitude

    setSelectedLocation({ lat, lng })
  }

  const savedPickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location first (by tapping on the map)!"
      )
      return
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng
    })
  }, [selectedLocation, navigation])

  useLayoutEffect(() => {
    if (!!defaultSelectedLocation) return

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name="save"
          size={24}
          color={tintColor}
          onPress={savedPickedLocationHandler}
        />
      )
    })
  }, [savedPickedLocationHandler, navigation, defaultSelectedLocation])

  return (
    <MapView region={region} style={styles.map} onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
          }}
        />
      )}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})
