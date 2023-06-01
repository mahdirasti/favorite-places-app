import { Alert, Image, StyleSheet, Text, View } from "react-native"
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions
} from "expo-image-picker"

import { Colors } from "../../constants/Colors"
import OutlinedButton from "../UI/OutlinedButton"
import React from "react"

export default function ImagePicker({ onImageTake }) {
  const [takenImage, setStakenImage] = React.useState()

  const [cameraPermissionInformation, requestCameraPermission] =
    useCameraPermissions()
  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestCameraPermission()
      return permissionResponse.granted
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficent permissions!",
        "To continue with the app, you need to verify the camera access!"
      )
      return false
    }

    return true
  }

  async function takerImageHandler() {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.6
    })

    const uri = image.assets[0].uri

    setStakenImage(uri)

    if (onImageTake) onImageTake(uri)
  }

  let imagePreview = (
    <View>
      <Text>No taken photo!</Text>
    </View>
  )

  if (takenImage)
    imagePreview = (
      <Image style={styles.takenImage} source={{ uri: takenImage }} />
    )

  return (
    <View style={styles.container}>
      <View style={styles.imageHolder}>{imagePreview}</View>
      <OutlinedButton icon={"camera"} onPress={takerImageHandler}>
        Take image
      </OutlinedButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginVertical: 16
  },
  imageHolder: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary200,
    color: Colors.gray700,
    borderRadius: 8
  },
  takenImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8
  }
})
