import { observer } from 'mobx'
import { Dashboard } from './dashboard'

export const Home = (): JSX.Element => <Dashboard />

export default observer(Home)
