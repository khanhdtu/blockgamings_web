import { useEffect } from 'react'
import { observer } from 'mobx'
import { Box, Button, makeStyles } from '@material-ui/core'
import { UpdateCustomer } from './update'
import { CreateCustomer } from './create'
import { DeleteCustomer } from './delete'
import { Layout } from '../../layouts'
import { Table, Action } from '../../components/table'
import { Popup } from '../../components/popup'
import { Search } from '../../components/search'
import { useMst } from '../../stores'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  [theme.breakpoints.down(600)]: {
    search: {
      flexDirection: 'column',
    },
  },
}))

export const Customers = (): JSX.Element => {
  const { customers } = useMst()
  const classes = useStyles()

  useEffect(() => {
    customers.doFetch()
    return () => customers.doReset()
  }, [])

  const handleActionChanged = (action: Action) => {
    customers.doSetCurrentId(action.itemId)
    if (action.name === 'delete') {
      customers.doOpenDeletePopup()
    }
    if (action.name === 'edit') {
      customers.doOpenEditPopup()
    }
  }

  return (
    <Layout type='default'>
      {/* HEADER */}
      <Box className={classes.search} display='flex' mt={2} mb={2}>
        <Button className='button lg' variant='contained' color='primary' startIcon={<AddIcon />} onClick={customers.doOpenCreatePopup}>
          Add new customer
        </Button>
        <Box ml={1}>
          <Search onSearch={customers.doSearch} onReset={customers.doReset} isLoading={customers.isLoading} />
        </Box>
      </Box>
      <Table
        data={customers.list}
        actions={['edit']}
        omit={[
          'phone',
          'token',
          'brandId',
          'brand',
          'brandName',
          'role',
          'address',
          'platformIds',
          'balanceLimit',
          'updatedAt',
          'isAdmin',
          'mustChangePassword',
        ]}
        totalPages={customers.totalPages}
        currentPage={customers.currentPage}
        currentRecord={customers.currentRecord}
        onAction={handleActionChanged}
        onRecord={customers.doUpdateRecord}
        onNext={customers.doNext}
        onPrevious={customers.doPrev}
      />

      {/* POPUP CREATE CUSTOMER */}
      <Popup
        width={670}
        header='Create Customer'
        open={customers.openCreatePopup}
        isLoading={customers.isLoading}
        onClose={customers.doCloseCreatePopup}
      >
        <CreateCustomer onCreate={customers.doCreate} onClose={customers.doCloseCreatePopup} />
      </Popup>

      {/* POPUP EDIT CUSTOMER */}
      <Popup
        width={670}
        scrollable
        header='View / Edit Customer'
        open={customers.openEditPopup}
        isLoading={customers.isLoading}
        onClose={customers.doCloseEditPopup}
      >
        <UpdateCustomer customer={customers.currentUser} onUpdate={customers.doUpdate} onClose={customers.doCloseEditPopup} />
      </Popup>

      {/* POPUP DELETE CUSTOMER */}
      <Popup open={customers.openDeletePopup} isLoading={customers.isLoading} width={350}>
        <DeleteCustomer email={customers.currentUserEmail} onDelete={customers.doDelete} onClose={customers.doCloseDeletePopup} />
      </Popup>
    </Layout>
  )
}

export default observer(Customers)
