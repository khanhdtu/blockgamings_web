import { Profile } from './index'
import { Props } from './types'

export const Default = (props: Props): JSX.Element => {
  return (
    <Profile
      displayName={props.displayName || 'Khanh'}
      role={props.role || 'Sr Fullstack Javascript'}
      avatar={props.avatar || 'temp/avatar.jpg'}
      onLogout={() => alert('Logged out')}
      onOpenProfile={() => alert('OPENED PROFILE')}
    />
  )
}

export default {
  title: 'Components/Profile',
  component: Profile,
  argTypes: {
    avatar: {
      control: {
        type: 'file',
      },
    },
  },
}
