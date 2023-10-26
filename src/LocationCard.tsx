import { useEffect, useState } from 'react'
import { Card, Typography } from '@mui/joy'

import HourCard from './HourCard.tsx'
import { Forecast } from './weather_api.ts'
import * as weather_api from './weather_api.ts'

interface Params {
    location: string,
}

export default function LocationCard({ location }: Params) {
    const [forecast, set_forecast] = useState(null as null | Forecast)

    useEffect(() => {
        weather_api.forecast({ location }).then(set_forecast)
    }, [])

    return (
        <Card>
            <Typography level='h3'>{ location }</Typography>
            { forecast?.forecastday?.[0]?.hour?.map(hour => <HourCard hour={ hour } />) }
        </Card>
    )
}

