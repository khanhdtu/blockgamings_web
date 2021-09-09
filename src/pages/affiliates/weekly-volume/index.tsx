import { useEffect } from 'react'
import { observer } from 'mobx'
import { Box } from '@material-ui/core'
import { Layout } from '../../../layouts'
import { Table, Action } from '../../../components/table'
import { Popup } from '../../../components/popup'
import { Search } from '../../../components/search'
// import { CreateAffiliate } from './create'
// import { UpdateAffiliate } from './update'
// import { DeleteAffiliate } from './delete'
import { useMst } from '../../../stores'
// import AddIcon from '@material-ui/icons/Add'

export const WeeklyAffiliates = (): JSX.Element => {
  const { affiliates } = useMst()

  const handleActionChanged = (action: Action) => {
    affiliates.doSetCurrentId(action.itemId)
    if (action.name === 'delete') {
      affiliates.doOpenDeletePopup()
    }
    if (action.name === 'edit') {
      affiliates.doOpenEditPopup()
    }
  }

  useEffect(() => {
    affiliates.doFetchWeekly()
    affiliates.doCloseLoading()
    affiliates.doSetAffiliateType('WEEKLY')
    return () => affiliates.doReset()
  }, [])

  return (
    <Layout type='default'>
      {/* HEADER */}
      <Box display='flex' mt={2} mb={2}>
        {/* <Button className='button lg' variant='contained' color='primary' startIcon={<AddIcon />} onClick={affiliates.doOpenCreatePopup}>
          Add Affiliate
        </Button> */}
        <Box ml={1}>
          <Search onSearch={affiliates.doFetchWeekly} onReset={() => 1} isLoading={affiliates.isLoading} />
        </Box>
      </Box>
      <Table
        data={affiliates.weeklyList}
        omit={['amount', 'note', 'paid', 'type']}
        onAction={handleActionChanged}
        totalPages={affiliates.totalPages}
        currentPage={affiliates.currentPage}
        currentRecord={affiliates.currentRecord}
        onNext={affiliates.doNext}
        onPrevious={affiliates.doPrev}
        onRecord={affiliates.doUpdateRecord}
      />

      {/* POPUP CREATE Affiliate */}
      <Popup
        width={670}
        header='Create Affiliate'
        open={affiliates.openCreatePopup}
        isLoading={affiliates.isLoading}
        onClose={affiliates.doCloseCreatePopup}
      >
        {/* <CreateAffiliate onCreate={affiliates.doCreate} onClose={affiliates.doCloseCreatePopup} /> */}
      </Popup>

      {/* POPUP EDIT Affiliate */}
      <Popup
        width={670}
        header='View / Edit Affiliate'
        open={affiliates.openEditPopup}
        isLoading={affiliates.isLoading}
        onClose={affiliates.doCloseEditPopup}
      >
        {/* <UpdateAffiliate affiliate={affiliates.currentAffiliate} onUpdate={affiliates.doUpdate} onClose={affiliates.doCloseEditPopup} /> */}
      </Popup>

      {/* POPUP DELETE Affiliate */}
      <Popup open={affiliates.openDeletePopup} isLoading={affiliates.isLoading} width={350}>
        {/* <DeleteAffiliate name={affiliates.currentName} onDelete={affiliates.doDelete} onClose={affiliates.doCloseDeletePopup} /> */}
      </Popup>
    </Layout>
  )
}

export default observer(WeeklyAffiliates)
