export interface Coords {
  lat: number;
  lon: number;
}

export interface WeatherbitResponse extends Coords {
  city_name: string;
  country_code: string;
  state_code: string;
  timezone: string;
  data: object[];
}

export interface StoreState {
  weather: WeatherbitResponse;
  coords: Coords;
  forecast: object;
  checkedDayId: number;
  loading: boolean;
  isGeolocationAllowed: boolean;
}

export interface WeatherInfo {
  code: number;
  description: string;
  icon: string;
}

export interface DayWeatherForecast {
  datetime: string;
  weather: WeatherInfo;
  temp: number;
  [option: string]: any;
}
