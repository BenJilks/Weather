import { useState } from 'react'
import { Button } from '@mui/joy'

import LocationCard from './LocationCard.tsx'
import style from './App.module.css'

function App() {
    const [locations, set_locations] = useState(['London', 'Paris'])

    const on_add_new = () => {
        set_locations([
            ...locations,
            'London',
        ])
    }

    const on_location_change = (index: number, location: string) => {
        set_locations([
            ...locations.slice(0, index),
            location,
            ...locations.slice(index + 1),
        ])
    }

    const on_remove = (index: number) => {
        console.log(index)
        set_locations([
            ...locations.slice(0, index),
            ...locations.slice(index + 1),
        ])
    }

    return (
        <div className={ style.location_list }>
            {
                locations.map((location, index) =>
                    <LocationCard
                        location={ location }
                        on_location_change={ (location) => on_location_change(index, location) }
                        on_remove={ () => on_remove(index) }
                    />
                )
            }
            <div className={ style.actions }>
                <Button variant='outlined' onClick={ on_add_new }>Add New Location</Button>
            </div>
        </div>
    )
}

export default App

