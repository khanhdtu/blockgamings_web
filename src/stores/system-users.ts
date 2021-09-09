import { types, flow } from 'mobx-state-tree'
import { User } from './user'
import { getSystemUsers, createManagerUser, deleteSystemUser, ICreateManagerUser } from '../apis'

export const SystemUsers = types
  .model({
    list: types.optional(types.array(User), []),
    currentId: types.optional(types.string, ''),
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
        const res = yield getSystemUsers({ limit: 1, skip: 1 }, search)
        if (res && res.data) {
          res.data.map((e: any) => {
            e.brandName = e.brand.name
          })
          self.list = res.data
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doCreate(user: ICreateManagerUser) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield createManagerUser(user)
        self.isLoading = false
        if (res && res.data) {
          self.list.push(res.data)
          self.openCreatePopup = false
        }
      })
      makeFlow()
    },
    doDelete() {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield deleteSystemUser(self.currentId)
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
        const res = yield getSystemUsers({ limit: 1, skip: 1 }, search)
        self.isLoading = false
        if (res && res.data) {
          self.list = res.data
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
  }))

export default SystemUsers
