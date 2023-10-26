import { useState, useEffect } from 'react'
import axios from 'axios'
import HourCard from './HourCard.tsx'
import './App.css'

const API_URI = 'https://api.weatherapi.com/v1'
const API_KEY = '9901b5dac4e74756bf281748232610'

function App() {
    const [forecast, set_forecast] = useState(undefined as any)

    useEffect(() => {
        const query = new URLSearchParams()
        query.set('key', API_KEY)
        query.set('q', 'London')
        query.set('aqi', 'no')
        query.set('alerts', 'no')

        axios.get(`${ API_URI }/forecast.json?${ query }`)
            .then(({ data }) => set_forecast(data))
    }, [])

    return (
        <HourCard hour={ forecast?.forecast?.forecastday?.[0]?.hour?.[0] } />
    )
}

export default App

