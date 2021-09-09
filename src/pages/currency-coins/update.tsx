import { useState } from 'react'
import { Instance } from 'mobx-state-tree'
import { Box, Button } from '@material-ui/core'
import { RowInput, ValueChanged } from '../../components/rowInput'
import { Currency } from '../../stores'

type Props = {
  currency: Instance<typeof Currency>
  onUpdate: (currency: Instance<typeof Currency>) => void
  onClose: () => void
}

export const UpdateCurrency = (props: Props): JSX.Element => {
  const { currency, onUpdate, onClose } = props
  const [item, setItem] = useState<Instance<typeof Currency>>(currency)
  const handleValueChanged = (payload: ValueChanged) => setItem({ ...item, [payload.key]: payload.value })
  const handleSubmit = () => onUpdate(item)

  if (!item) return <></>
  return (
    <Box mt={2}>
      <RowInput label='Coin name' id='coinName' value={item.coinName} mt={2} />
      <RowInput label='Coin code' id='coinCode' value={item.coinCode} onValueChanged={handleValueChanged} mt={2} />
      <RowInput label='Token code' id='tokenCode' value={item.tokenCode} onValueChanged={handleValueChanged} mt={2} />
      <RowInput label='Withdraw' checked={item.withdraw} type='checkbox' onValueChanged={handleValueChanged} mt={2} />
      <RowInput label='Deposit' checked={item.deposit} type='checkbox' onValueChanged={handleValueChanged} mt={2} />
      <RowInput label='Transfer' checked={item.transfer} type='checkbox' onValueChanged={handleValueChanged} mt={2} />
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

export default UpdateCurrency
