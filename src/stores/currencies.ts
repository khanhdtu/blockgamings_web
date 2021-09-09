import { types, flow, Instance } from 'mobx-state-tree'
import { getCurrencies, createCurrency, updateCurrency, deleteCurrency } from '../apis'

export const Currency = types.model({
  id: types.maybeNull(types.string),
  coinCode: types.optional(types.string, ''),
  coinName: types.optional(types.string, ''),
  tokenCode: types.optional(types.string, ''),
  tokenName: types.optional(types.string, ''),
  coinAddress: types.optional(types.string, ''),
  status: types.optional(types.boolean, true),
  withdraw: types.optional(types.boolean, false),
  deposit: types.optional(types.boolean, false),
  transfer: types.optional(types.boolean, false),
  order: types.optional(types.number, 0),
})

export const Currencies = types
  .model({
    list: types.optional(types.array(Currency), []),
    currentId: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false),
    currentPage: types.optional(types.number, 0),
    currentRecord: types.optional(types.number, 20),
    totalPages: types.optional(types.number, 0),
    openCreatePopup: types.optional(types.boolean, false),
    openUpdatePopup: types.optional(types.boolean, false),
    openDeletePopup: types.optional(types.boolean, false),
  })
  .views(self => ({
    get currentCurrency() {
      const index = self.list.findIndex(cur => cur.id === self.currentId)
      return self.list[index]
    },
    get currentCurrencyName() {
      return this.currentCurrency?.coinName
    },
  }))
  .actions(self => ({
    doFetch() {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield getCurrencies({ limit: self.currentRecord, skip: self.currentPage * self.currentRecord })
        if (res && res.data) {
          self.list = res.data
          self.totalPages = res.data.count
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doCreate(currency: Instance<typeof Currency>) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield createCurrency(currency)
        self.isLoading = false
        if (res && res.data) {
          self.list.push(res.data)
          self.openCreatePopup = false
        }
      })
      makeFlow()
    },
    doUpdate(currency: Instance<typeof Currency>) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield updateCurrency(currency)
        self.isLoading = false
        if (res && res.data) {
          const index = self.list.findIndex(cur => cur.id === res.data.id)
          self.list[index] = res.data
          self.openUpdatePopup = false
        }
      })
      makeFlow()
    },
    doDelete() {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield deleteCurrency(self.currentId)
        self.isLoading = false
        if (res && res.data) {
          const index = self.list.findIndex(cur => cur.id === res.data.id)
          self.list.splice(index, 1)
          self.openDeletePopup = false
        }
      })
      makeFlow()
    },
    doSetCurrentId(id: string) {
      self.currentId = id
    },
    doOpenCreatePopup() {
      self.openCreatePopup = true
    },
    doCloseCreatePopup() {
      self.openCreatePopup = false
    },
    doOpenUpdatePopup() {
      self.openUpdatePopup = true
    },
    doCloseUpdatePopup() {
      self.openUpdatePopup = false
    },
    doOpenDeletePopup() {
      self.openDeletePopup = true
    },
    doCloseDeletePopup() {
      self.openDeletePopup = false
    },
    doCloseLoading() {
      self.isLoading = false
    },
    doNext() {
      self.currentPage++
      this.doFetch()
    },
    doPrev() {
      if (self.currentPage) {
        self.currentPage--
        this.doFetch()
      }
    },
  }))
