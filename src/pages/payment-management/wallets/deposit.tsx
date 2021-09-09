import { useState } from 'react'
import { Box, Button, Input } from '@material-ui/core'
import { IMakeDepositArgs } from '../../../apis'

export type Props = {
  walletAccount: any
  onConfirm: (values: IMakeDepositArgs) => void
  onCancel: () => void
}

export const Deposit = (props: Props): JSX.Element => {
  const { walletAccount, onConfirm, onCancel } = props
  const [amount, setAmount] = useState(0)

  const calcAmountAfter = (amountBefore: number) => {
    const amountAfter = amountBefore + amount
    if (amountAfter) return amountAfter
    return amountBefore
  }

  const handleConfirm = () => {
    onConfirm({
      toUsername: walletAccount.username,
      coinCode: 'USDT',
      amount: amount,
    })
  }

  return (
    <Box>
      <table>
        <tbody>
          <tr>
            <td style={{ minWidth: 150 }}>Username:</td>
            <td>{walletAccount?.username}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{walletAccount?.email}</td>
          </tr>
          <tr>
            <td>Balance before:</td>
            <td>{walletAccount?.balance ?? 0}</td>
          </tr>
          <tr>
            <td>Balance after:</td>
            <td>{calcAmountAfter(walletAccount?.balance ?? 0)}</td>
          </tr>
          <tr>
            <td>Amount:</td>
            <td>
              <Input type='number' onChange={e => setAmount(parseFloat(e.target.value))} />
              USDT
            </td>
          </tr>
        </tbody>
      </table>
      <Box mt={2}>
        <Button className={`${amount ? 'button' : ''} mr`} variant='contained' color='primary' onClick={handleConfirm} disabled={!amount}>
          Confirm
        </Button>
        <Button className='button mr' variant='contained' color='inherit' onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  )
}

export default Deposit
