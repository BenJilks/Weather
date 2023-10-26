import { Fragment, useEffect, useState, useContext } from 'react'
import { Card, Typography, Button, Autocomplete } from '@mui/joy'
import { StarOutlined, StarBorder } from '@mui/icons-material'
import style from './LocationCard.module.css'

import HourCard from './HourCard.tsx'
import { SettingsContext } from './settings.ts'
import { ForecastResponse } from './weather_api.ts'
import * as weather_api from './weather_api.ts'

interface Params {
    location: string,
    is_favourited: boolean,
    cities: string[],

    on_update: (location: string, is_favourited: boolean) => void,
    on_remove: () => void,
}

export default function LocationCard({ location, is_favourited, cities, on_update, on_remove }: Params) {
    const [forecast_response, set_forecast_response] = useState(null as null | ForecastResponse)
    const forecast = forecast_response?.forecast
    const day = forecast?.forecastday?.[0]
    const current = forecast_response?.current
    useEffect(() => {
        weather_api.forecast({ location })
            .then(set_forecast_response)
            .catch(() => {})
    }, [location])

    const tempreture_unit = useContext(SettingsContext)
    const tempreture = tempreture_unit === 'Celsius'
        ? `${ current?.temp_c }°C`
        : `${ current?.temp_f }°F`

    const on_location_change = (value: string | null) => {
        if (value) {
            on_update(value, is_favourited)
        }
    }

    const on_favourited_toggled = () => {
        on_update(location, !is_favourited)
    }

    return (
        <Card>
            <div className={ style.location }>
                <div className={ style.day_info }>
                    <Button className={ style.remove } onClick={ on_remove } variant="plain">Remove</Button>

                    {
                        is_favourited
                            ? <StarOutlined className={ style.favourited } onClick={ on_favourited_toggled } />
                            : <StarBorder className={ style.favourited } onClick={ on_favourited_toggled } />
                    }

                    <Autocomplete
                        freeSolo
                        className={ style.location_name }
                        options={ cities }
                        value={ location }
                        onChange={ (_, value) => on_location_change(value) }
                    />

                    <Typography className={ style.tempreture } level='body-md'>
                        { tempreture ?? 'Loading' }
                    </Typography>
                </div>

                <div className={ style.hour_list }>
                    { day?.hour?.map(hour => <HourCard hour={ hour } />) }
                </div>
            </div>
        </Card>
    )
}

