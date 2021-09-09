import { Line, Bar } from 'react-chartjs-2'
import { LineChartProps as Props } from './types'

export const LineChart = (props: Props): JSX.Element => {
  const options = {
    bezierCurve: false,
    scales: {
      xAxes: [
        {
          barThickness: 10,
          barPercentage: 0.5,
          ticks: {
            autoSkip: true,
            maxTicksLimit: 9,
            fontSize: 15,
            fontFamily: 'Rubik',
            fontColor: '#B0BAC9',
          },
          gridLines: {
            display: true,
            drawBorder: true,
            offsetGridLines: true,
            lineWidth: 1,
          },
        },
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: 0, // minimum will be 0, unless there is a lower value.
            beginAtZero: true, // minimum value will be 0.
            maxTicksLimit: 8,
            fontFamily: 'Rubik',
            fontColor: '#B0BAC9',
          },
          gridLines: {
            display: true,
            drawBorder: true,
            background: 'yellow',
            offsetGridLines: true,
            lineWidth: 1,
          },
        },
      ],
      layout: {
        padding: { left: 10, right: 10 },
      },
      grid: {},
    },
  }

  const getDatasets = () => {
    const datasets: any = []
    props.data.map(data => {
      datasets.push({
        type: data.type || 'line',
        backgroundColor: data.type === 'bar' && data.color,
        label: data.label,
        borderColor: data.type === 'bar' ? '#FFF' : data.color,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: '#8C54FF',
        data: data.values,
        lineTension: 0,
        borderRadius: 50,
        borderWidth: 2,
      })
    })
    return datasets
  }

  const data = {
    labels: props.labels,
    datasets: getDatasets(),
  }

  const isExistBar = (): boolean => {
    const found = props.data.filter(data => data.type === 'bar')
    if (found.length) return true
    return false
  }

  return <>{isExistBar() ? <Bar options={options} data={data} /> : <Line options={options} data={data} />}</>
}

export default LineChart
