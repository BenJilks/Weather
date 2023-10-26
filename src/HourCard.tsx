import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'
import style from './HourCard.module.css'

interface Hour {
    time: string,
    time_epoch: number,

    chance_of_rain: number,
    chance_of_snow: number,
    cloud: number,

    condition: {
        code: number,
        text: string,
        icon: string,
    },
}

interface Params {
    hour?: Hour,
}

export default function HourCard({ hour }: Params) {
    if (!hour) {
        return <></>
    }

    const condition = hour.condition
    return (
        <Card className={ style.card }>
            <img className={ style.icon } src={ condition.icon } />
            <Typography className={ style.status } level='title-lg'>
                { condition.text }
            </Typography>
        </Card>
    )
}

