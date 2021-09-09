import { useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { RowInput, ValueChanged } from '../../components/rowInput'

type Creds = {
  email: string
  username: string
}

type Props = {
  onCreate: (user: Creds) => void
  onClose: () => void
}

export const CreateCustomer = (props: Props): JSX.Element => {
  const [user, setUser] = useState<Creds>({
    email: '',
    username: '',
  })

  const handleValueChanged = (payload: ValueChanged) => {
    setUser({ ...user, [payload.key]: payload.value })
  }

  return (
    <Box mt={3}>
      <RowInput label='Email' value={user.email} required onValueChanged={handleValueChanged} mt={2} />
      <RowInput label='Username' value={user.username} required onValueChanged={handleValueChanged} mt={2} />
      <Box display='flex' justifyContent='center' m={5}>
        <Button className='button' color='primary' variant='contained' onClick={() => props.onCreate(user)}>
          Create
        </Button>
        <Button className='button ml' variant='contained' onClick={props.onClose}>
          CANCEL
        </Button>
      </Box>
    </Box>
  )
}

export default CreateCustomer
