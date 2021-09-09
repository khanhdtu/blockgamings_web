import { useEffect } from 'react'
import { observer } from 'mobx'
import { Box } from '@material-ui/core'
import { Layout } from '../../../layouts'
import { Table, Action } from '../../../components/table'
import { Search } from '../../../components/search'
import { Popup } from '../../../components/popup'
import { useMst } from '../../../stores'
import { Deposit } from './deposit'

export const Wallets = (): JSX.Element => {
  const { wallets } = useMst()

  useEffect(() => {
    wallets.doFetchWallets()
  }, [])

  const handleActionChanged = (action: Action) => {
    wallets.doSetCurrentWalletId(action.itemId)
  }

  return (
    <Layout type='default'>
      {/* HEADER */}
      <Box display='flex' mt={2} mb={2}>
        <Box ml={1}>
          <Search onSearch={wallets.doFetchWallets} onReset={wallets.doReset} isLoading={wallets.isLoading} />
        </Box>
      </Box>
      <Table
        data={wallets.list}
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
          'status',
          'isAdmin',
          'mustChangePassword',
        ]}
        sortBy='lastAccessAt'
        actions={['deposit']}
        currentPage={wallets.currentPage}
        currentRecord={wallets.currentRecord}
        totalPages={wallets.totalPages}
        onAction={handleActionChanged}
        onNext={wallets.doNext}
        onPrevious={wallets.doPrev}
        onRecord={wallets.doChangeRecord}
      />
      <Popup width={480} open={wallets.currentWalletId.length > 0} header='Deposit' onClose={wallets.doClosePopup}>
        <Deposit walletAccount={wallets.currentWallet} onConfirm={wallets.doMakeDeposit} onCancel={wallets.doClosePopup} />
      </Popup>
    </Layout>
  )
}

export default observer(Wallets)
