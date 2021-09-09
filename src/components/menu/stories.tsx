import { Menu } from './index'
import { Props } from './types'

export const Default = (props: Props): JSX.Element => {
  return <Menu {...props} />
}

export default {
  title: 'Components/Menu',
  component: Menu,
  argTypes: {
    logoUrl: {
      control: {
        type: 'file',
      },
    },
  },
}
