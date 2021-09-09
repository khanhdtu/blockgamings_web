import { types, flow } from 'mobx-state-tree'
import { getWithdraws } from '../apis'

interface ITransactionArgs {
  status?: 'PENDING' | 'COMPLETED' | 'PROCESSING'
  coindCode?: 'USDT' | 'ETH' | 'BTC'
  keyWord?: string
  dateFrom?: number | null
  dateTo?: number | null
}

export const Withdraw = types.model({
  id: types.optional(types.string, ''),
  username: types.optional(types.string, ''),
  coinCode: types.optional(types.string, ''),
  amount: types.optional(types.number, 0),
  amountUsdt: types.optional(types.number, 0),
  fee: types.optional(types.number, 0),
  tokenCode: types.optional(types.string, ''),
  createdAt: types.optional(types.number, 0),
})

export const Withdraws = types
  .model({
    list: types.optional(types.array(Withdraw), []),
    isLoading: types.optional(types.boolean, false),
    currentId: types.optional(types.string, ''),
    currentRecord: types.optional(types.number, 20),
    currentPage: types.optional(types.number, 0),
    currentSearch: types.optional(types.string, ''),
    totalPages: types.optional(types.number, 0),
  })
  .views(self => ({
    get currentWithdraw() {
      const index = self.list.findIndex(e => e.id === self.currentId)
      return self.list[index]
    },
  }))
  .actions(self => ({
    doFetchWithdraws(args?: ITransactionArgs | any) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        self.currentSearch = args
        const res = yield getWithdraws({ limit: self.currentRecord, skip: self.currentPage }, args)
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
      self.currentId = id
    },
    doClosePopup() {
      self.currentId = ''
    },
    doUpdateRecord(record: number) {
      self.currentRecord = record
      this.doFetchWithdraws(self.currentSearch)
    },
    doReset() {
      self.isLoading = true
      self.currentSearch = ''
      self.currentPage = 0
      this.doFetchWithdraws()
    },
    doNext() {
      self.currentPage++
      this.doFetchWithdraws(self.currentSearch)
    },
    doPrev() {
      if (self.currentPage) {
        self.currentPage--
        this.doFetchWithdraws(self.currentSearch)
      }
    },
  }))
