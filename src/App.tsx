import { useState, useEffect } from 'react'
import { Button, Switch } from '@mui/joy'

import type { TemperatureUnit } from './settings.ts'
import { SettingsContext } from './settings.ts'
import LocationCard from './LocationCard.tsx'
import cities from './cities.ts'
import style from './App.module.css'

interface Location {
    location: string,
    is_favourited: boolean,
}

function App() {
    const [locations, set_locations] = useState(
        JSON.parse(localStorage.getItem('locations') ?? '[]') as Location[])
    const [temperature_unit, set_temperature_unit] = useState(
        (localStorage.getItem('temperature_unit') ?? 'Celsius') as TemperatureUnit)

    useEffect(() => {
        localStorage.setItem('locations', JSON.stringify(locations))
    }, [locations])

    useEffect(() => {
        localStorage.setItem('temperature_unit', temperature_unit)
    }, [temperature_unit])

    const on_add_new = () => {
        set_locations([
            ...locations,
            { location: 'London', is_favourited: false },
        ])
    }

    const on_location_change = (index: number, location: string, is_favourited: boolean) => {
        set_locations([
            ...locations.slice(0, index),
            { location, is_favourited },
            ...locations.slice(index + 1),
        ])
    }

    const on_remove = (index: number) => {
        set_locations([
            ...locations.slice(0, index),
            ...locations.slice(index + 1),
        ])
    }

    return (
        <div className={ style.location_list }>
            <div className={ style.settings }>
                <Switch
                    id='tempreture-mode'
                    checked={ temperature_unit === 'Fahrenheit' }
                    onChange={ event => set_temperature_unit(event.target.checked ? 'Fahrenheit' : 'Celsius') }
                />

                <label for='tempreture-mode'>C / F</label>
            </div>

            <SettingsContext.Provider value={ temperature_unit }>
            {
                locations
                    .sort((a, b) => (a.is_favourited ? 0 : 1) - (b.is_favourited ? 0 : 1))
                    .map((location, index) =>
                        <LocationCard
                            location={ location.location }
                            is_favourited={ location.is_favourited }
                            cities={ cities }
                            on_update={ (location, is_favourited) => on_location_change(index, location, is_favourited) }
                            on_remove={ () => on_remove(index) }
                        />
                    )
            }
            </SettingsContext.Provider>

            <div className={ style.actions }>
                <Button variant='outlined' onClick={ on_add_new }>Add New Location</Button>
            </div>
        </div>
    )
}

export default App

