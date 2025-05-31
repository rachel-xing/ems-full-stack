import React from 'react';
import Chart from '../components/Chart.jsx'
import { useTrainers } from '../context/TrainerContext.jsx'

const Statistics = () => {
    const {trainers} = useTrainers()
    return (

        <Chart trainers={trainers}/>
    );
};

export default Statistics;