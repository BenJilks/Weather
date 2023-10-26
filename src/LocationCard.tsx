import { Fragment, useEffect, useState } from 'react'
import { Card, Typography } from '@mui/joy'
import style from './LocationCard.module.css'

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
            <div className={ style.location }>
                <div className={ style.day_info }>
                    <Typography level='h3'>{ location }</Typography>
                </div>

                <div className={ style.hour_list }>
                    { day?.hour?.map(hour => <HourCard hour={ hour } />) }
                </div>
            </div>
        </Card>
    )
}

