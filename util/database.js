import * as SQLLite from "expo-sqlite"

import { Place } from "../models/place"

const database = SQLLite.openDatabase("places.db")

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve()
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
  return promise
}

export const insertPlace = (place) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, lat, lng) VALUES (?,?,?,?)`,
        [place.title, place.imageUri, place.location.lat, place.location.lng],
        (_, result) => {
          resolve(result)
        },
        (_, err) => reject(err)
      )
    })
  })
  return promise
}

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = []
          for (let dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  lat: dp.lat,
                  lng: dp.lng,
                  address: "Sample ..."
                },
                dp.id
              )
            )
          }
          return resolve(places)
        },
        (_, error) => reject(error)
      )
    })
  })
  return promise
}
