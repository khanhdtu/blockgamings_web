import { useEffect } from 'react'
import { observer } from 'mobx'
import { Box, makeStyles } from '@material-ui/core'
import { Layout } from '../../layouts'
import { useMst } from '../../stores'
import { Table, Action } from '../../components/table'
import { Search } from '../../components/search'
import { Popup } from '../../components/popup'
import { ApproveRegistration } from './approve'
import { DeleteRegistration } from './delete'

const useStyles = makeStyles(theme => ({
  search: {
    width: 500,
    [theme.breakpoints.down(900)]: {
      width: '100%',
    },
  },
}))

export const Registrations = (): JSX.Element => {
  const { registrations } = useMst()
  const classes = useStyles()

  useEffect(() => {
    registrations.doFetch()
  }, [])

  const handleActionChanged = (action: Action) => {
    registrations.doSetCurrentId(action.itemId)
    if (action.name === 'delete') {
      registrations.doOpenDeletePopup()
    }
    if (action.name === 'approve') {
      registrations.doOpenApprovePopup()
    }
  }

  return (
    <Layout type='default'>
      {/* HEADER */}
      <Box className={classes.search} mt={2} mb={2}>
        <Search onSearch={registrations.doSearch} onReset={registrations.doSearch} isLoading={registrations.isLoading} />
      </Box>
      <Table
        data={registrations.list}
        omit={[
          'avatar',
          'address',
          'token',
          'brandId',
          'brand',
          'balanceLimit',
          'platformIds',
          'updatedAt',
          'lastAccessAt',
          'mustChangePassword',
        ]}
        actions={['delete', 'approve']}
        onAction={handleActionChanged}
      />
      <Popup width={350} open={registrations.openDeletePopup} isLoading={registrations.isLoading}>
        <DeleteRegistration
          email={registrations.currentUserEmail}
          onDelete={registrations.doReject}
          onClose={registrations.doCloseDeletePopup}
        />
      </Popup>

      <Popup width={350} open={registrations.openApprovePopup} isLoading={registrations.isLoading}>
        <ApproveRegistration
          email={registrations.currentUserEmail}
          onDelete={registrations.doApprove}
          onClose={registrations.doCloseApprovePopup}
        />
      </Popup>
    </Layout>
  )
}

export default observer(Registrations)
