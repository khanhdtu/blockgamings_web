import { Layout } from '../layouts'
import Box from '@material-ui/core/Box'
export const NotFoundPage = (): JSX.Element => {
  return (
    <Layout type='default'>
      <Box mt={3}>The page could not be found!</Box>
    </Layout>
  )
}

export default NotFoundPage
