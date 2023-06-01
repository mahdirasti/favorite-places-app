import { Image, StyleSheet, Text, View } from "react-native"
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions
} from "expo-location"
import React, { useState } from "react"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"

import { Colors } from "../../constants/Colors"
import OutlinedButton from "../UI/OutlinedButton"
import { getMapPreview } from "../../util/location"

export default function LocationPicker({ onLocationPick }) {
  const isFocoused = useIsFocused()

  const navigation = useNavigation()
  const route = useRoute()

  const [pickedLocation, setPickedLocation] = React.useState()

  React.useEffect(() => {
    if (isFocoused && route.params) {
      const mapPickedLocation = route.params
        ? { lat: route.params.pickedLat, lng: route.params.pickedLng }
        : null

      if (mapPickedLocation) {
        setPickedLocation(mapPickedLocation)
      }

      if (onLocationPick) {
        onLocationPick(mapPickedLocation)
      }
    }
  }, [route, isFocoused])

  React.useEffect(() => {
    if (onLocationPick) onLocationPick(pickedLocation)
  }, [onLocationPick, pickedLocation])

  const [locationPermissions, requestPermission] = useForegroundPermissions()
  async function verifyPermmissions() {
    if (locationPermissions.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }

    if (locationPermissions.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficent permissions!",
        "To continue with the app, you need to verify the location access!"
      )
      return false
    }

    return true
  }

  const [isTryingGetLocation, setIsTryingGetLocation] = useState(false)
  async function getLocationHandler() {
    setIsTryingGetLocation(true)

    const hasPermission = await verifyPermmissions()

    if (!hasPermission) {
      return
    }

    const location = await getCurrentPositionAsync()

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    })

    setIsTryingGetLocation(false)
  }

  function pickOnMapHandler() {
    navigation.navigate("Map")
  }

  let imagePreview = (
    <View>
      <Text>No picked location yet!</Text>
    </View>
  )
  if (!!pickedLocation) {
    imagePreview = (
      <Image
        style={styles.mapImage}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)
        }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapPreview}>{imagePreview}</View>
      <View style={styles.actions}>
        <OutlinedButton
          icon="location"
          onPress={getLocationHandler}
          loading={isTryingGetLocation}
        >
          Locate user
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginVertical: 24
  },
  mapPreview: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary200,
    color: Colors.gray700,
    borderRadius: 8
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8
  },
  mapImage: {
    width: "100%",
    height: "100%"
  }
})
