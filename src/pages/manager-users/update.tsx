import { useState } from 'react'
import { Instance } from 'mobx-state-tree'
import { Box, Button } from '@material-ui/core'
import { RowInput, SelectValue } from '../../components/rowInput'
import { User, Brands } from '../../stores'

type Props = {
  systemUser: Instance<typeof User>
  brands: Instance<typeof Brands>
  onUpdate: () => void
  onClose: () => void
}

export const UpdateSystemUser = (props: Props): JSX.Element => {
  const { systemUser: user, brands, onUpdate, onClose } = props
  if (!user) return <></>
  const [systemUser, setSystemUser] = useState({
    email: user?.email,
    username: user?.username,
    brandId: user?.brandId,
    role: user?.role,
    password: '',
  })

  const roleSelectOptions = [
    {
      id: 'ROLE_MANAGER',
      value: 'Manager',
    },
  ]

  const mapBrandsToSelectOptions = () => {
    const options: SelectValue[] = []
    brands.list.map(brand => {
      if (brand.id !== 'blockgamings') {
        options.push({ id: brand.id, value: brand.name })
      }
    })
    return options
  }

  return (
    <Box mt={3}>
      <RowInput label='Email or Username' value={systemUser.email || systemUser.username} disabled mt={2} />
      <RowInput
        label='Brand'
        values={mapBrandsToSelectOptions()}
        defaultValue={systemUser.brandId}
        type='select'
        onValueChanged={e => setSystemUser({ ...systemUser, brandId: e.value })}
        mt={2}
      />
      <RowInput
        label='Role'
        values={roleSelectOptions}
        defaultValue={systemUser.role}
        type='select'
        disabled
        onValueChanged={e => setSystemUser({ ...systemUser, role: e.value })}
        mt={2}
      />
      <RowInput label='New Password' value='' mt={2} />
      <RowInput label='Block Account' value='' mt={2} type='checkbox' />
      <Box display='flex' justifyContent='center' m={5}>
        <Button className='button' color='primary' variant='contained' onClick={onUpdate}>
          UPDATE
        </Button>
        <Button className='button ml' variant='contained' onClick={onClose}>
          CANCEL
        </Button>
      </Box>
    </Box>
  )
}

export default UpdateSystemUser
