import { useState } from 'react'
import { Box, Button, Divider, Typography } from '@material-ui/core'
import { Instance } from 'mobx-state-tree'
import { RowInput } from '../../components/rowInput'
import { User, Platforms } from '../../stores'
import { formatFriendlyName } from '../../utils'

export type Payload = {
  key: string
  value: string
}

export type Props = {
  user: Instance<typeof User>
  platforms: Instance<typeof Platforms>
  onUpdate: (creds: any) => void
  onClose: () => void
}

export const Profile = (props: Props): JSX.Element => {
  const { user, onUpdate, onClose } = props
  if (!user) return <></>

  const [creds, setCreds] = useState({
    id: user.id,
    phone: user.phone,
    fullName: user.fullName,
    password: '',
    retypePassword: '',
  })

  return (
    <Box mt={3}>
      <form action='' autoComplete='off'>
        {user.email && <RowInput label='Email' value={user.email} disabled />}
        {user.username && <RowInput label='Username' value={user.username} disabled mt={2} />}
        <RowInput label='Role' value={formatFriendlyName(user.role)} disabled mt={2} />
        <RowInput label='Full Name' value={creds.fullName} onValueChanged={e => setCreds({ ...creds, fullName: e.value })} mt={2} />
        <RowInput label='Phone' value={creds.phone} type='number' onValueChanged={e => setCreds({ ...creds, phone: e.value })} mt={2} />
        <Box mt={3}>
          <Typography variant='h2' color='secondary'>
            Password
          </Typography>
          <Divider />
          <RowInput label='New Password' value={creds.password} onValueChanged={e => setCreds({ ...creds, password: e.value })} mt={2} />
        </Box>
        <Box display='flex' justifyContent='center' mt={3}>
          <Button className='button' variant='contained' color='primary' onClick={() => onUpdate(creds)}>
            Update
          </Button>
          <Button className='button ml' variant='contained' onClick={() => onClose()}>
            Close
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default Profile
