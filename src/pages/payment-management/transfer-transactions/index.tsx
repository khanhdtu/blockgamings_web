import { useEffect } from 'react'
import { observer } from 'mobx'
import { Layout } from '../../../layouts'
import { Table } from '../../../components/table'
import { SearchWithOptions } from '../../../components/searchWithOptions'
import { useMst } from '../../../stores'
import Box from '@material-ui/core/Box'

export const CustomerTransfers = (): JSX.Element => {
  const { transfers } = useMst()

  useEffect(() => {
    transfers.doFetch()
  }, [])

  return (
    <Layout type='default'>
      <SearchWithOptions onSearch={transfers.doFetch} onReset={transfers.doReset} isLoading={transfers.isLoading} />
      <Box mt={2}>
        <Table
          data={transfers.transfers}
          omit={['amountUsdt', 'address', 'status']}
          totalPages={transfers.totalPages}
          currentPage={transfers.currentPage}
          currentRecord={transfers.currentRecord}
          onRecord={transfers.doUpdateRecord}
          onNext={transfers.doNext}
          onPrevious={transfers.doPrev}
          // onAction={handleActionChanged}
        />
      </Box>
    </Layout>
  )
}

export default observer(CustomerTransfers)
