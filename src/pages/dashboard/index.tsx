import { useEffect } from 'react'
import { observer } from 'mobx'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import PeopleIcon from '@material-ui/icons/People'
import { makeStyles } from '@material-ui/core/styles'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import { Layout } from '../../layouts'
import { Card } from '../../components/card'
import { LineChart, LineChartProps, DoughnutChart } from '../../components/charts'
import { Dynamic } from '../../components/nossr'
import { Winner } from '../../components/winner'
import { useMst } from '../../stores'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 48,
    color: '#2E384D',
  },
  unix: {
    fontSize: 32,
    color: '#2E384D',
    marginLeft: '10px',
    opacity: 0.6,
  },
  cardItem: {
    width: '24%',
  },
  cardItemContent: {},
  chartWrap: {
    marginTop: 24,
  },
  betChart: {
    width: '36%',
    height: 329,
  },
  payoutChart: {
    width: '32%',
    height: 329,
  },
  betSplitChart: {
    width: '30%',
    height: 329,
  },
  visitorChart: {
    width: 800,
    height: 525,
  },
  warn: {},
  [theme.breakpoints.down(600)]: {
    cardItemWrap: {
      flexDirection: 'column',
    },
    cardItem: {
      width: '100%',
      height: 110,
      marginBottom: 5,
    },
    cardItemContent: {
      display: 'flex',
      alignItems: 'baseline',
    },
    unix: {
      marginLeft: 5,
    },
    warn: {
      marginLeft: 15,
    },
    reach: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    chartWrap: {
      flexDirection: 'column',
      gap: 5,
    },
    betChart: {
      width: '100%',
      height: 285,
    },
    payoutChart: {
      width: '100%',
      height: 285,
    },
    betSplitChart: {
      width: '100%',
    },
    visitorWrap: {
      flexDirection: 'column',
      marginTop: 5,
      gap: 5,
    },
    visitorChart: {
      width: '100%',
      height: 300,
    },
    winners: {
      width: '100%',
    },
  },
  [theme.breakpoints.down(400)]: {
    title: {
      fontSize: 28,
    },
    unix: {
      fontSize: 18,
    },
    betChart: {
      height: 225,
    },
    payoutChart: {
      height: 225,
    },
    betSplitChart: {
      height: 265,
    },
    visitorChart: {
      height: 225,
    },
  },
}))

export const Dashboard = (): JSX.Element => {
  const classes = useStyles()
  const { bets, user } = useMst()

  const uniqueVisitorChart: LineChartProps = {
    labels: ['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22', 'Mar 29', 'Apr 5', 'Apr 12', 'Apr 19', 'Apr 26'],
    data: [
      {
        label: 'Yesterday',
        color: '#8C54FF',
        values: [4, 5, 8, 7, 13, 14, 7, 8, 5, 18],
        type: 'line',
      },
      {
        label: 'Today',
        color: '#2E5BFF',
        values: [8, 12, 10, 15, 24, 23, 16, 13, 16, 17, 29],
        type: 'line',
      },
    ],
  }

  const betOverGameChart: LineChartProps = {
    labels: ['Mon', 'Tue', 'Wed', 'Fri'],
    data: [
      {
        label: 'Black jack',
        color: '#8C54FF',
        values: [55, 40, 48, 80],
        type: 'bar',
      },
      {
        label: 'Today',
        color: '#2E5BFF',
        values: [70, 50, 60, 90],
        type: 'bar',
      },
      {
        label: 'Tomorrow',
        color: '#F7C137',
        values: [75, 52, 62, 92],
        type: 'line',
      },
    ],
  }

  const payoutChart: LineChartProps = {
    labels: ['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22'],
    data: [
      {
        label: 'Yesterday',
        color: '#8C54FF',
        values: [26, 15, 70, 40, 53, 74],
        type: 'line',
      },
      {
        label: 'Today',
        color: '#2E5BFF',
        values: [10, 28, 49, 27, 40, 60],
        type: 'line',
      },
    ],
  }

  const betSplitChart = [
    {
      label: 'Andar Bah',
      value: 60,
      color: '#F7C137',
    },
    {
      label: 'Roulette',
      value: 5,
      color: '#00C1D4',
    },
    {
      label: 'Magic Cards',
      value: 20,
      color: '#8C54FF',
    },
    {
      label: 'Black Jack',
      value: 15,
      color: '#2E5BFF',
    },
  ]

  useEffect(() => {
    if (user.currentUser.role === 'ROLE_MANAGER') {
      bets.doFechWinners()
    }
  }, [])

  return (
    <Dynamic>
      <Layout type='default'>
        <Box className={classes.cardItemWrap} display='flex' justifyContent='space-between' mb={3}>
          <Card className={classes.cardItem} titleText='Total Bets'>
            <Box className={classes.cardItemContent}>
              <span className={classes.title}>456</span>
              <span className={classes.unix}>USD</span>
              <Typography className={classes.warn} color='error'>
                -7.6% SINCE YESTERDAY
              </Typography>
            </Box>
          </Card>
          <Card className={classes.cardItem} titleText='Total Nets'>
            <Box className={classes.cardItemContent}>
              <span className={classes.title}>456</span>
              <span className={classes.unix}>USD</span>
              <Typography className={classes.warn} color='error'>
                -7.6% SINCE YESTERDAY
              </Typography>
            </Box>
          </Card>
          <Card className={clsx(classes.cardItem, classes.reach)} titleIcon={<AccessAlarmIcon />}>
            <Box className={classes.cardItemContent}>
              <span className={classes.title}>14</span>
              <Typography color='secondary' style={{ opacity: 0.6 }}>
                Duration (In mins)
              </Typography>
            </Box>
          </Card>
          <Card className={clsx(classes.cardItem, classes.reach)} titleIcon={<PeopleIcon />}>
            <Box className={classes.cardItemContent}>
              <span className={classes.title}>5</span>
              <Typography color='secondary' style={{ opacity: 0.6 }}>
                No. of Players
              </Typography>
            </Box>
          </Card>
        </Box>

        <Box className={classes.chartWrap} display='flex' justifyContent='space-between' mt={3}>
          <Card className={classes.betChart} titleText='Bet Over Games'>
            <LineChart labels={betOverGameChart.labels} data={betOverGameChart.data} />
          </Card>

          <Card className={classes.payoutChart} titleText='Payout'>
            <LineChart labels={payoutChart.labels} data={payoutChart.data} />
          </Card>

          <Card className={classes.betSplitChart} titleText='Bet Split'>
            <DoughnutChart data={betSplitChart} />
          </Card>
        </Box>

        <Box className={classes.visitorWrap} display='flex' justifyContent='space-between' mt={3}>
          <Card className={classes.visitorChart} titleText='Unique Visitor'>
            <LineChart labels={uniqueVisitorChart.labels} data={uniqueVisitorChart.data} />
          </Card>

          <Card className={classes.winners} titleText='Top 10 Winners' width='calc(100% - 820px)' height={525} scrollable>
            <Box pt={2}>
              {bets.winners.map((winner, i) => (
                <Winner key={winner.username} displayName={winner.username} totalMoney={winner.totalBet} unix={'$'} position={i + 1} />
              ))}
            </Box>
          </Card>
        </Box>
      </Layout>
    </Dynamic>
  )
}

export default observer(Dashboard)
