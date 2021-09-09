import { AxiosPromise } from 'axios'
import { request } from '../utils'

export const getRegistrations = (filter: { limit: number; skip: number }, search = ''): AxiosPromise => {
  if (filter) {
    // eslint-disable-next-line no-console
    console.log('')
  }
  return request({
    url: 'admin/users/registrations',
    method: 'GET',
    params: {
      // 'filter[limit]': filter.limit,
      // 'filter[skip]': filter.skip,
      search,
    },
  })
}

export const adminRegistrationApprove = (userId: string): AxiosPromise => {
  return request({
    url: 'admin/users/admin-registration-approve',
    method: 'POST',
    data: { userId },
  })
}

export const adminRegistrationReject = (userId: string): AxiosPromise => {
  return request({
    url: 'admin/users/admin-registration-reject',
    method: 'POST',
    data: { userId },
  })
}
