import { AxiosPromise } from 'axios'
import { Instance } from 'mobx-state-tree'
import { omit } from 'lodash'
import { request } from '../utils'
import { Currency } from '../stores'

export const getCurrencies = (filter: { limit: number; skip: number }): AxiosPromise => {
  return request({
    url: '/currencies',
    method: 'GET',
    params: {
      'filter[limit]': filter.limit,
      'filter[skip]': filter.skip,
    },
  })
}

export const createCurrency = (currency: Instance<typeof Currency>): AxiosPromise => {
  return request({
    url: '/currencies',
    method: 'POST',
    data: omit(currency, ['id']),
  })
}

export const updateCurrency = (currency: Instance<typeof Currency>): AxiosPromise => {
  return request({
    url: `/currencies/${currency.id}`,
    method: 'PUT',
    data: currency,
  })
}

export const deleteCurrency = (currencyId: string): AxiosPromise => {
  return request({
    url: `/currencies/${currencyId}`,
    method: 'DELETE',
  })
}
