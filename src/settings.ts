import { createContext } from 'react'

export type TempretureUnit = 
    'Celsius' |
    'Fahrenheit'

export const SettingsContext = createContext('Celsius' as TempretureUnit)

