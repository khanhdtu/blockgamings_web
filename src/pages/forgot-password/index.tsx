import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import EmailIcon from '@material-ui/icons/Email'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import Link from 'next/link'
import { useState } from 'react'
import { observer } from 'mobx'
import { useStyles } from '../sign-in'
import { useMst } from '../../stores'
import { Loading } from '../../components/loading'

export const ForgotPassword = (): JSX.Element => {
  const { user } = useMst()
  const [creds, setCred] = useState({
    email: '',
    username: '',
  })
  const classes = useStyles()

  const onChanged = (key: string, value: string) => {
    setCred({ ...creds, [key]: value })
  }

  const onSubmit = () => {
    if (!creds.username ?? !creds.email) {
      return
    }
    user.doResetPasswordRequest(creds)
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.mask}>
        <Box className={classes.view}>
          <Box className={classes.form}>
            <Box className={classes.formContained}>
              {/* Submit BUTTON */}
              <Box className={classes.signinBtn}>
                <LockIcon />
                <Typography className='label'>Forgot Password</Typography>
              </Box>

              {/* EMAIL INPUT */}
              <Box className={classes.row}>
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item>
                    <PersonIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id='input-with-icon-grid'
                      fullWidth
                      label='Email'
                      value={creds.email}
                      onChange={e => onChanged('email', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* USERNAME INPUT */}
              <Box className={classes.row}>
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item>
                    <EmailIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id='input-with-icon-grid'
                      fullWidth
                      label='Username'
                      value={creds.username}
                      onChange={e => onChanged('username', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* SIGN IN BUTTON */}
              <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' mt='40px'>
                <Button className={classes.submit} onClick={onSubmit}>
                  Send
                </Button>
                <Box mt={2}>
                  <Link href='/sign-in'>
                    <Typography className={classes.forgotPassword}>Back to sign in</Typography>
                  </Link>
                </Box>
              </Box>

              <Box width='100%' height='1px' bgcolor='rgba(0,0,0,.1)' mt={3} />

              {/* SOCIALS LOGIN */}
              <Box className={classes.social}>
                <Box mr={5}>
                  <FacebookIcon />
                </Box>
                <Box mr={5}>
                  <InstagramIcon />
                </Box>
                <Box>
                  <TwitterIcon />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {user.isLoading && <Loading />}
    </Box>
  )
}

export default observer(ForgotPassword)
