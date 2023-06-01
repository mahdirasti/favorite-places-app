import React, { useCallback } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"

import Button from "../UI/Button"
import { Colors } from "../../constants/Colors"
import ImagePicker from "./ImagePicker"
import LocationPicker from "./LocationPicker"
import { Place } from "../../models/place"

export default function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = React.useState()

  const changeTitleHandler = (value) => setEnteredTitle(value)

  const [imageTaken, setImageTaken] = React.useState()
  const imageTakenHandler = (imageUri) => {
    setImageTaken(imageUri)
  }

  const [locationPicked, setLocationPicked] = React.useState()
  const locationPickedHandler = useCallback((location) => {
    setLocationPicked(location)
  }, [])

  const saveFormHandler = () => {
    console.log("enteredTitle", enteredTitle)
    console.log("imageTaken", imageTaken)
    console.log("locationPicked", locationPicked)
    if (onCreatePlace) {
      const newPlace = new Place(enteredTitle, imageTaken, {
        ...locationPicked,
        address: `NotHumanable-${locationPicked.lat},${locationPicked.lng}`
      })

      onCreatePlace(newPlace)
    }
  }

  return (
    <ScrollView style={styles.form}>
      <View style={styles.inputHolder}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} />
      </View>
      <ImagePicker onImageTake={imageTakenHandler} />
      <LocationPicker onLocationPick={locationPickedHandler} />
      <Button onPress={saveFormHandler}>Hello</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  inputHolder: {
    gap: 8
  },
  label: {
    color: Colors.primary200,
    fontWeight: "bold"
  },
  input: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary200,
    color: Colors.primary200
  }
})
