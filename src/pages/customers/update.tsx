import { useState } from 'react'
import { Instance } from 'mobx-state-tree'
import { Box, Button, Typography } from '@material-ui/core'
import { RowInput, ValueChanged } from '../../components/rowInput'
import { User } from '../../stores'
import { omit } from 'lodash'

type Props = {
  customer: Instance<typeof User>
  onUpdate: (customer: Instance<typeof User>) => void
  onClose: () => void
}

export const UpdateCustomer = (props: Props): JSX.Element => {
  const { customer, onUpdate, onClose } = props
  if (!customer) return <></>
  const [creds, setCreds] = useState<Instance<typeof User>>(customer)

  const handleSubmit = () => {
    const payload = omit(creds, ['balanceLimit']) as Instance<typeof User>
    onUpdate(payload)
  }

  const handleValueChanged = (payload: ValueChanged) => {
    if (payload.key === 'block account') {
      setCreds({ ...creds, status: payload.value ? 'BLOCKED' : 'ACTIVE' })
    } else {
      setCreds({ ...creds, [payload.key]: payload.value })
    }
  }

  return (
    <Box mt={3}>
      <RowInput label='Email' value={creds.email} disabled />
      <RowInput label='Username' value={creds.username} disabled mt={2} />
      <RowInput label='Phone' value={creds.phone} onValueChanged={handleValueChanged} disabled mt={2} />
      <RowInput label='Block Account' checked={creds.status === 'BLOCKED'} type='checkbox' onValueChanged={handleValueChanged} mt={2} />
      {/* UPDATE Password */}
      <Box mt={4}>
        <Typography variant='h1' color='secondary'>
          Update Password
        </Typography>
      </Box>
      <RowInput label='Password' value='' type='password' mt={2} />
      <Box display='flex' justifyContent='center' m={5}>
        <Button className='button' color='primary' variant='contained' onClick={handleSubmit}>
          UPDATE
        </Button>
        <Button className='button ml' variant='contained' onClick={onClose}>
          CANCEL
        </Button>
      </Box>
    </Box>
  )
}

export default UpdateCustomer
