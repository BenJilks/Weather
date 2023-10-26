import { useEffect, useState } from 'react'
import { Card, Typography } from '@mui/joy'

import HourCard from './HourCard.tsx'
import { ForecastResponse } from './weather_api.ts'
import * as weather_api from './weather_api.ts'

interface Params {
    location: string,
}

export default function LocationCard({ location }: Params) {
    const [forecast_response, set_forecast_response] = useState(null as null | ForecastResponse)
    const forecast = forecast_response?.forecast
    const day = forecast?.forecastday?.[0]

    useEffect(() => {
        weather_api.forecast({ location }).then(set_forecast_response)
    }, [])

    return (
        <Card>
            <Typography level='h3'>{ location }</Typography>
            { day?.hour?.map(hour => <HourCard hour={ hour } />) }
        </Card>
    )
}

