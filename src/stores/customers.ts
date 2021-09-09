import { types, flow, Instance } from 'mobx-state-tree'
import { User } from './user'
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../apis'

export const Customers = types
  .model({
    list: types.optional(types.array(User), []),
    currentId: types.optional(types.string, ''),
    currentPage: types.optional(types.number, 0),
    currentRecord: types.optional(types.number, 20),
    totalPages: types.optional(types.number, 0),
    currentSearch: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false),
    openCreatePopup: types.optional(types.boolean, false),
    openEditPopup: types.optional(types.boolean, false),
    openDeletePopup: types.optional(types.boolean, false),
  })
  .views(self => ({
    get currentUser() {
      const index = self.list.findIndex(e => e.id === self.currentId)
      return self.list[index]
    },
    get currentUserEmail() {
      return this.currentUser?.email ?? this.currentUser?.username
    },
  }))
  .actions(self => ({
    doFetch(search?: string) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield getCustomers({ limit: self.currentRecord, skip: self.currentPage * self.currentRecord }, search)
        if (res && res.data) {
          self.list = res.data.list
          self.totalPages = res.data.count
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doCreate(params: { email: string; username: string }) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield createCustomer(params)
        self.isLoading = false
        if (res && res.data) {
          self.list.unshift(res.data)
          self.openCreatePopup = false
        }
      })
      makeFlow()
    },
    doUpdate(customer: Instance<typeof User>) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield updateCustomer(customer)
        self.isLoading = false
        if (res && res.data) {
          const index = self.list.findIndex(cus => cus.id === res.data.id)
          self.list[index] = res.data
          self.openEditPopup = false
        }
      })
      makeFlow()
    },
    doDelete() {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield deleteCustomer(self.currentId)
        self.isLoading = false
        if (res && res.data) {
          const index = self.list.findIndex(e => e.id === self.currentId)
          self.list.splice(index, 1)
          self.openDeletePopup = false
        }
      })
      makeFlow()
    },
    doSearch(search?: string) {
      const makeFlow = flow(function* () {
        self.currentSearch = search ?? ''
        self.isLoading = true
        const res = yield getCustomers({ limit: 20, skip: 0 }, search)
        self.isLoading = false
        if (res && res.data) {
          self.list = res.data.list
        }
        self.currentSearch = ''
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
    doOpenDeletePopup() {
      self.openDeletePopup = true
    },
    doCloseDeletePopup() {
      self.openDeletePopup = false
    },
    doOpenEditPopup() {
      self.openEditPopup = true
    },
    doCloseEditPopup() {
      self.openEditPopup = false
    },
    doOpenLoading() {
      self.isLoading = true
    },
    doCloseLoading() {
      self.isLoading = false
    },
    doReset() {
      self.isLoading = false
      self.openCreatePopup = false
      self.openDeletePopup = false
      self.openEditPopup = false
      self.currentSearch = ''
      self.currentPage = 0
      this.doFetch()
    },
    doUpdateRecord(record: number) {
      self.currentRecord = record
      this.doFetch(self.currentSearch)
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

export default Customers
