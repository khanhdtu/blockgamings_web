import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import CurrencyFormat from 'react-currency-format'
import { Props } from './types'
import { Dynamic } from '../nossr'

export const Winner = (props: Props): JSX.Element => {
  return (
    <Dynamic>
      <Box height={48} display='flex' alignItems='center' justifyContent='space-between' mb={1}>
        <Box display='flex' minWidth={250} mt='-3px'>
          <Box>
            <Avatar />
          </Box>
          <Box ml={3}>
            <Typography variant='h5' color='secondary'>
              {props.displayName}
            </Typography>
          </Box>
        </Box>
        <Box minWidth={160} textAlign='right'>
          <CurrencyFormat value={props.totalMoney} displayType={'text'} thousandSeparator={true} prefix={props.unix} />
          <Typography variant='subtitle2'>{props.position}st</Typography>
        </Box>
      </Box>
    </Dynamic>
  )
}
