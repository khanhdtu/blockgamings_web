import { useState } from 'react'
import { Instance } from 'mobx-state-tree'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { RowInput } from '../../components/rowInput'
import { Brand } from '../../stores'

type Props = {
  brand: Instance<typeof Brand>
  onUpdate: (values: Instance<typeof Brand>) => void
  onClose: () => void
}

export const UpdateBrand = (props: Props): JSX.Element => {
  const [brand, setBrand] = useState<Instance<typeof Brand>>({
    id: props.brand?.id,
    name: props.brand?.name,
    logo: props.brand?.logo,
    url: props.brand?.url,
    publicKey: props.brand?.publicKey,
    privateKey: props.brand?.privateKey,
    brandKey: props.brand?.brandKey,
    shortPublicKey: '',
    updatedAt: 0,
  })

  return (
    <Box mt={3}>
      <RowInput label='Name' value={brand.name} onValueChanged={e => setBrand({ ...brand, [e.key]: e.value })} />
      <RowInput label='URL' value={brand.url ?? ''} onValueChanged={e => setBrand({ ...brand, [e.key]: e.value })} mt={2} />
      <RowInput
        label='Public Key'
        id='publicKey'
        value={brand.publicKey ?? ''}
        onValueChanged={e => setBrand({ ...brand, [e.key]: e.value })}
        type='textarea'
        mt={2}
      />
      <RowInput
        label='Brand Key'
        id='brandKey'
        value={brand.brandKey ?? ''}
        onValueChanged={e => setBrand({ ...brand, [e.key]: e.value })}
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
        <Button className='button' color='primary' variant='contained' onClick={() => props.onUpdate(brand)}>
          UPDATE
        </Button>
        <Button className='button ml' variant='contained' onClick={props.onClose}>
          CANCEL
        </Button>
      </Box>
    </Box>
  )
}

export default UpdateBrand
