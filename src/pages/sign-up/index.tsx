import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import EmailIcon from '@material-ui/icons/Email'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useStyles } from '../sign-in'
import { useMst } from '../../stores'

export const SignUp = (): JSX.Element => {
  const { query } = useRouter()
  const { user } = useMst()
  const [creds, setCred] = useState({
    username: '',
    email: '',
    password: '',
    retypePassword: '',
    verifyAccountCode: '',
  })
  const classes = useStyles()

  useEffect(() => {
    if (creds.username || creds.email || creds.verifyAccountCode) return
    setCred({
      username: query.username as string,
      email: query.email as string,
      verifyAccountCode: query.code as string,
      password: '',
      retypePassword: '',
    })
  }, [creds])

  const handleValueChanged = (key: string, value: string) => {
    setCred({ ...creds, [key]: value })
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.mask}>
        <Box className={classes.view}>
          <Box className={classes.form}>
            <Box className={classes.formContained}>
              {/* SIGN UP BUTTON */}
              <Box className={classes.signinBtn}>
                <PersonIcon />
                <Typography className='label'>Sign Up</Typography>
              </Box>

              {/* USERNAME INPUT */}
              <Box className={classes.row}>
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item>
                    <PersonIcon />
                  </Grid>
                  <Grid item>
                    <TextField id='input-with-icon-grid' fullWidth label='Username' value={creds.username} disabled />
                  </Grid>
                </Grid>
              </Box>

              {/* EMAIL INPUT */}
              <Box className={classes.row}>
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item>
                    <EmailIcon />
                  </Grid>
                  <Grid item>
                    <TextField id='input-with-icon-grid' fullWidth label='Email' value={creds.email} disabled />
                  </Grid>
                </Grid>
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
                      label='Password'
                      type='password'
                      value={creds.password}
                      onChange={e => handleValueChanged('password', e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems='flex-end' className={classes.mt5}>
                  <Grid item>
                    <LockIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      id='input-with-icon-grid'
                      label='Confirm password'
                      type='password'
                      value={creds.retypePassword}
                      onChange={e => handleValueChanged('retypePassword', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* SIGN IN BUTTON */}
              <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' mt='40px'>
                <Button className={classes.submit} onClick={() => user.doSignUp(creds)}>
                  Sign Up
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

export default SignUp
