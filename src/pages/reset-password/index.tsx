import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import LockIcon from '@material-ui/icons/Lock'
import ResetIcon from '@material-ui/icons/RotateLeft'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { observer } from 'mobx'
import { useStyles } from '../sign-in'
import { useMst } from '../../stores'

export const ResetPassword = (): JSX.Element => {
  const { user } = useMst()
  const { query } = useRouter()
  const [creds, setCred] = useState({
    password: '',
    retypePassword: '',
  })
  const classes = useStyles()

  const onChanged = (key: string, value: string) => {
    setCred({ ...creds, [key]: value })
  }

  const onSubmit = () => {
    if (!creds.password || !creds.retypePassword) {
      return
    }
    user.doResetPasswordConfirm({
      ...creds,
      resetCode: query.resetCode as string,
    })
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.mask}>
        <Box className={classes.view}>
          <Box className={classes.form}>
            <Box className={classes.formContained}>
              {/* Submit BUTTON */}
              <Box className={classes.signinBtn} onClick={onSubmit}>
                <ResetIcon />
                <Typography className='label'>Reset password</Typography>
              </Box>

              {/* PASSWORD INPUT */}
              <Box className={classes.row}>
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item>
                    <LockIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      id='input-with-icon-grid'
                      label='New Password'
                      type='password'
                      value={creds.password}
                      onChange={e => onChanged('password', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* RETYPE PASSWORD INPUT */}
              <Box className={classes.row}>
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item>
                    <LockIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      id='input-with-icon-grid'
                      label='Confirm Password'
                      type='password'
                      value={creds.retypePassword}
                      onChange={e => onChanged('retypePassword', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* SIGN IN BUTTON */}
              <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' mt='40px'>
                <Button className={classes.submit} onClick={onSubmit}>
                  Reset
                </Button>
                <Box mt={2}>
                  <Link href='/sign-in'>
                    <Typography className={classes.forgotPassword} variant='subtitle2'>
                      Back to sign in
                    </Typography>
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
    </Box>
  )
}

export default observer(ResetPassword)
