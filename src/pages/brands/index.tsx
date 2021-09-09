import { useEffect } from 'react'
import { observer } from 'mobx'
import { Box, Button } from '@material-ui/core'
import { Layout } from '../../layouts'
import { Search } from '../../components/search'
import { Table, Action } from '../../components/table'
import { Popup } from '../../components/popup'
import { useMst } from '../../stores'
import { CreateBrand } from './create'
import { UpdateBrand } from './update'
import { DeleteBrand } from './delete'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  wrap: {
    [theme.breakpoints.down(600)]: {
      flexDirection: 'column',
    },
  },
}))

export const UserBrands = (): JSX.Element => {
  const { brands, user } = useMst()
  const classes = useStyles()

  useEffect(() => {
    brands.doFetch()
    brands.doCloseLoading()
  }, [])

  const handleActionChanged = (action: Action) => {
    brands.doSetCurrentId(action.itemId)
    if (action.name === 'edit') {
      brands.doOpenEditPopup()
    }
    if (action.name === 'redirect') {
      user.doUpdateBrandUser(action.itemId)
    }
  }

  return (
    <Layout type='default'>
      <Box className={classes.wrap} display='flex' mt={2} mb={2}>
        <Button className='button lg' variant='contained' color='primary' startIcon={<AddIcon />} onClick={brands.doOpenCreatePopup}>
          Add new brand
        </Button>
        <Box ml={1}>
          <Search onSearch={brands.doSearch} onReset={brands.doSearch} isLoading={brands.isLoading} />
        </Box>
      </Box>

      <Table data={brands.list} actions={['edit', 'redirect']} onAction={handleActionChanged} omit={['publicKey', 'privateKey']} />

      {/* POPUP CREATE BRAND */}
      <Popup
        width={670}
        header='Create Brand'
        open={brands.openCreatePopup}
        isLoading={brands.isLoading}
        onClose={brands.doCloseCreatePopup}
      >
        <CreateBrand onCreate={brands.doCreate} onClose={brands.doCloseCreatePopup} />
      </Popup>

      {/* POPUP UPDATE BRAND */}
      <Popup width={670} header='Update Brand' open={brands.openEditPopup} isLoading={brands.isLoading} onClose={brands.doCloseEditPopup}>
        <UpdateBrand brand={brands.currentBrand} onUpdate={brands.doUpdate} onClose={brands.doCloseEditPopup} />
      </Popup>

      {/* POPUP DELETE BRAND */}
      <Popup open={brands.openDeletePopup} isLoading={brands.isLoading} width={350}>
        <DeleteBrand name={brands.currentBrandName} onDelete={brands.doDelete} onClose={brands.doCloseDeletePopup} />
      </Popup>
    </Layout>
  )
}

export default observer(UserBrands)
