import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import PersonIcon from '@material-ui/icons/Person'
import FullNameIcon from '@material-ui/icons/AssignmentInd'
import EmailIcon from '@material-ui/icons/Email'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import WebsiteIcon from '@material-ui/icons/Language'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { observer } from 'mobx'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { GoogleRecaptcha } from '../../components/recaptcha'
import { useStyles } from '../sign-in'
import { useMst } from '../../stores'

export const AdminRegistration = (): JSX.Element => {
  const reCaptchaKey = process.env.RECAPTCHA_KEY
  const { user, brands } = useMst()
  const [verified, setVerify] = useState(false)
  const [creds, setCred] = useState({
    input: '',
    fullName: '',
  })
  const classes = useStyles()

  const handleValueChanged = (key: string, value: string) => {
    setCred({ ...creds, [key]: value })
  }

  useEffect(() => {
    brands.doFetch()
    brands.doSetCurrentId('')
  }, [])

  const handleSubmit = () => {
    if (!creds.input || !creds.fullName) return

    if (creds.input.includes('@')) {
      user.doRegisterAdminRequest({ email: creds.input, fullName: creds.fullName, brandId: brands.currentBrandId })
    } else {
      user.doRegisterAdminRequest({ username: creds.input, fullName: creds.fullName, brandId: brands.currentBrandId })
    }
  }

  const renderSelectOptions = () => {
    const items = []

    for (let i = 0; i < brands.list.length; i++) {
      items.push(
        <MenuItem key={brands.list[i]?.id ?? ''} value={brands.list[i]?.id}>
          {brands.list[i]?.name}
        </MenuItem>,
      )
    }

    return (
      <FormControl fullWidth>
        <InputLabel id='sign-in-select-brand' defaultValue={brands.currentBrandId}>
          Choose a brand
        </InputLabel>
        <Select
          labelId='sign-in-select-brand'
          id='sign-in-select-brand'
          onChange={e => brands.doSetCurrentId(e.target.value as string)}
          label={brands.currentBrandName}
          value={brands.currentBrandId}
          defaultValue={brands.currentBrandId}
        >
          {items}
        </Select>
      </FormControl>
    )
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey} language='en' useRecaptchaNet useEnterprise={false}>
      <Box className={classes.root}>
        <Box className={classes.mask}>
          <Box className={classes.view}>
            <Box className={classes.form}>
              <Box className={classes.formContained}>
                {/* HEAD LABEL */}
                <Box display='flex' className={classes.signinBtn}>
                  <PersonIcon></PersonIcon>
                  <Typography className='label'>Admin Registration</Typography>
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
                      <FullNameIcon />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        id='input-with-icon-grid'
                        label='Your full name'
                        value={creds.fullName}
                        onChange={e => handleValueChanged('fullName', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* WEBSITE SELECTION */}
                <Box className={classes.row}>
                  <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item>
                      <WebsiteIcon />
                    </Grid>
                    <Grid item style={{ width: 'calc(100% - 55px)' }}>
                      {renderSelectOptions()}
                    </Grid>
                  </Grid>
                </Box>

                {/* SUBMIT BUTTON */}
                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' mt='40px'>
                  <GoogleRecaptcha onVerified={() => setVerify(true)} />
                  <Button className={verified ? classes.submit : ''} onClick={handleSubmit} disabled={!verified}>
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
      </Box>
    </GoogleReCaptchaProvider>
  )
}

export default observer(AdminRegistration)
