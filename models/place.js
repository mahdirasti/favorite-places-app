export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title
    this.imageUri = imageUri
    this.address = location.address
    this.location = { lat: location.lat, lng: location.lng } // {lat: 0.1312412, lng: 1241}
    this.id = id
  }
}
