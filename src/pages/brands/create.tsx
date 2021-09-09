import { useState } from 'react'
import { Instance } from 'mobx-state-tree'
import { Box, Button } from '@material-ui/core'
import { RowInput, ValueChanged } from '../../components/rowInput'
import { Brand } from '../../stores'

type Props = {
  onCreate: (brand: Instance<typeof Brand>) => void
  onClose: () => void
}

export const CreateBrand = (props: Props): JSX.Element => {
  const { onCreate, onClose } = props
  const [brand, setBrand] = useState<Instance<typeof Brand>>({
    id: '',
    name: '',
    logo: '',
    url: '',
    brandKey: '',
    publicKey: '',
    privateKey: '',
    shortPublicKey: '',
    updatedAt: 0,
  })
  let valid = false
  const handleValueChanged = (payload: ValueChanged) => setBrand({ ...brand, [payload.key]: payload.value })

  if (brand.name && brand.url && brand.publicKey && brand.privateKey && brand.brandKey) valid = true

  return (
    <Box mt={3}>
      <RowInput label='Name' value={brand.name} required onValueChanged={handleValueChanged} />
      <RowInput label='URL' value={brand.url ?? ''} required onValueChanged={handleValueChanged} mt={2} />
      <RowInput
        label='Public Key'
        id='publicKey'
        value={brand.publicKey ?? ''}
        type='textarea'
        onValueChanged={handleValueChanged}
        required
        mt={2}
      />
      <RowInput
        label='Private Key'
        id='privateKey'
        value={brand.privateKey ?? ''}
        type='textarea'
        onValueChanged={handleValueChanged}
        required
        mt={2}
      />
      <RowInput
        label='Brand Key'
        id='brandKey'
        value={brand.brandKey ?? ''}
        required
        onValueChanged={handleValueChanged}
        type='textarea'
        mt={2}
      />
      <RowInput
        label='Logo'
        value={brand.logo as any}
        type='file'
        onFileChanged={e => setBrand({ ...brand, logo: e.base64 as any })}
        mt={2}
      />
      <Box display='flex' justifyContent='center' m={5}>
        <Button className={valid ? 'button' : ''} color='primary' variant='contained' disabled={!valid} onClick={() => onCreate(brand)}>
          CREATE
        </Button>
        <Button className='button ml' variant='contained' onClick={onClose}>
          CANCEL
        </Button>
      </Box>
    </Box>
  )
}

export default CreateBrand
