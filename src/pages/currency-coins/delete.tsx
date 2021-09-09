import { Box, Typography, Button } from '@material-ui/core'

export type Props = {
  currencyName: string
  onDelete: () => void
  onClose: () => void
}

export const DeleteCurrency = (props: Props): JSX.Element => {
  const { currencyName, onDelete, onClose } = props
  return (
    <Box>
      <Typography variant='h1' color='secondary'>
        Are you sure?
      </Typography>
      <Typography variant='h6' color='secondary'>
        You will not able to recover the currency has coin name: <b>{currencyName}</b>
      </Typography>
      <Box mt={2}>
        <Button className='button mr' variant='contained' color='primary' onClick={onDelete}>
          Yes, delete it!
        </Button>
        <Button className='button' variant='contained' onClick={onClose}>
          No, keep it
        </Button>
      </Box>
    </Box>
  )
}

export default DeleteCurrency
