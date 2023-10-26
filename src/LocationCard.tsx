import { Fragment, useEffect, useState } from 'react'
import { Card, Typography, Button, Autocomplete } from '@mui/joy'
import style from './LocationCard.module.css'

import HourCard from './HourCard.tsx'
import { ForecastResponse } from './weather_api.ts'
import * as weather_api from './weather_api.ts'

interface Params {
    location: string,
    on_location_change: (location: string) => void,
    on_remove: () => void,
}

export default function LocationCard({ location, on_location_change, on_remove }: Params) {
    const [forecast_response, set_forecast_response] = useState(null as null | ForecastResponse)
    const forecast = forecast_response?.forecast
    const day = forecast?.forecastday?.[0]
    const current = forecast_response?.current
    useEffect(() => {
        weather_api.forecast({ location }).then(set_forecast_response)
    }, [location])

    return (
        <Card>
            <div className={ style.location }>
                <div className={ style.day_info }>
                    <Button className={ style.remove } onClick={ on_remove } variant="plain">Remove</Button>
                    <Autocomplete
                        className={ style.location_name }
                        options={ ['London', 'Paris'] }
                        value={ location }
                        onChange={ (_, value) => { if (value) on_location_change(value) } }
                    />
                    <Typography className={ style.tempreture } level='body-md'>{ current?.temp_c }°C</Typography>
                </div>

                <div className={ style.hour_list }>
                    { day?.hour?.map(hour => <HourCard hour={ hour } />) }
                </div>
            </div>
        </Card>
    )
}

