import { useEffect, useState } from "react"

import AddPlaceScreen from "./screens/AddPlace"
import AllPlacesScreen from "./screens/AllPlaces"
import AppLoading from "./components/UI/Loading"
import { Colors } from "./constants/Colors"
import IconButton from "./components/UI/IconButton"
import MapScreen from "./screens/Map"
import { NavigationContainer } from "@react-navigation/native"
import PlaceDetailsScreen from "./screens/PlaceDetails"
import { StatusBar } from "expo-status-bar"
import { StyleSheet } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { init } from "./util/database"

const Stack = createNativeStackNavigator()

export default function App() {
  const [dbInitilized, setDbInitilized] = useState()
  useEffect(() => {
    setDbInitilized(false)
    async function initDb() {
      try {
        await init()
        setTimeout(() => {
          setDbInitilized(true)
        }, Math.floor(Math.random() * 3000) + 1000)
      } catch (e) {
        console.error(e)
      }
    }

    initDb()
  }, [])

  if (!dbInitilized) return <AppLoading message="Initializing the app ..." />

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700
            }
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlacesScreen}
            options={({ navigation }) => ({
              title: "Your favorite places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  name="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              )
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlaceScreen}
            options={{
              title: "Add new place"
            }}
          />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetailsScreen}
            options={{
              title: "View Place"
            }}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{
              title: "Pick on Map"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
