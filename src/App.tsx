import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

import HourCard from './HourCard.tsx'
import * as weatherapi from './weather_api.ts'
import { Forecast } from './weather_api.ts'

function App() {
    const [forecast, set_forecast] = useState(undefined as undefined | Forecast)

    useEffect(() => {
        weatherapi.forecast({ location: 'London' }).then(set_forecast)
    }, [])

    return (
        <HourCard hour={ forecast?.forecastday?.[0]?.hour?.[0] } />
    )
}

export default App

