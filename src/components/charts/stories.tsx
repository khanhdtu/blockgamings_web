import { LineChart } from './line'
import { DoughnutChart } from './doughnut'
import { Card } from '../card'
import { LineChartProps, DoughnutChartProps } from './types'

export const UniqueVisitorChart = (props: LineChartProps): JSX.Element => {
  const chartInputs: LineChartProps = {
    labels: ['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22', 'Mar 29', 'Apr 5', 'Apr 12', 'Apr 19', 'Apr 26'],
    data: [
      {
        label: 'Yesterday',
        color: '#8C54FF',
        values: [4, 5, 8, 7, 13, 14, 7, 8, 5, 18],
        type: 'line',
      },
      {
        label: 'Today',
        color: '#2E5BFF',
        values: [8, 12, 10, 15, 24, 23, 16, 13, 16, 17, 29],
        type: 'line',
      },
    ],
  }

  return (
    <Card titleText='Unique Visitor' height={525} width={800}>
      <LineChart labels={props.labels || chartInputs.labels} data={props.data || chartInputs.data} />
    </Card>
  )
}

export const BetOverGamesChart = (props: LineChartProps): JSX.Element => {
  const chartInputs: LineChartProps = {
    labels: ['Mon', 'Tue', 'Wed', 'Fri'],
    data: [
      {
        label: 'Black jack',
        color: '#8C54FF',
        values: [55, 40, 48, 80],
        type: 'bar',
      },
      {
        label: 'Today',
        color: '#2E5BFF',
        values: [70, 50, 60, 90],
        type: 'bar',
      },
      {
        label: 'Tomorrow',
        color: '#F7C137',
        values: [75, 52, 62, 92],
        type: 'line',
      },
    ],
  }

  return (
    <Card titleText='Bet Over Games' height={525} width={800}>
      <LineChart {...props} labels={chartInputs.labels} data={chartInputs.data} />
    </Card>
  )
}

export const Payout = (props: LineChartProps): JSX.Element => {
  const chartInputs: LineChartProps = {
    labels: ['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22'],
    data: [
      {
        label: 'Yesterday',
        color: '#8C54FF',
        values: [26, 15, 70, 40, 53, 74],
        type: 'line',
      },
      {
        label: 'Today',
        color: '#2E5BFF',
        values: [10, 28, 49, 27, 40, 60],
        type: 'line',
      },
    ],
  }

  return (
    <Card titleText='Payout' width={490} height={320}>
      <LineChart {...props} labels={chartInputs.labels} data={chartInputs.data} />
    </Card>
  )
}

export const BetSplitChart = (props: DoughnutChartProps): JSX.Element => {
  const data = [
    {
      label: 'Andar Bah',
      value: 60,
      color: '#F7C137',
    },
    {
      label: 'Roulette',
      value: 5,
      color: '#00C1D4',
    },
    {
      label: 'Magic Cards',
      value: 20,
      color: '#8C54FF',
    },
    {
      label: 'Black Jack',
      value: 15,
      color: '#2E5BFF',
    },
  ]
  return (
    <Card titleText='Bet Split' height={350} width={500}>
      <DoughnutChart {...props} data={data} />
    </Card>
  )
}

export default {
  title: 'Components/Charts',
  component: UniqueVisitorChart,
}
