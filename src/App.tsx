import { useState } from 'react'
import LocationCard from './LocationCard.tsx'
import style from './App.module.css'

function App() {
    const [locations, set_locations] = useState(['London', 'Paris'])

    return (
        <div className={ style.location_list }>
            { locations.map(location => <LocationCard location={ location } />) }
        </div>
    )
}

export default App

