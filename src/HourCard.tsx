import Typography from '@mui/joy/Typography'
import style from './HourCard.module.css'

import type { Hour } from './weather_api.ts'

interface Params {
    hour?: Hour,
}

export default function HourCard({ hour }: Params) {
    if (!hour) {
        return <></>
    }

    const condition = hour.condition
    const time = new Date(hour.time)

    return (
        <div className={ style.card }>
            <img className={ style.icon } src={ condition.icon } alt={ condition.text } />
            <Typography className={ style.status } level='body-md'>
                { time.getHours() }
            </Typography>
        </div>
    )
}

