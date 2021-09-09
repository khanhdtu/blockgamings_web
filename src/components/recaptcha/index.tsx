import React, { useState, useCallback } from 'react'
import { GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Box, Checkbox, makeStyles, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import DoneIcon from '@material-ui/icons/Done'
import { waitForAsync } from '../../utils'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
}))

type Props = {
  onVerified: () => void
}

export const GoogleRecaptcha = (props: Props): JSX.Element => {
  const { onVerified } = props
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [status, setStatus] = useState<'UNVERIFY' | 'VERIFIED' | 'VERIFYING'>('UNVERIFY')
  const classes = useStyles()

  const handleVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return
    }
    setStatus('VERIFYING')
    const result = await executeRecaptcha('DYNAMIC_ACTION')
    await waitForAsync(1500)
    if (result) {
      setStatus('VERIFIED')
      onVerified()
    } else {
      setStatus('UNVERIFY')
    }
  }, [executeRecaptcha])

  return (
    <Box className={classes.root}>
      <Box display='flex' justifyContent='center' alignItems='center' bgcolor='#fff' width={280} p={2} m='auto'>
        {status === 'UNVERIFY' && <Checkbox onClick={handleVerify} />}
        {status === 'VERIFYING' && <CircularProgress size={30} />}
        {status === 'VERIFIED' && <DoneIcon />}
        <Typography className={status !== 'UNVERIFY' ? 'ml' : ''} variant='h6' color='textSecondary'>
          I am not a Robot
        </Typography>
        <img className='ml' width={50} src='icons/captcha.svg' />
      </Box>
      <br />
    </Box>
  )
}

export default GoogleReCaptcha
