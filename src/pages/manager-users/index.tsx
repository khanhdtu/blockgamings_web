/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react'
import { observer } from 'mobx'
import { Box, Button } from '@material-ui/core'
import { Layout } from '../../layouts'
import { Table, Action } from '../../components/table'
import { Popup } from '../../components/popup'
import { Search } from '../../components/search'
import { CreateSystemUser } from './create'
import { UpdateSystemUser } from './update'
import { DeleteSystemUser } from './delete'
import { useMst } from '../../stores'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down(600)]: {
      flexDirection: 'column',
    },
  },
}))

export const SystemUsers = (): JSX.Element => {
  const { systemUsers, brands } = useMst()
  const classes = useStyles()

  useEffect(() => {
    systemUsers.doFetch()
  }, [])

  const handleActionChanged = (action: Action) => {
    systemUsers.doSetCurrentId(action.itemId)
    if (action.name === 'delete') {
      systemUsers.doOpenDeletePopup()
    }
    if (action.name === 'edit') {
      systemUsers.doOpenEditPopup()
    }
  }

  return (
    <Layout type='default'>
      {/* HEADER */}
      <Box className={classes.root} display='flex' mt={2} mb={2}>
        <Button className='button lg' variant='contained' color='primary' startIcon={<AddIcon />} onClick={systemUsers.doOpenCreatePopup}>
          Add Brand's Manager
        </Button>
        <Box ml={1}>
          <Search onSearch={e => systemUsers.doSearch(e)} onReset={() => 1} isLoading={systemUsers.isLoading} />
        </Box>
      </Box>
      <Table
        data={systemUsers.list}
        actions={['edit']}
        omit={[
          'brandId',
          'phone',
          'avatar',
          'fullName',
          'address',
          'token',
          'balanceLimit',
          'platformIds',
          'brand',
          'updatedAt',
          'isAdmin',
          'mustChangePassword',
        ]}
        onAction={handleActionChanged}
      />

      {/* POPUP CREATE SYSTEM USER */}
      <Popup
        width={670}
        header={`Create Brand's Manager`}
        open={systemUsers.openCreatePopup}
        isLoading={systemUsers.isLoading}
        onClose={systemUsers.doCloseCreatePopup}
      >
        <CreateSystemUser brands={brands} onCreate={(user: any) => systemUsers.doCreate(user)} onClose={systemUsers.doCloseCreatePopup} />
      </Popup>

      {/* POPUP EDIT SYSTEM USER */}
      <Popup
        width={670}
        header='View / Edit System User'
        open={systemUsers.openEditPopup}
        isLoading={systemUsers.isLoading}
        onClose={systemUsers.doCloseEditPopup}
      >
        <UpdateSystemUser
          systemUser={systemUsers.currentUser}
          brands={brands}
          onUpdate={systemUsers.doCloseEditPopup}
          onClose={systemUsers.doCloseEditPopup}
        />
      </Popup>

      {/* POPUP DELETE SYSTEM USER */}
      <Popup open={systemUsers.openDeletePopup} isLoading={systemUsers.isLoading} width={350}>
        <DeleteSystemUser email={systemUsers.currentUserEmail} onDelete={systemUsers.doDelete} onClose={systemUsers.doCloseDeletePopup} />
      </Popup>
    </Layout>
  )
}

export default observer(SystemUsers)
