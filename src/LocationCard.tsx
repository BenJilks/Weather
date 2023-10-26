import { Fragment, useEffect, useState } from 'react'
import { Card, Typography, Button } from '@mui/joy'
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
    const current = forecast_response?.current
    useEffect(() => {
        weather_api.forecast({ location }).then(set_forecast_response)
    }, [])

    const on_remove = () => {
    }

    const on_edit = () => {
    }

    return (
        <Card>
            <div className={ style.location }>
                <div className={ style.day_info }>
                    <Button className={ style.remove } onClick={ on_remove } variant="plain">Remove</Button>
                    <Typography className={ style.location_name } level='h3'>{ location }</Typography>
                    <Button className={ style.edit } onClick={ on_edit } variant="plain">E</Button>
                    <Typography className={ style.tempreture } level='body-md'>{ current?.temp_c }°C</Typography>
                </div>

                <div className={ style.hour_list }>
                    { day?.hour?.map(hour => <HourCard hour={ hour } />) }
                </div>
            </div>
        </Card>
    )
}

