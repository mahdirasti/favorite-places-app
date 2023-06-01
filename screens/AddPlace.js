import PlaceForm from "../components/Places/PlaceForm"
import React from "react"
import { insertPlace } from "../util/database"

export default function AddPlaceScreen({ navigation }) {
  const createPlaceHandler = async (place) => {
    await insertPlace(place)
    navigation.navigate("AllPlaces")
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />
}
