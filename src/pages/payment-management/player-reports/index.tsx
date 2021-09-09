import { observer } from 'mobx'
import { Layout } from '../../../layouts'
import { Table } from '../../../components/table'
import { SearchWithOptions } from '../../../components/searchWithOptions'
import Box from '@material-ui/core/Box'

export const PlayerReports = (): JSX.Element => {
  const temp_reports = [
    {
      id: '1',
      name: 'Huỳnh Thị Mỹ',
      platform: 'Medialive',
      debit: '40',
      credit: '0',
      profit: '40',
      currency: 'USD',
      date: 1619772565469,
    },
    {
      id: '2',
      name: 'Nguyễn Mỹ Vân',
      platform: 'Medialive',
      debit: '8',
      credit: '4',
      profit: '60',
      currency: 'USD',
      date: 1619772565469,
    },
    {
      id: '3',
      name: 'Huyền Anh',
      platform: 'Ezugi',
      debit: '864',
      credit: '764.05',
      profit: '-4',
      currency: 'USD',
      date: 1619772565469,
    },
    {
      id: '34',
      name: 'Nguyetdoan999',
      platform: 'Ezugi',
      debit: '13670',
      credit: '10939.4',
      profit: '2730.6000000',
      currency: 'USD',
      date: 1619772565469,
    },
  ]
  return (
    <Layout type='default'>
      <SearchWithOptions onSearch={e => alert(JSON.stringify(e))} onReset={() => 1} />
      <Box mt={2}>
        <Table data={temp_reports} />
      </Box>
    </Layout>
  )
}

export default observer(PlayerReports)
