import { useEffect } from 'react'
import { observer } from 'mobx'
import { Layout } from '../../../layouts'
import { Table, Action } from '../../../components/table'
import { SearchWithOptions } from '../../../components/searchWithOptions'
// import { Popup } from '../../../components/popup'
// import { ApproveWithdrawal } from './approve'
import { useMst } from '../../../stores'
import Box from '@material-ui/core/Box'

export const Withdrawals = (): JSX.Element => {
  const { withdraws } = useMst()

  useEffect(() => {
    withdraws.doFetchWithdraws()
  }, [])

  const handleActionChanged = (action: Action) => {
    withdraws.doSetCurrentDepositId(action.itemId)
  }

  return (
    <Layout type='default'>
      <SearchWithOptions onSearch={withdraws.doFetchWithdraws} onReset={withdraws.doReset} isLoading={withdraws.isLoading} />
      <Box mt={2}>
        <Table
          data={withdraws.list}
          omit={['toUsername']}
          actions={['approve']}
          totalPages={withdraws.totalPages}
          currentPage={withdraws.currentPage}
          currentRecord={withdraws.currentRecord}
          onAction={handleActionChanged}
          onRecord={withdraws.doUpdateRecord}
          onNext={withdraws.doNext}
          onPrevious={withdraws.doPrev}
        />
      </Box>
    </Layout>
  )
}

export default observer(Withdrawals)
