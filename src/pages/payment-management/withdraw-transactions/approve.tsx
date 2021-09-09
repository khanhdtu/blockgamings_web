import { Box, Button } from '@material-ui/core'
import { Instance } from 'mobx-state-tree'
import { format } from 'date-fns'
import { Withdraw } from '../../../stores'

export type Props = {
  transaction: Instance<typeof Withdraw>
  onApprove: () => void
  onReject: () => void
}

export const ApproveWithdrawal = (props: Props): JSX.Element => {
  const { transaction, onApprove, onReject } = props
  return (
    <Box>
      <table>
        <tbody>
          <tr>
            <td style={{ minWidth: 150 }}>User:</td>
            <td>{transaction?.username}</td>
          </tr>
          <tr>
            <td>Transaction type:</td>
            <td>Withdrawal</td>
          </tr>
          <tr>
            <td>Total amount:</td>
            <td>
              <b>{transaction?.amount}</b> ({transaction?.coinCode})
            </td>
          </tr>
          <tr>
            <td>Total recieve:</td>
            <td>
              <b>{transaction?.amountUsdt}</b> (USDT)
            </td>
          </tr>
          {/* <tr>
            <td>Address:</td>
            <td>{transaction?.address}</td>
          </tr> */}
          <tr>
            <td>Created at:</td>
            <td>{format(transaction?.createdAt ?? 0, 'yyyy-MM-dd hh:mm')}</td>
          </tr>
        </tbody>
      </table>
      <Box mt={2}>
        <Button className='button mr' variant='contained' color='primary' onClick={onApprove}>
          Approve
        </Button>
        <Button className='button mr' variant='contained' color='inherit' onClick={onReject}>
          Reject
        </Button>
      </Box>
    </Box>
  )
}

export default ApproveWithdrawal
