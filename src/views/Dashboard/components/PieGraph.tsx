import React from 'react'
import { Pie } from 'react-chartjs-2'
import { LinearProgress } from '@material-ui/core';

const options: object = {
  plugins: {
    legend: {
      display: true,
      position: 'left'
    },
  },
  aspectRatio: 3,
  responsive: true,
  rotation: 30
};

function PieGraph(props: any) {
  const { categoriesLabels, categoriesAmount } = props

  const data: any = {
    labels: categoriesLabels,
    datasets: [
      {
        label: 'Produtos por categoria',
        data: categoriesAmount,
        backgroundColor: [
          '#81c4eb',
          '#64bbed',
          '#49b4f2',
          '#37abed',
          '#1496e0',
          '#0593e6',
          '#0c7fc2',
          '#0b5d8c',
          '#6ca2e0',
          '#5596e0',
          '#3e89de',
          '#2379db',
          '#0b71e6',
          '#1460b8'
        ],
        borderColor: [
          '#81c4eb',
          '#64bbed',
          '#49b4f2',
          '#37abed',
          '#1496e0',
          '#0593e6',
          '#0c7fc2',
          '#0b5d8c',
          '#6ca2e0',
          '#5596e0',
          '#3e89de',
          '#2379db',
          '#0b71e6',
          '#1460b8'
        ],
        borderWidth: 1,
      },
    ],
}

  if (!data) return <LinearProgress></LinearProgress>

  return (
    <Pie options={options} data={data} type='pie'></Pie>
  )
}

export default PieGraph