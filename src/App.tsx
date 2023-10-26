import { useState } from 'react'
import { Button } from '@mui/joy'

import LocationCard from './LocationCard.tsx'
import style from './App.module.css'

interface Location {
    location: string,
    is_favourited: boolean,
}

function App() {
    const [locations, set_locations] = useState([
        { location: 'London', is_favourited: false },
        { location: 'Paris', is_favourited: false },
    ])

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
            {
                locations.map((location, index) =>
                    <LocationCard
                        location={ location.location }
                        is_favourited={ location.is_favourited }
                        on_update={ (location, is_favourited) => on_location_change(index, location, is_favourited) }
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

