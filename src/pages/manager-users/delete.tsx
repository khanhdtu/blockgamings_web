import { Box, Typography, Button } from '@material-ui/core'

export type Props = {
  email: string
  onDelete: () => void
  onClose: () => void
}

export const DeleteSystemUser = (props: Props): JSX.Element => {
  return (
    <Box>
      <Typography variant='h1' color='secondary'>
        Are you sure?
      </Typography>
      <Typography variant='h6' color='secondary'>
        You will not able to recover the system user has email: <b>{props.email}</b>
      </Typography>
      <Box mt={2}>
        <Button className='button mr' variant='contained' color='primary' onClick={props.onDelete}>
          Yes, delete it!
        </Button>
        <Button className='button' variant='contained' onClick={props.onClose}>
          No, keep it
        </Button>
      </Box>
    </Box>
  )
}

export default DeleteSystemUser
