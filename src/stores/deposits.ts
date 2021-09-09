import { types, flow } from 'mobx-state-tree'
import { getDeposits, makeDeposit, IMakeDepositArgs } from '../apis'

interface ITransactionArgs {
  type?: 'WITHDRAWAL' | 'DEPOSIT' | 'TRANSFER' | 'CONVERT'
  status?: 'PENDING' | 'COMPLETED' | 'PROCESSING'
  coindCode?: 'USDT' | 'ETH' | 'BTC'
  keyWord?: string
  dateFrom?: number | null
  dateTo?: number | null
}

export const Deposit = types.model({
  id: types.optional(types.string, ''),
  username: types.optional(types.string, ''),
  coinCode: types.optional(types.string, ''),
  toUsername: types.optional(types.string, ''),
  amount: types.optional(types.number, 0),
  amountUsdt: types.optional(types.number, 0),
  createdAt: types.optional(types.number, 0),
})

export const Deposits = types
  .model({
    list: types.optional(types.array(Deposit), []),
    openMakeDepositPopup: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, false),
    currentDepositId: types.optional(types.string, ''),
    currentSearch: types.optional(types.string, ''),
    currentRecord: types.optional(types.number, 20),
    currentPage: types.optional(types.number, 0),
    totalPages: types.optional(types.number, 0),
  })
  .views(self => ({
    get currentDeposit() {
      const index = self.list.findIndex(e => e.id === self.currentDepositId)
      return self.list[index]
    },
  }))
  .actions(self => ({
    doFetchDeposits(args?: ITransactionArgs | any) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        self.currentSearch = args
        const skip = self.currentSearch ? 0 : self.currentPage * self.currentRecord
        const res = yield getDeposits({ limit: self.currentRecord, skip }, args)
        if (res && res.data) {
          self.list = res.data.list
          self.totalPages = res.data.count
        }
        self.isLoading = false
        self.currentSearch = ''
      })
      makeFlow()
    },
    doSetCurrentDepositId(id: string) {
      self.currentDepositId = id
    },
    doMakeDeposit(args: IMakeDepositArgs) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield makeDeposit(args)
        self.isLoading = false
        if (res && res.data) {
          //   const index = self.list.findIndex(e => e.id === res.data.userId)
          //   self.list[index].balance = (self.list[index].balance || 0) + args.amount
          self.currentDepositId = ''
        }
      })
      makeFlow()
    },
    doClosePopup() {
      self.currentDepositId = ''
    },
    doUpdateRecord(record: number) {
      self.currentRecord = record
      this.doFetchDeposits(self.currentSearch)
    },
    doReset() {
      self.isLoading = true
      self.currentSearch = ''
      self.currentPage = 0
      this.doFetchDeposits()
    },
    doNext() {
      self.currentPage++
      this.doFetchDeposits(self.currentSearch)
    },
    doPrev() {
      if (self.currentPage) {
        self.currentPage--
        this.doFetchDeposits(self.currentSearch)
      }
    },
  }))
