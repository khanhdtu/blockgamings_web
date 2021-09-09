import { types, flow } from 'mobx-state-tree'
import { getTransfers } from '../apis'

interface ITransactionArgs {
  status?: 'PENDING' | 'COMPLETED' | 'PROCESSING'
  coindCode?: 'USDT' | 'ETH' | 'BTC'
  keyWord?: string
  dateFrom?: number | null
  dateTo?: number | null
}

export const Transfer = types.model({
  id: types.optional(types.string, ''),
  username: types.optional(types.string, ''),
  coinCode: types.optional(types.string, ''),
  toUsername: types.optional(types.string, ''),
  amount: types.optional(types.number, 0),
  amountUsdt: types.optional(types.number, 0),
  code: types.optional(types.string, ''),
  fee: types.optional(types.number, 0),
  createdAt: types.optional(types.number, 0),
})

export const Transfers = types
  .model({
    transfers: types.optional(types.array(Transfer), []),
    currentId: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false),
    currentRecord: types.optional(types.number, 20),
    currentPage: types.optional(types.number, 0),
    currentSearch: types.optional(types.string, ''),
    totalPages: types.optional(types.number, 0),
  })
  .views(self => ({
    get currentTransfer() {
      const index = self.transfers.findIndex(e => e.id === self.currentId)
      return self.transfers[index]
    },
  }))
  .actions(self => ({
    doFetch(args?: ITransactionArgs | any) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        self.currentSearch = args
        const res = yield getTransfers({ limit: self.currentRecord, skip: self.currentPage * self.currentRecord }, args)
        if (res && res.data) {
          self.transfers = res.data.list
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
      this.doFetch(self.currentSearch)
    },
    doReset() {
      self.isLoading = true
      self.currentSearch = ''
      self.currentPage = 0
      this.doFetch()
    },
    doNext() {
      self.currentPage++
      this.doFetch(self.currentSearch)
    },
    doPrev() {
      if (self.currentPage) {
        self.currentPage--
        this.doFetch(self.currentSearch)
      }
    },
  }))
