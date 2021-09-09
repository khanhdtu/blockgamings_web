import { AxiosPromise } from 'axios'
import { Instance } from 'mobx-state-tree'
import { omit } from 'lodash'
import { Brand } from '../stores'
import { request } from '../utils'

export const getBrands = (filter?: string): AxiosPromise => {
  return request({
    url: '/brands',
    method: 'GET',
    params: { filter },
  })
}

export const getBrand = (brandId: string): AxiosPromise => {
  return request({
    url: `/brands/${brandId}`,
    method: 'GET',
  })
}

export const createBrand = (brand: Instance<typeof Brand>): AxiosPromise => {
  return request({
    url: '/brands',
    method: 'POST',
    data: omit(brand, ['id', 'updatedAt', 'shortPublicKey']),
  })
}

export const updateBrand = (brand: Instance<typeof Brand>): AxiosPromise => {
  return request({
    url: `/brands/${brand.id}`,
    method: 'PUT',
    data: omit(brand, ['updatedAt', 'shortPublicKey']),
  })
}

export const deleteBrand = (id: string): AxiosPromise => {
  return request({
    url: `/brands/${id}`,
    method: 'DELETE',
  })
}
