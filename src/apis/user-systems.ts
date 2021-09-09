import { AxiosPromise } from 'axios'
import { request } from '../utils'

export const getSystemUsers = (filter?: { limit: number; skip: number }, search = ''): AxiosPromise => {
  if (filter) {
    // eslint-disable-next-line no-console
    console.log(1)
  }
  return request({
    url: 'admin/users/system-users',
    method: 'GET',
    params: {
      // 'filter[limit]': filter.limit,
      // 'filter[skip]': filter.skip,
      search,
    },
  })
}

export interface ICreateManagerUser {
  username: string
  password: string
}

export const createManagerUser = (user: ICreateManagerUser): AxiosPromise => {
  return request({
    url: 'users/system-users',
    method: 'POST',
    data: user,
  })
}

export const updateSystemUser = (data: { id: string }): AxiosPromise => {
  return request({
    url: `users/system-users/${data.id}`,
    method: 'PUT',
    data,
  })
}

export const deleteSystemUser = (id: string): AxiosPromise => {
  return request({
    url: `users/system-users/${id}`,
    method: 'DELETE',
  })
}
