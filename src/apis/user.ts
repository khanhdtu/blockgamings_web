import { AxiosPromise } from 'axios'
import { request } from '../utils'

export interface ISignInRequest {
  email?: string
  username?: string
  password: string
  brandId: string
}

export const signIn = (params: ISignInRequest): AxiosPromise<string> => {
  return request({
    url: 'admin/users/login',
    method: 'POST',
    data: params,
  })
}

export interface ISignUpRequest {
  email: string
  username: string
  password: string
  retypePassword: string
  verifyAccountCode: string
}

export const signUp = (params: ISignUpRequest): AxiosPromise<string> => {
  return request({
    url: 'admin/users/verification',
    method: 'POST',
    data: params,
  })
}

export interface IResetPasswordRequest {
  email: string
  username: string
}

export const resetPasswordRequest = (params: IResetPasswordRequest): AxiosPromise<string> => {
  return request({
    url: 'admin/users/reset-password-request',
    method: 'POST',
    data: params,
  })
}

export interface IChangePasswordRequest {
  password: string
  retypePassword: string
}

export const changePassword = (params: IChangePasswordRequest): AxiosPromise<string> => {
  return request({
    url: 'admin/users/change-password',
    method: 'POST',
    data: params,
  })
}

export interface IResetPasswordConfirmRequest {
  password: string
  retypePassword: string
  resetCode: string
}

export const resetPasswordConfirm = (params: IResetPasswordConfirmRequest): AxiosPromise<string> => {
  return request({
    url: 'admin/users/reset-password-confirm',
    method: 'POST',
    data: params,
  })
}

export interface IUpdateProfileRequest {
  id: string
  phone: string
  fullName: string
  password: string
}

export const updateProfile = (params: IUpdateProfileRequest): AxiosPromise => {
  return request({
    url: `admin/users/${params.id}`,
    method: 'PUT',
    data: params,
  })
}

export interface IRegisterAdminRequest {
  email?: string
  username?: string
  fullName: string
  brandId: string
}

export const registerAdminRequest = (params: IRegisterAdminRequest): AxiosPromise => {
  return request({
    url: 'admin/users/admin-registration-request',
    method: 'POST',
    data: params,
  })
}

export const adminRefreshToken = (userId: string, brandId: string): AxiosPromise => {
  return request({
    url: 'admin/users/refresh-token',
    method: 'POST',
    data: { userId, brandId },
  })
}
