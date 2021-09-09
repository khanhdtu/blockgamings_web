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
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { observer } from 'mobx'
import { useMst } from '../../stores'
import { makeStyles, createStyles } from '@material-ui/core'
import { hash } from '../../utils'

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      height: '100vh',
      backgroundImage: `url(temp/bg_login.jpg)`,
    },
    mask: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(62,69,81,.7)',
    },
    view: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    form: {
      width: 570,
      display: 'flex',
      justifyContent: 'center',
      boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
      backgroundColor: 'rgba(229,228,255,.2)',
      borderRadius: 10,
      paddingBottom: 20,
      '& #input-with-icon-grid': {
        color: '#FFF !important',
      },
      '& #sign-in-input-icon-grid': {
        color: '#FFF !important',
      },
      [theme.breakpoints.down(600)]: {
        width: '94%',
      },
    },
    formContained: {
      width: 530,
      [theme.breakpoints.down(600)]: {
        width: '100%',
        padding: 10,
      },
    },
    row: {
      marginTop: 20,
      [theme.breakpoints.down(600)]: {
        '&.MuiGrid-container': {
          justifyContent: 'center',
        },
      },
      '& svg': {
        width: 32,
        height: 32,
        marginRight: 3,
        color: '#FFF',
      },
      '& .MuiFormLabel-root': {
        color: '#FFF',
      },
      '& .MuiTextField-root': {
        width: 475,
        [theme.breakpoints.down(600)]: {
          width: 400,
        },
        [theme.breakpoints.down(480)]: {
          width: 275,
        },
      },
      '& .MuiInput-underline:before': {
        borderBottom: '1px solid #FFF',
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottom: '1px solid #FFF',
      },
    },
    signinBtn: {
      width: 530,
      height: 84,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFF !important',
      marginTop: '-25px !important',
      background: 'linear-gradient(40deg,#ff6ec4,#7873f5)!important',
      boxShadow: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)',
      '& svg': {
        width: 30,
        height: 30,
        marginTop: -2,
      },
      '& .label': {
        fontSize: '25px !important',
        color: '#FFF !important',
      },
      [theme.breakpoints.down(600)]: {
        width: 350,
        margin: 'auto',
      },
      [theme.breakpoints.down(480)]: {
        width: 330,
        margin: 'auto',
      },
    },
    submit: {
      minWidth: '170px !important',
      height: 54,
      fontSize: '18px !important',
      color: '#FFF !important',
      borderRadius: '4px !important',
      background: 'linear-gradient(40deg,#ff6ec4,#7873f5)!important',
      boxShadow: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)',
    },
    social: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 30,
      '& svg': {
        color: '#FFF',
        width: 30,
        height: 30,
      },
    },
    forgotPassword: {
      color: '#FFF !important',
      textDecorationLine: 'underline',
      cursor: 'pointer',
    },
    mt5: {
      marginTop: '20px !important',
    },
  }),
)

export const SignIn = (): JSX.Element => {
  const { user, brands } = useMst()
  const { replace, locale } = useRouter()
  const [creds, setCred] = useState({
    input: '',
    password: '',
  })
  const classes = useStyles()

  const handleValueChanged = (key: string, value: string) => {
    setCred({ ...creds, [key]: value })
  }

  useEffect(() => {
    user.doGetCurrentUser()
    if (locale) {
      brands.doFetchBrand(locale)
    }
  }, [])

  const handleSubmit = () => {
    if (!creds.input || !creds.password) return
    const { publicKey } = brands.myBrand
    if (creds.input.includes('@')) {
      user.doSignIn({ email: hash(creds.input, publicKey), password: hash(creds.password, publicKey), brandId: brands.myBrand.id })
    } else {
      user.doSignIn({ username: hash(creds.input, publicKey), password: hash(creds.password, publicKey), brandId: brands.myBrand.id })
    }
  }

  if (user.currentUser.token) {
    if (user.currentUser.mustChangePassword) {
      replace('/sign-in/change-password')
    } else {
      replace('/')
    }
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.mask}>
        <Box className={classes.view}>
          <Box className={classes.form}>
            <Box className={classes.formContained}>
              {/* SIGN IN LABEL */}
              <Box display='flex' className={classes.signinBtn}>
                <PersonIcon></PersonIcon>
                <Typography className='label'>Sign in</Typography>
              </Box>

              {/* EMAIL or USERNAME INPUT */}
              <Box className={classes.row}>
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item>
                    <EmailIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id='sign-in-input-icon-grid'
                      fullWidth
                      label='Email or Username'
                      value={creds.input}
                      onChange={e => handleValueChanged('input', e.target.value)}
                    />
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
              </Box>

              {/* SUBMIT & FORGOT BUTTON */}
              <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' mt='40px'>
                <Button className={classes.submit} onClick={handleSubmit}>
                  Sign In
                </Button>
                <Box display='flex' mt={2}>
                  <Link href='/forgot-password'>
                    <Typography className={classes.forgotPassword}>Forgot password?</Typography>
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

export default observer(SignIn)
