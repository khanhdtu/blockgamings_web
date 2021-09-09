import { types, flow, Instance } from 'mobx-state-tree'
import { getWeeklyAffiliates, getCommissionAffiliates, createAffiliate, updateAffiliate, deleteAffiliate } from '../apis'

export const Affiliate = types.model({
  id: types.maybeNull(types.string),
  username: types.optional(types.string, ''),
  week: types.optional(types.number, 0),
  month: types.optional(types.number, 0),
  year: types.optional(types.number, 0),
  amount: types.optional(types.number, 0),
  type: types.optional(types.string, ''),
  note: types.optional(types.string, ''),
  paid: types.optional(types.boolean, false),
  casinoPv: types.optional(types.number, 0),
  casinoPgv: types.optional(types.number, 0),
  casinoLevel: types.optional(types.number, 0),
  createdAt: types.maybeNull(types.number),
})

export const Affiliates = types
  .model({
    list: types.optional(types.array(Affiliate), []),
    weeklyList: types.optional(types.array(Affiliate), []),
    commissionList: types.optional(types.array(Affiliate), []),
    currentId: types.optional(types.string, ''),
    currentPage: types.optional(types.number, 0),
    currentRecord: types.optional(types.number, 20),
    currentSearch: types.optional(types.string, ''),
    totalPages: types.optional(types.number, 0),
    isLoading: types.optional(types.boolean, true),
    openCreatePopup: types.optional(types.boolean, false),
    openEditPopup: types.optional(types.boolean, false),
    openDeletePopup: types.optional(types.boolean, false),
    affiliateType: types.optional(types.enumeration(['WEEKLY', 'COMMISSION']), 'WEEKLY'),
  })
  .views(self => ({
    get currentAffiliate() {
      const index = self.list.findIndex(e => e.id === self.currentId)
      return self.list[index]
    },
    get currentName() {
      return this.currentAffiliate?.username
    },
  }))
  .actions(self => ({
    doFetchWeekly(search?: string) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        self.currentSearch = search ?? ''
        const res = yield getWeeklyAffiliates({ limit: self.currentRecord, skip: self.currentPage * self.currentRecord }, search)
        if (res && res.data) {
          self.weeklyList = res.data.list
          self.totalPages = res.data.count
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doFetchCommission(search?: string) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        self.currentSearch = search ?? ''
        const res = yield getCommissionAffiliates({ limit: self.currentRecord, skip: self.currentPage * self.currentRecord }, search)
        if (res && res.data) {
          self.commissionList = res.data.list
          self.totalPages = res.data.count
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doCreate(item: Instance<typeof Affiliate>) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield createAffiliate(item)
        self.isLoading = false
        self.openCreatePopup = false
        if (res && res.data) {
          self.list.push(res.data)
        }
      })
      makeFlow()
    },
    doUpdate(item: Instance<typeof Affiliate>) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield updateAffiliate(item)
        self.isLoading = false
        self.openEditPopup = false
        if (res && res.data) {
          const index = self.list.findIndex(e => e.id === res.data.id)
          self.list[index] = res.data
        }
      })
      makeFlow()
    },
    doDelete() {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield deleteAffiliate(self.currentId)
        self.isLoading = false
        if (res && res.data) {
          // const index = self.list.findIndex(e => e.id === self.currentId)
          // self.list.splice(index, 1)
          // self.openDeletePopup = false
        }
      })
      makeFlow()
    },
    doSetAffiliateType(type: 'WEEKLY' | 'COMMISSION') {
      self.affiliateType = type
    },
    // doSearch(filter?: string) {
    //   const makeFlow = flow(function* () {
    //     self.isLoading = true
    //     const res = yield getAffiliates(filter)
    //     self.isLoading = false
    //     if (res && res.data) {
    //       self.list = res.data
    //     }
    //   })
    //   makeFlow()
    // },
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
    doUpdateRecord(record: number) {
      self.currentRecord = record
      if (self.affiliateType === 'WEEKLY') {
        this.doFetchWeekly(self.currentSearch)
      } else {
        this.doFetchCommission(self.currentSearch)
      }
    },
    doNext() {
      self.currentPage++
      if (self.affiliateType === 'WEEKLY') {
        this.doFetchWeekly(self.currentSearch)
      } else {
        this.doFetchCommission(self.currentSearch)
      }
    },
    doPrev() {
      if (self.currentPage) {
        self.currentPage--
        if (self.affiliateType === 'WEEKLY') {
          this.doFetchWeekly(self.currentSearch)
        } else {
          this.doFetchCommission(self.currentSearch)
        }
      }
    },
    doReset() {
      self.currentSearch = ''
      self.currentPage = 0
      self.currentRecord = 20
    },
  }))

export default Affiliates
