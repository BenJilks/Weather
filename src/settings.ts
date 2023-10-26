import { createContext } from 'react'

export type TemperatureUnit = 
    'Celsius' |
    'Fahrenheit'

export const SettingsContext = createContext('Celsius' as TemperatureUnit)

