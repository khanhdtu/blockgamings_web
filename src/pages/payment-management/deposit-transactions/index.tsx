import { useEffect } from 'react'
import { observer } from 'mobx'
import { Layout } from '../../../layouts'
import { Table } from '../../../components/table'
import { SearchWithOptions } from '../../../components/searchWithOptions'
import { useMst } from '../../../stores'
import Box from '@material-ui/core/Box'

export const DepositWithdraw = (): JSX.Element => {
  const { deposits } = useMst()

  useEffect(() => {
    deposits.doFetchDeposits()
  }, [])

  return (
    <Layout type='default'>
      <SearchWithOptions onSearch={deposits.doFetchDeposits} onReset={deposits.doReset} isLoading={deposits.isLoading} />
      <Box mt={2}>
        <Table
          data={deposits.list}
          omit={['toUsername']}
          totalPages={deposits.totalPages}
          currentPage={deposits.currentPage}
          currentRecord={deposits.currentRecord}
          onRecord={deposits.doUpdateRecord}
          onPrevious={deposits.doPrev}
          onNext={deposits.doNext}
        />
      </Box>
    </Layout>
  )
}

export default observer(DepositWithdraw)
