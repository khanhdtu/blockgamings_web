import { types, flow } from 'mobx-state-tree'
import { User } from './user'
import { getWalletAccounts, getTransactions, confirmWithdrawal, makeDeposit, IMakeDepositArgs } from '../apis'

export const Wallet = types.model({
  coin: types.optional(types.string, ''),
  balance: types.optional(types.number, 0),
})

export const Transaction = types.model({
  id: types.optional(types.string, ''),
  username: types.optional(types.string, ''),
  coinCode: types.optional(types.string, ''),
  toUsername: types.optional(types.string, ''),
  amount: types.optional(types.number, 0),
  amountUsdt: types.optional(types.number, 0),
  address: types.optional(types.string, ''),
  status: types.optional(types.enumeration(['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELED', '']), ''),
  createdAt: types.optional(types.number, 0),
})

export interface ITransactionArgs {
  type?: 'WITHDRAWAL' | 'DEPOSIT' | 'TRANSFER' | 'CONVERT'
  status?: 'PENDING' | 'COMPLETED' | 'PROCESSING'
  coindCode?: 'USDT' | 'ETH' | 'BTC'
  keyWord?: string
  dateFrom?: number | null
  dateTo?: number | null
}

export const PaymentManagement = types
  .model({
    wallets: types.optional(types.array(types.compose(User, Wallet)), []),
    // transactions: types.optional(types.array(Transaction), []),
    deposits: types.optional(types.array(Transaction), []),
    withdrawals: types.optional(types.array(Transaction), []),
    transfers: types.optional(types.array(Transaction), []),
    currentTracsactionId: types.optional(types.string, ''),
    currentWalletId: types.optional(types.string, ''),
    openMakeDepositPopup: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, false),
  })
  .views(self => ({
    get currentWithdraw() {
      const index = self.withdrawals.findIndex(e => e.id === self.currentTracsactionId)
      return self.withdrawals[index]
    },
    get currentWallet() {
      const index = self.wallets.findIndex(e => e.id === self.currentWalletId)
      return self.wallets[index]
    },
  }))
  .actions(self => ({
    doFetchWallets(search?: string) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield getWalletAccounts({ limit: 1, skip: 1 }, search)
        if (res && res.data) {
          res.data.list.map((user: any) => {
            if (user.wallets && user.wallets.length) {
              user.coin = user.wallets[0].coinCode.toUpperCase()
              user.balance = user.wallets[0].balance
            }
          })
          self.wallets = res.data.list
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doFetchDeposits(args?: ITransactionArgs | any) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield getTransactions({ ...args, type: 'DEPOSIT' })
        if (res && res.data) {
          self.deposits = res.data.list
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doFetchWithdrawals(args?: ITransactionArgs | any) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield getTransactions({ ...args, type: 'WITHDRAWAL' })
        if (res && res.data) {
          self.withdrawals = res.data.list
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doFetchTransfers(args?: ITransactionArgs | any) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield getTransactions({ ...args, type: 'TRANSFER' })
        if (res && res.data) {
          self.transfers = res.data
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doSetCurrentTransactionId(id: string) {
      self.currentTracsactionId = id
    },
    doSetCurrentWalletId(id: string) {
      self.currentWalletId = id
    },
    doMakeDeposit(args: IMakeDepositArgs) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield makeDeposit(args)
        self.isLoading = false
        if (res && res.data) {
          const index = self.wallets.findIndex(e => e.id === res.data.userId)
          self.wallets[index].balance = (self.wallets[index].balance || 0) + args.amount
          self.currentWalletId = ''
        }
      })
      makeFlow()
    },
    doApproveWithdrawal() {
      const makeFlow = flow(function* () {
        const res = yield confirmWithdrawal({
          transactionId: self.currentTracsactionId,
          approved: true,
        })
        if (res && res.data) {
          const index = self.withdrawals.findIndex(e => e.id === res.data.id)
          self.withdrawals[index].status = 'PROCESSING'
          self.currentTracsactionId = ''
        }
      })
      makeFlow()
    },
    doRejectWithdrawal() {
      const makeFlow = flow(function* () {
        const res = yield confirmWithdrawal({
          transactionId: self.currentTracsactionId,
          approved: false,
        })
        if (res && res.data) {
          const index = self.withdrawals.findIndex(e => e.id === res.data.id)
          self.withdrawals[index].status = 'CANCELED'
          self.currentTracsactionId = ''
        }
      })
      makeFlow()
    },
    doClosePopup() {
      self.currentTracsactionId = ''
      self.currentWalletId = ''
    },
  }))
