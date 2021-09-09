import { Box } from '@material-ui/core'

type Props = {
  status: 'ACTIVE' | 'BLOCKED' | 'PENDING' | 'COMPLETED' | 'PROCESSING' | 'CANCELED'
}

export const Status = ({ status }: Props): JSX.Element => {
  const getName = (): string => {
    if (status === 'ACTIVE') return 'Active'
    if (status === 'BLOCKED') return 'Blocked'
    if (status === 'CANCELED') return 'Canceled'
    if (status === 'PENDING') return 'Pending'
    if (status === 'COMPLETED') return 'Completed'
    if (status === 'PROCESSING') return 'Processing'
    return ''
  }

  const getBgColor = (): string => {
    if (status === 'ACTIVE' || status === 'COMPLETED') return 'green'
    if (status === 'BLOCKED' || status === 'CANCELED') return 'darkred'
    if (status === 'PENDING') return 'darkorange'
    if (status === 'PROCESSING') return 'gray'
    return ''
  }

  return (
    <Box
      height={19}
      borderRadius={20}
      p='0px 8px'
      display='inline-flex'
      alignItems='center'
      justifyContent='center'
      color='#FFF'
      bgcolor={getBgColor()}
    >
      <span style={{ fontSize: 12 }}>{getName()}</span>
    </Box>
  )
}

export default Status
