import axios from 'axios'

const API_URI = 'https://api.weatherapi.com/v1'
const API_KEY = '9901b5dac4e74756bf281748232610'

interface Condition {
    code: number,
    text: string,
    icon: string,
}

export interface Hour {
    time: string,
    time_epoch: number,

    chance_of_rain: number,
    chance_of_snow: number,
    cloud: number,
    condition: Condition,
}

interface Current {
    last_update_epoch: number,
    temp_c: number,
    temp_f: number,
    condition: Condition,
}

interface ForecastDay {
    date_epoch: number,
    hour: Hour[],

    day: {
        maxtemp_c: number,
        mintemp_c: number,
        avgtemp_c: number,
        condition: Condition,
    },
}

interface Forecast {
    forecastday: ForecastDay[],
}

export interface ForecastResponse {
    forecast: Forecast,
    current: Current,
}

export interface QueryParams {
    location: string,
    aqi?: boolean,
    alerts?: boolean,
}

export async function forecast(params: QueryParams): Promise<ForecastResponse> {
    const query = new URLSearchParams()
    query.set('key', API_KEY)
    query.set('q', params.location)
    query.set('aqi', params.aqi ? 'yes' : 'no')
    query.set('alerts', params.alerts ? 'yes' : 'no')

    const response = await axios.get(`${ API_URI }/forecast.json?${ query }`)
    return response.data
}

