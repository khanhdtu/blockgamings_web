import { observer } from 'mobx'
import { Layout } from '../../../layouts'
import { Table } from '../../../components/table'
import { SearchWithOptions } from '../../../components/searchWithOptions'
import Box from '@material-ui/core/Box'

export const Commissions = (): JSX.Element => {
  return (
    <Layout type='default'>
      <SearchWithOptions onSearch={e => alert(JSON.stringify(e))} onReset={() => 1} />
      <Box mt={2}>
        <Table data={[]} />
      </Box>
    </Layout>
  )
}

export default observer(Commissions)
