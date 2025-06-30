import { useEffect } from 'react'
import Chart from '../components/Chart.jsx'
import { useTrainers } from '../context/TrainerContext.jsx'
import Layout from '../components/layout/Layout.jsx'

const Statistics = () => {
    const { loadTrainers, trainers } = useTrainers()

    useEffect(() => {
        return () => {
            loadTrainers()
        }
    }, [])

    const regionWithMostTrainers = () => {
        const regionCount = {}
        for (const trainer of trainers) {
            regionCount[ trainer.region ] = ( regionCount[ trainer.region ] || 0 ) + 1
        }

        let maxRegion = ''
        let maxCount = 0
        for (const region in regionCount) {
            if (regionCount[ region ] > maxCount) {
                maxRegion = region
                maxCount = regionCount[ region ]
            }
        }

        return maxRegion
    }

    return (
        <Layout>

            <button className="btn btn-outline-primary mb-3 me-3">
                Total Trainers : { trainers.length }
            </button>
            <button className="btn btn-outline-primary mb-3">
                Region with highest trainers: { regionWithMostTrainers() || 'N/A' }
            </button>


            <Chart trainers={ trainers }/>
        </Layout>

    )
}

export default Statistics