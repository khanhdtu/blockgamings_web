import { Table } from './index'

export const Default = (): JSX.Element => {
  const data: any[] = [
    {
      id: '#2178',
      fullname: 'Player name 1',
      username: 'player1',
      sponsor: 'Master 1',
      liveAmount: '24',
    },
    {
      id: '#2179',
      fullname: 'Player name 2',
      username: 'player2',
      sponsor: 'Master 2',
      liveAmount: '25',
    },
    {
      id: '#2180',
      fullname: 'Player name 3',
      username: 'player3',
      sponsor: 'Master 3',
      liveAmount: '26',
    },
    {
      id: '#2181',
      fullname: 'Player name 4',
      username: 'player4',
      sponsor: 'Master 4',
      liveAmount: '27',
    },
    {
      id: '#2182',
      fullname: 'Player name 5',
      username: 'player5',
      sponsor: 'Master 5',
      liveAmount: '28',
    },
    {
      id: '#2183',
      fullname: 'Player name 6',
      username: 'player6',
      sponsor: 'Master 6',
      liveAmount: '29',
    },
    {
      id: '#2184',
      fullname: 'Player name 7',
      username: 'player7',
      sponsor: 'Master 7',
      liveAmount: '30',
    },
    {
      id: '#2185',
      fullname: 'Player name 8',
      username: 'player8',
      sponsor: 'Master 8',
      liveAmount: '31',
    },
    {
      id: '#2186',
      fullname: 'Player name 9',
      username: 'player9',
      sponsor: 'Master 9',
      liveAmount: '32',
    },
    {
      id: '#2187',
      fullname: 'Player name 10',
      username: 'player10',
      sponsor: 'Master 10',
      liveAmount: '33',
    },
    {
      id: '#2188',
      fullname: 'Player name 11',
      username: 'player11',
      sponsor: 'Master 11',
      liveAmount: '34',
    },
    {
      id: '#2189',
      fullname: 'Player name 12',
      username: 'player12',
      sponsor: 'Master 12',
      liveAmount: '35',
    },
    {
      id: '#2190',
      fullname: 'Player name 13',
      username: 'player13',
      sponsor: 'Master 13',
      liveAmount: '36',
    },
    {
      id: '#2191',
      fullname: 'Player name 14',
      username: 'player14',
      sponsor: 'Master 14',
      liveAmount: '37',
    },
  ]

  return <Table data={data} onAction={e => alert(JSON.stringify(e))} onRecord={e => e} onNext={() => 1} onPrevious={() => 1} />
}

export default {
  title: 'Components/Table',
  component: Table,
}
