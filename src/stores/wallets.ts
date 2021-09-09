import { types, flow } from 'mobx-state-tree'
import { User } from './user'
import { getWalletAccounts, makeDeposit, IMakeDepositArgs } from '../apis'

export const Wallet = types.model({
  coin: types.optional(types.string, ''),
  balance: types.optional(types.number, 0),
})

export const Wallets = types
  .model({
    list: types.optional(types.array(types.compose(User, Wallet)), []),
    openMakeDepositPopup: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, false),
    currentWalletId: types.optional(types.string, ''),
    currentSearch: types.optional(types.string, ''),
    currentPage: types.optional(types.number, 0),
    currentRecord: types.optional(types.number, 20),
    totalPages: types.optional(types.number, 0),
  })
  .views(self => ({
    get currentWallet() {
      const index = self.list.findIndex(e => e.id === self.currentWalletId)
      return self.list[index]
    },
  }))
  .actions(self => ({
    doFetchWallets(search = '') {
      const makeFlow = flow(function* () {
        self.isLoading = true
        self.currentSearch = search
        const limit = self.currentRecord
        const skip = search ? 0 : self.currentPage * self.currentRecord
        const res = yield getWalletAccounts({ limit, skip }, search)
        if (res && res.data) {
          res.data.list.map((user: any) => {
            if (user.wallets && user.wallets.length) {
              user.coin = user.wallets[0].coinCode.toUpperCase()
              user.balance = user.wallets[0].balance
            }
          })
          self.list = res.data.list
          self.totalPages = res.data.count
        }
        self.currentSearch = ''
        self.isLoading = false
      })
      makeFlow()
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
          const index = self.list.findIndex(e => e.id === res.data.userId)
          self.list[index].balance = (self.list[index].balance || 0) + args.amount
          self.currentWalletId = ''
        }
      })
      makeFlow()
    },
    doClosePopup() {
      self.currentWalletId = ''
    },
    doChangeRecord(record: number) {
      self.currentRecord = record
      this.doFetchWallets(self.currentSearch)
    },
    doReset() {
      self.isLoading = true
      self.currentSearch = ''
      self.currentPage = 0
      this.doFetchWallets()
    },
    doNext() {
      self.currentPage++
      this.doFetchWallets(self.currentSearch)
    },
    doPrev() {
      if (self.currentPage) {
        self.currentPage--
        this.doFetchWallets(self.currentSearch)
      }
    },
  }))
