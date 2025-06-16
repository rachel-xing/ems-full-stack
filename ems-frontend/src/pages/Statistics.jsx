
import Chart from '../components/Chart.jsx'
import { useTrainers } from '../context/TrainerContext.jsx'


const Statistics = () => {
    const {trainers} = useTrainers()
    return (
        <>
            <p>
                Total Trainers :{trainers.length}
            </p>
            <Chart trainers={trainers}/>
        </>


    );
};

export default Statistics;