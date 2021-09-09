import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { Props } from './types'
import { formatFriendlyName } from '../../utils'

const useStyles = makeStyles(() => ({
  logout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: 100,
    height: 35,
    borderRadius: 30,
    marginTop: '-10px !important',
    '&:hover': {
      backgroundColor: 'rgb(228, 230, 235)',
    },
  },
}))

export const Profile = (props: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <Box minWidth={295} display='flex' alignItems='center' justifyContent='flex-end'>
      <Box minWidth={245} mr={1}>
        <Typography variant='h5' align='right'>
          Welcome, {props.displayName}
        </Typography>
        <Box display='flex' justifyContent='flex-end'>
          <Typography className={classes.logout} variant='subtitle2' align='right' style={{ marginRight: 15 }} onClick={props.onLogout}>
            <LogoutIcon style={{ marginRight: 5 }} />
            LOGOUT
          </Typography>
          <Typography variant='subtitle2' align='right' style={{ marginRight: 20 }}>
            |
          </Typography>
          <Typography variant='subtitle2' align='right'>
            {formatFriendlyName(props.role)}
          </Typography>
        </Box>
      </Box>
      <Avatar className='pointer' src={props.avatar} onClick={props.onOpenProfile} />
    </Box>
  )
}

export default Profile
