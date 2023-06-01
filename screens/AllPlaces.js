import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"

import PlaceList from "../components/Places/PlaceList"
import { fetchPlaces } from "../util/database"
import { useIsFocused } from "@react-navigation/native"

export default function AllPlacesScreen({ route }) {
  const [places, setPlaces] = useState([])

  const isFouced = useIsFocused()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadPlaces = await fetchPlaces()
        setPlaces(loadPlaces)
      } catch (e) {
        console.error(e)
      }
      // console.log("loadPlaces", loadPlaces)
    }
    if (isFouced) fetchData()
  }, [isFouced])

  return <PlaceList places={places} />
}
