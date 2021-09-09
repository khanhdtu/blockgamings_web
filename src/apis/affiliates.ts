import { AxiosPromise } from 'axios'
import { Instance } from 'mobx-state-tree'
import { omit } from 'lodash'
import { Affiliate } from '../stores'
import { request } from '../utils'

export const getWeeklyAffiliates = (filter: { limit: number; skip: number }, search = ''): AxiosPromise => {
  return request({
    url: 'affiliates/weekly-volume',
    method: 'GET',
    params: {
      'filter[limit]': filter.limit,
      'filter[skip]': filter.skip,
      search,
    },
  })
}

export const getCommissionAffiliates = (filter: { limit: number; skip: number }, search = ''): AxiosPromise => {
  return request({
    url: 'affiliates/weekly-commission',
    method: 'GET',
    params: {
      'filter[limit]': filter.limit,
      'filter[skip]': filter.skip,
      search,
    },
  })
}

export const createAffiliate = (params: Instance<typeof Affiliate>): AxiosPromise => {
  return request({
    url: 'affiliates',
    method: 'POST',
    data: omit(params, ['id', 'updatedAt']),
  })
}

export const updateAffiliate = (params: Instance<typeof Affiliate>): AxiosPromise => {
  return request({
    url: `affiliates/${params.id}`,
    method: 'PUT',
    data: omit(params, ['updatedAt']),
  })
}

export const deleteAffiliate = (id: string): AxiosPromise => {
  return request({
    url: `affiliates/${id}`,
    method: 'DELETE',
  })
}
