import { Box, Typography, Button } from '@material-ui/core'

export type Props = {
  email: string
  onDelete: () => void
  onClose: () => void
}

export const DeleteRegistration = (props: Props): JSX.Element => {
  return (
    <Box>
      <Typography variant='h1' color='secondary'>
        Reject?
      </Typography>
      <Typography variant='h6' color='secondary'>
        The user has email: <b>{props.email}</b> will not able to become the admin?
      </Typography>
      <Box mt={2}>
        <Button className='button mr' variant='contained' color='primary' onClick={props.onDelete}>
          Yes, reject it!
        </Button>
        <Button className='button' variant='contained' onClick={props.onClose}>
          No, keep it
        </Button>
      </Box>
    </Box>
  )
}

export default DeleteRegistration
