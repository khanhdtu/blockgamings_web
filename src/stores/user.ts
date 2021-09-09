import { types, flow } from 'mobx-state-tree'
import { setCurrentUser, getCurrentUser, deleteCurrentUser, hash, setCurrentBrand, removeCurrentBrand } from '../utils'
import {
  signIn,
  ISignInRequest,
  signUp,
  ISignUpRequest,
  resetPasswordRequest,
  IResetPasswordRequest,
  resetPasswordConfirm,
  IResetPasswordConfirmRequest,
  updateProfile,
  IUpdateProfileRequest,
  registerAdminRequest,
  IRegisterAdminRequest,
  adminRefreshToken,
  IChangePasswordRequest,
  changePassword,
} from '../apis'

export const User = types.model({
  id: types.optional(types.string, ''),
  email: types.optional(types.string, ''),
  username: types.optional(types.string, ''),
  fullName: types.optional(types.string, ''),
  phone: types.optional(types.string, ''),
  role: types.optional(types.enumeration(['ROLE_MANAGER', 'ROLE_ADMIN', 'ROLE_USER']), 'ROLE_MANAGER'),
  status: types.optional(types.enumeration(['ACTIVE', 'PENDING', 'BLOCKED']), 'ACTIVE'),
  token: types.optional(types.string, ''),
  brandId: types.optional(types.string, ''),
  brandName: types.optional(types.string, ''),
  brand: types.optional(types.frozen(), {}),
  isAdmin: types.optional(types.boolean, false),
  mustChangePassword: types.optional(types.boolean, false),
  updatedAt: types.optional(types.number, 0),
  lastAccessAt: types.optional(types.number, 0),
})

export const CurrentUser = types
  .model({
    currentUser: types.optional(User, {}),
    isLoading: types.optional(types.boolean, false),
    changedPassword: types.optional(types.boolean, false),
    openProfilePopup: types.optional(types.boolean, false),
    refreshAt: types.optional(types.number, 0),
  })
  .actions(self => ({
    doGetCurrentUser() {
      const currentUser = getCurrentUser()
      if (currentUser) {
        self.currentUser = currentUser
      } else {
        self.currentUser.token = ''
      }
      return currentUser
    },
    doFetchCurrentUser() {
      const currentUser = getCurrentUser()
      if (currentUser) {
        self.currentUser = currentUser
        return currentUser
      }
      return null
    },
    doUpdateBrandUser(brandId: string) {
      const makeFlow = flow(function* () {
        const res = yield adminRefreshToken(self.currentUser.id, brandId)
        if (res && res.data) {
          const currentUser = getCurrentUser()
          res.data.publicKey = res.data.brand.publicKey
          res.data.brandId = res.data.brand.id
          if (res.data.role === 'ROLE_ADMIN') {
            res.data.isAdmin = true
          }
          self.currentUser = res.data
          setCurrentUser({ ...currentUser, ...res.data })
          setCurrentBrand(res.data.brand)
          window.location.href = `/${brandId}/dashboard`
        }
      })
      makeFlow()
    },
    doSignIn(params: ISignInRequest) {
      const makeFlow = flow(function* () {
        const res = yield signIn({
          email: params.email,
          username: params.username,
          password: params.password,
          brandId: params.brandId,
        })
        if (res && res.data) {
          res.data.publicKey = res.data.brand.publicKey
          res.data.brandId = res.data.brand.id
          if (res.data.role === 'ROLE_ADMIN') {
            res.data.isAdmin = true
          }
          self.currentUser = res.data
          setCurrentUser(res.data)
        }
      })
      makeFlow()
    },
    doSignUp(params: ISignUpRequest) {
      const makeFlow = flow(function* () {
        yield signUp(params)
      })
      makeFlow()
    },
    doUpdateProfile(params: IUpdateProfileRequest) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        if (params.password) {
          params.password = hash(params.password, getCurrentUser().brand.publicKey)
        }
        const res = yield updateProfile(params)
        if (res && res.data) {
          self.isLoading = false
          self.currentUser.phone = params.phone.toString()
          self.currentUser.fullName = params.fullName
          self.openProfilePopup = false
          setCurrentUser({
            ...getCurrentUser(),
            fullName: self.currentUser.fullName,
            phone: self.currentUser.phone,
          })
        }
      })
      makeFlow()
    },
    doSignOut() {
      deleteCurrentUser()
      removeCurrentBrand()
    },
    doChangePassword(params: IChangePasswordRequest) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield changePassword(params)
        if (res && res.data) {
          self.currentUser.mustChangePassword = false
        }
        self.currentUser = { ...self.currentUser }
        setCurrentUser(self.currentUser)
        self.isLoading = false
      })
      makeFlow()
    },
    doResetPasswordRequest(params: IResetPasswordRequest) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        yield resetPasswordRequest(params)
        self.isLoading = false
      })
      makeFlow()
    },
    doResetPasswordConfirm(params: IResetPasswordConfirmRequest) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        yield resetPasswordConfirm(params)
        self.isLoading = false
      })
      makeFlow()
    },
    doRegisterAdminRequest(params: IRegisterAdminRequest) {
      const makeFlow = flow(function* () {
        yield registerAdminRequest(params)
      })
      makeFlow()
    },
    doOpenProfilePopup() {
      self.openProfilePopup = true
    },
    doCloseProfilePopup() {
      self.openProfilePopup = false
    },
    doResetRefreshAt(miliseconds: number) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(miliseconds)
        }, miliseconds)
      })
    },
  }))

export default User
