export type LineChartProps = {
  labels: string[]
  data: {
    label: string
    color: string
    values: number[]
    type: 'line' | 'bar'
  }[]
}

export type DoughnutChartProps = {
  data: {
    value: number
    color: string
    label: string
  }[]
}
