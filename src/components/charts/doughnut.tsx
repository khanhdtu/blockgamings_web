import { Doughnut } from 'react-chartjs-2'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { DoughnutChartProps as Props } from './types'

export const DoughnutChart = (props: Props): JSX.Element => {
  const options = {
    cutoutPercentage: 70,
  }

  const labels: string[] = []
  const backgrounds: string[] = []
  const values: number[] = []
  props.data.map(prop => {
    labels.push(prop.label)
    backgrounds.push(prop.color)
    values.push(prop.value)
  })

  const data = {
    labels,
    datasets: [
      {
        type: 'doughnut',
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: '#8C54FF',
        data: values,
        backgroundColor: backgrounds,
        hoverOffset: 4,
        borderWidth: 2,
        lineTension: 0,
      },
    ],
  }

  return (
    <Box position='relative'>
      <Doughnut height={180} options={options} data={data} />
      <Box position='absolute' top={0} width='100%' height='100%' display='flex' alignItems='center' justifyContent='center'>
        <Box textAlign='center' mt={5}>
          <Typography variant='h3'>17.2 %</Typography>
          <Typography variant='subtitle2'>{labels[0].toUpperCase()}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default DoughnutChart
