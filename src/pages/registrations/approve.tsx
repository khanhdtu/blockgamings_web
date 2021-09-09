import { Box, Typography, Button } from '@material-ui/core'

type Props = {
  email: string
  onDelete: () => void
  onClose: () => void
}

export const ApproveRegistration = (props: Props): JSX.Element => {
  const { email, onDelete, onClose } = props

  return (
    <Box>
      <Typography variant='h1' color='secondary'>
        Confirmation
      </Typography>
      <Typography variant='h6' color='secondary'>
        Approve the admin registration of customer has email <b>{email}</b>?
      </Typography>
      <Box mt={2}>
        <Button className='button mr' variant='contained' color='primary' onClick={onDelete}>
          Yes, approve it
        </Button>
        <Button className='button' variant='contained' onClick={onClose}>
          No, keep it
        </Button>
      </Box>
    </Box>
  )
}

export default ApproveRegistration
