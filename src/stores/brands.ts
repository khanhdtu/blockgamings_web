import { types, flow, Instance } from 'mobx-state-tree'
import { getBrands, getBrand, createBrand, updateBrand, deleteBrand } from '../apis'
import { setCurrentBrand } from '../utils'

export const Brand = types.model({
  id: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
  logo: types.optional(types.string, ''),
  url: types.optional(types.string, ''),
  brandKey: types.optional(types.string, ''),
  publicKey: types.optional(types.string, ''),
  privateKey: types.optional(types.string, ''),
  shortPublicKey: types.optional(types.string, ''),
  updatedAt: types.optional(types.number, 0),
})

export const Brands = types
  .model({
    list: types.optional(types.array(Brand), []),
    myBrand: types.optional(Brand, {}),
    currentId: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false),
    openCreatePopup: types.optional(types.boolean, false),
    openEditPopup: types.optional(types.boolean, false),
    openDeletePopup: types.optional(types.boolean, false),
  })
  .views(self => ({
    get currentBrand() {
      const index = self.list.findIndex(e => e.id === self.currentId)
      return self.list[index]
    },
    get currentBrandName() {
      return this.currentBrand?.name
    },
    get currentBrandId() {
      return self.currentId
    },
  }))
  .actions(self => ({
    doFetch() {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield getBrands()
        if (res && res.data) {
          res.data.map((brand: Instance<typeof Brand>) => {
            brand.shortPublicKey = brand.publicKey.slice(0, 20) + '...'
          })
          self.list = res.data
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doFetchBrand(brandId: string) {
      const makeFlow = flow(function* () {
        const res = yield getBrand(brandId)
        if (res && res.data) {
          self.myBrand = res.data
          setCurrentBrand(res.data)
        }
      })
      makeFlow()
    },
    doCreate(brand: Instance<typeof Brand>) {
      const makeFlow = flow(function* () {
        const res = yield createBrand(brand)
        if (res && res.data) {
          res.data.shortPublicKey = res.data.publicKey.slice(0, 20) + '...'
          self.list.push(res.data)
          self.openCreatePopup = false
        }
      })
      makeFlow()
    },
    doUpdate(brand: Instance<typeof Brand>) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield updateBrand(brand)
        self.isLoading = false
        if (res && res.data) {
          const index = self.list.findIndex(e => e.id === brand.id)
          self.list[index] = res.data
          self.openEditPopup = false
        }
      })
      makeFlow()
    },
    doDelete() {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield deleteBrand(self.currentId)
        self.isLoading = false
        if (res && res.data) {
          const index = self.list.findIndex(e => e.id === self.currentId)
          self.list.splice(index, 1)
          self.openDeletePopup = false
        }
      })
      makeFlow()
    },
    doSearch(filter?: string) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield getBrands(filter)
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
    doSetMyBrand(brand: Instance<typeof Brand>) {
      self.myBrand = brand
      setCurrentBrand(brand)
    },
    doOpenCreatePopup() {
      self.openCreatePopup = true
    },
    doCloseCreatePopup() {
      self.openCreatePopup = false
    },
    doOpenEditPopup() {
      self.openEditPopup = true
    },
    doCloseEditPopup() {
      self.openEditPopup = false
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
    doFindById(brandId: string) {
      const index = self.list.findIndex(e => e.id === brandId)
      return self.list[index]
    },
  }))

export default Brands
