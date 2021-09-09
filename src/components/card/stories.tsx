import { Card } from './index'
import { Props } from './types'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'

export const CardWithTextTitle = (props: Props): JSX.Element => {
  return (
    <Card titleText={props.titleText || 'Total Bets'}>
      <div>Card details</div>
    </Card>
  )
}

export const CardWithIconTitle = (props: Props): JSX.Element => {
  return (
    <Card titleIcon={props.titleIcon || <AccessAlarmIcon />} {...props}>
      <div>Card details</div>
    </Card>
  )
}

export default {
  title: 'Components/Card',
  component: CardWithTextTitle,
}
