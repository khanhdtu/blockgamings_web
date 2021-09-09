import { useEffect } from 'react'
import { observer } from 'mobx'
import { Box, Typography } from '@material-ui/core'
import { Layout } from '../../layouts'
import { Table } from '../../components/table'
import { SearchWithOptions } from '../../components/searchWithOptions'
import { useMst } from '../../stores'
import { IBetArgs } from '../../apis'

export const LiveBets = (): JSX.Element => {
  const { bets } = useMst()

  useEffect(() => {
    bets.doFetch()
    bets.doFetchProfits()
  }, [])

  return (
    <Layout type='default'>
      <SearchWithOptions onSearch={e => bets.doFetch(e as IBetArgs)} onReset={bets.doReset} isLoading={bets.isLoading} />

      <Box mt={2} display='flex'>
        <Typography style={{ marginRight: 40 }}>Credit: {bets.profit.credit}</Typography>
        <Typography style={{ marginRight: 40 }}>Debit: {bets.profit.debit}</Typography>
        <Typography style={{ marginRight: 40 }}>Profit: {bets.profit.credit - bets.profit.debit}</Typography>
      </Box>

      <Box mt={2}>
        <Table
          data={bets.list}
          currentPage={bets.currentPage}
          currentRecord={bets.currentRecord}
          totalPages={bets.totalPages}
          onRecord={bets.doUpdateRecord}
          onNext={bets.doNext}
          onPrevious={bets.doPrev}
        />
      </Box>
    </Layout>
  )
}

export default observer(LiveBets)
