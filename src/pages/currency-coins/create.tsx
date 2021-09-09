import { useState } from 'react'
import { Instance } from 'mobx-state-tree'
import { Box, Button } from '@material-ui/core'
import { RowInput, ValueChanged } from '../../components/rowInput'
import { Currency } from '../../stores'

type Props = {
  onCreate: (currency: Instance<typeof Currency>) => void
  onClose: () => void
}

export const CreateCurrency = (props: Props): JSX.Element => {
  const { onCreate, onClose } = props
  const [item, setItem] = useState<Instance<typeof Currency>>({
    id: '',
    coinName: '',
    coinCode: '',
    tokenCode: '',
    tokenName: '',
    coinAddress: '',
    status: false,
    deposit: false,
    withdraw: false,
    transfer: false,
    order: 1,
  })
  const handleValueChanged = (payload: ValueChanged) => setItem({ ...item, [payload.key]: payload.value })
  const handleSubmit = () => onCreate(item)

  return (
    <Box mt={2}>
      <RowInput label='Coin name' id='coinName' value={item.coinName} onValueChanged={handleValueChanged} mt={2} required />
      <RowInput label='Coin code' id='coinCode' value={item.coinCode} onValueChanged={handleValueChanged} mt={2} required />
      <RowInput label='Token code' id='tokenCode' value={item.tokenCode} onValueChanged={handleValueChanged} mt={2} required />
      <RowInput label='Withdraw' checked={item.withdraw} type='checkbox' onValueChanged={handleValueChanged} mt={2} />
      <RowInput label='Deposit' checked={item.deposit} type='checkbox' onValueChanged={handleValueChanged} mt={2} />
      <RowInput label='Transfer' checked={item.transfer} type='checkbox' onValueChanged={handleValueChanged} mt={2} />
      <RowInput label='Order' value={item.order} type='number' onValueChanged={handleValueChanged} mt={2} />
      <Box display='flex' justifyContent='center' m={5}>
        <Button className='button' color='primary' variant='contained' onClick={handleSubmit}>
          Create
        </Button>
        <Button className='button ml' variant='contained' onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  )
}

export default CreateCurrency
