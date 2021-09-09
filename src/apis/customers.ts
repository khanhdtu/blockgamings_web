import { AxiosPromise } from 'axios'
import { Instance } from 'mobx-state-tree'
import { User } from '../stores'
import { request } from '../utils'

export const getCustomers = (filter: { limit: number; skip: number }, search = ''): AxiosPromise => {
  return request({
    url: 'users/customers',
    method: 'GET',
    params: {
      'filter[limit]': filter.limit,
      'filter[skip]': filter.skip,
      search,
    },
  })
}

interface ICreateCustomer {
  email: string
  username: string
}
export const createCustomer = (params: ICreateCustomer): AxiosPromise => {
  return request({
    url: 'users/customers',
    method: 'POST',
    data: params,
  })
}

export const updateCustomer = (params?: Instance<typeof User>): AxiosPromise => {
  return request({
    url: `users/customers/${params?.id}`,
    method: 'PUT',
    data: params,
  })
}

export const deleteCustomer = (id: string): AxiosPromise => {
  return request({
    url: `users/customers/${id}`,
    method: 'DELETE',
  })
}
