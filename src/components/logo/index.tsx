import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import { Props } from './types'

export const LogoBrand = ({ name, logo }: Props): JSX.Element => {
  return (
    <Box display='flex' alignItems='center' mb={1} pl='5px'>
      <Avatar src={logo ?? ''} />
      <Box display='flex' flexDirection='column' justifyContent='center' ml={1}>
        <Typography variant='h5' color='primary'>
          {name}
        </Typography>
        <Typography variant='h6' color='secondary' style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
          Backoffice
        </Typography>
      </Box>
    </Box>
  )
}

export default LogoBrand
