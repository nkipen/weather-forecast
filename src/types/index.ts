interface Coords {
  lat: number,
  lon: number
}

interface StoreState {
  weather: object,
  coords: Coords,
  isGeolocationAllowed: boolean
}

export {
  Coords,
  StoreState
}
