import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale)

// eslint-disable-next-line react/prop-types
const Chart = ({ trainers }) => {
    // eslint-disable-next-line react/prop-types
    const regionCounts = trainers.reduce((acc, trainer) => {
        const region = trainer.region || 'Unknown'
        acc[ region ] = ( acc[ region ] || 0 ) + 1
        return acc
    }, {})

    const labels = Object.keys(regionCounts);
    const dataPoints = Object.values(regionCounts);

    const data = {
        labels,
        datasets: [
            {
                label: 'Number of Trainers per Region',
                data: dataPoints,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
        },
    }

    return (
        <div className="card p-4 shadow-sm" style={{width: '50rem'}}>
            <h5 className="mb-3">Trainer Growth Over Time</h5>
            <Line data={ data } options={ options }/>
        </div>
    )
}
export default Chart
