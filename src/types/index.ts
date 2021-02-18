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
  checkedDayId: number;
  loading: boolean;
  isGeolocationAllowed: boolean;
}

interface WeatherInfo {
  code: number;
  description: string;
  icon: string;
}

interface DayWeatherForecast {
  datetime: string;
  weather: WeatherInfo;
  temp: number;
  [option: string]: any;
}

export {
  Coords,
  StoreState,
  DayWeatherForecast
}
