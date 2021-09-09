/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ITEMS } from '../constants/items'

export const getCurrentUser = (): any => {
  const user = localStorage.getItem(ITEMS.CURRENT_USER)
  if (user) {
    return JSON.parse(user)
  }
  return null
}

export const setCurrentUser = (user: any): void => {
  return localStorage.setItem(ITEMS.CURRENT_USER, JSON.stringify(user))
}

export const getCurrentBrand = (): any => {
  const brand = localStorage.getItem(ITEMS.CURRENT_BRAND)
  if (brand) {
    return JSON.parse(brand)
  }
  return null
}

export const setCurrentBrand = (brand: any): void => {
  return localStorage.setItem(ITEMS.CURRENT_BRAND, JSON.stringify(brand))
}

export const removeCurrentBrand = (): void => {
  return localStorage.removeItem(ITEMS.CURRENT_BRAND)
}

export const deleteCurrentUser = (): void => {
  return localStorage.removeItem(ITEMS.CURRENT_USER)
}

export const setTableDensePadding = (checked: boolean): void => {
  if (checked) {
    return localStorage.setItem(ITEMS.DENSE_PADDING, new Date().toString())
  }
  return localStorage.removeItem(ITEMS.DENSE_PADDING)
}

export const getTableDensePadding = (): boolean => {
  const found = localStorage.getItem(ITEMS.DENSE_PADDING)
  if (found) return true
  return false
}
