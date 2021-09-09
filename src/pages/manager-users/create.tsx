import { useState } from 'react'
import { Instance } from 'mobx-state-tree'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { RowInput, ValueChanged } from '../../components/rowInput'
import { User } from '../../stores/user'
import { Brands } from '../../stores/brands'

type Props = {
  systemUser?: Instance<typeof User>
  brands: Instance<typeof Brands>
  onCreate: (user: any) => void
  onClose: () => void
}

export const CreateSystemUser = (props: Props): JSX.Element => {
  const [systemUser, setSystemUser] = useState({
    username: '',
    password: 'Abc123',
    brandId: '',
  })

  const mapBrandsToSelectOptions = () => {
    const options: any = []
    props.brands?.list.map(brand => {
      if (brand.id !== 'blockgamings') {
        options.push({ id: brand.id, value: brand.name })
      }
    })
    return options
  }

  const handleValueChanged = (payload: ValueChanged) => {
    setSystemUser({ ...systemUser, [payload.key]: payload.value })
  }

  return (
    <Box mt={3}>
      <RowInput label='Email or Username' id='username' value={systemUser.username} onValueChanged={handleValueChanged} required mt={2} />
      <RowInput label='Password' value={systemUser.password} onValueChanged={handleValueChanged} required mt={2} disabled />
      <RowInput
        label='Brand'
        type='select'
        id='brandId'
        values={mapBrandsToSelectOptions()}
        defaultValue={systemUser.brandId}
        onValueChanged={handleValueChanged}
        required
        mt={2}
      />
      <Box display='flex' justifyContent='center' m={5}>
        <Button className='button' color='primary' variant='contained' onClick={() => props.onCreate(systemUser)}>
          Create
        </Button>
        <Button className='button ml' variant='contained' onClick={props.onClose}>
          CANCEL
        </Button>
      </Box>
    </Box>
  )
}

export default CreateSystemUser
