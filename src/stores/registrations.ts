import { types, flow } from 'mobx-state-tree'
import { User } from './user'
import { getRegistrations, deleteCustomer, adminRegistrationApprove, adminRegistrationReject } from '../apis'

const BrandName = types.model({
  brandName: types.optional(types.string, ''),
})

export const Registrations = types
  .model({
    list: types.optional(types.array(types.compose(User, BrandName)), []),
    currentId: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false),
    openApprovePopup: types.optional(types.boolean, false),
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
        const res = yield getRegistrations({ limit: 1, skip: 1 }, search)
        if (res && res.data) {
          res.data.map((item: any) => {
            item.brandName = item.brand.name
          })
          self.list = res.data
        }
        self.isLoading = false
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
        self.isLoading = true
        const res = yield getRegistrations({ limit: 1, skip: 1 }, search)
        self.isLoading = false
        if (res && res.data) {
          self.list = res.data
        }
      })
      makeFlow()
    },
    doApprove() {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield adminRegistrationApprove(self.currentUser.id)
        self.isLoading = false
        if (res && res.data) {
          const index = self.list.findIndex(e => e.id === res.data)
          self.list.splice(index, 1)
          self.openApprovePopup = false
        }
      })
      makeFlow()
    },
    doReject() {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield adminRegistrationReject(self.currentUser.id)
        self.isLoading = false
        if (res && res.data) {
          const index = self.list.findIndex(e => e.id === res.data)
          self.list.splice(index, 1)
          self.openDeletePopup = false
        }
      })
      makeFlow()
    },
    doSetCurrentId(id: string) {
      self.currentId = id
    },
    doOpenApprovePopup() {
      self.openApprovePopup = true
    },
    doCloseApprovePopup() {
      self.openApprovePopup = false
    },
    doOpenDeletePopup() {
      self.openDeletePopup = true
    },
    doCloseDeletePopup() {
      self.openDeletePopup = false
    },
    doOpenLoading() {
      self.isLoading = true
    },
    doCloseLoading() {
      self.isLoading = false
    },
    doReset() {
      self.isLoading = false
      self.openDeletePopup = false
    },
  }))

export default Registrations
