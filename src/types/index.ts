interface Coords {
  lat: number;
  lon: number;
}

interface WeatherbitResponse extends Coords {
  city_name: string;
  country_code: string;
  state_code: string;
  timezone: string;
  data: object[];
}

interface StoreState {
  weather: WeatherbitResponse;
  coords: Coords;
  forecast: object;
  isGeolocationAllowed: boolean;
}

export {
  Coords,
  StoreState
}
