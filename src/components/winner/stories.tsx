import { Winner } from './index'
import { Props } from './types'

export const Default = (props: Props): JSX.Element => {
  return (
    <Winner
      displayName={props.displayName || 'Bebop'}
      avatar={props.avatar || 'temp/avatar.jpg'}
      totalMoney={props.totalMoney || 6432}
      unix={props.unix || '$' || 'usd'}
      position={props.position || 1}
    />
  )
}

export default {
  title: 'Components/Winner',
  component: Winner,
  argTypes: {
    avatar: {
      control: {
        type: 'file',
      },
    },
  },
}
