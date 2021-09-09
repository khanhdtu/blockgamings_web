import { useEffect } from 'react'
import { observer } from 'mobx'
import { Box } from '@material-ui/core'
import { Layout } from '../../layouts'
import { Table, Action } from '../../components/table'
import { useMst } from '../../stores'

export const Currencies = (): JSX.Element => {
  const { currencies } = useMst()

  useEffect(() => {
    currencies.doFetch()
  }, [currencies.isLoading])

  const handleActionChanged = (action: Action) => {
    currencies.doSetCurrentId(action.itemId)
    if (action.name === 'edit') {
      currencies.doOpenUpdatePopup()
    }
    if (action.name === 'delete') {
      currencies.doOpenDeletePopup()
    }
  }

  return (
    <Layout type='default'>
      <Box mb={2} />
      <Table
        data={currencies.list}
        omit={['order', 'coinName', 'tokenName']}
        onAction={handleActionChanged}
        currentRecord={currencies.currentRecord}
        currentPage={currencies.currentPage}
        totalPages={currencies.totalPages}
        onNext={currencies.doNext}
        onPrevious={currencies.doPrev}
      />

      {/* CREATE CURRENCY POPUP */}
      {/* <Popup
        width={670}
        open={currencies.openCreatePopup}
        header='Create Currency'
        isLoading={currencies.isLoading}
        onClose={currencies.doCloseCreatePopup}
      >
        <CreateCurrency onCreate={currencies.doCreate} onClose={currencies.doCloseCreatePopup} />
      </Popup> */}

      {/* UPDATE CURRENCY POPUP */}
      {/* <Popup
        width={670}
        open={currencies.openUpdatePopup}
        header='Update Currency'
        isLoading={currencies.isLoading}
        onClose={currencies.doCloseUpdatePopup}
      >
        <UpdateCurrency currency={currencies.currentCurrency} onUpdate={currencies.doUpdate} onClose={currencies.doCloseUpdatePopup} />
      </Popup> */}

      {/* DELETE CURRENCY POPUP */}
      {/* <Popup width={350} open={currencies.openDeletePopup} isLoading={currencies.isLoading} onClose={currencies.doCloseDeletePopup}>
        <DeleteCurrency
          currencyName={currencies.currentCurrencyName}
          onDelete={currencies.doDelete}
          onClose={currencies.doCloseDeletePopup}
        />
      </Popup> */}
    </Layout>
  )
}

export default observer(Currencies)
