import { AxiosPromise } from 'axios'
import { request } from '../utils'

export interface IBetArgs {
  keyWord?: string
  dateFrom?: number | null
  dateTo?: number | null
}
export const getBets = (filter: { limit: number; skip: number }, args?: IBetArgs): AxiosPromise => {
  return request({
    url: `admin/payment/bets`,
    method: 'GET',
    params: {
      'filter[limit]': filter.limit,
      'filter[skip]': filter.skip,
      ...args,
    },
  })
}

export const getWinners = (): AxiosPromise => {
  return request({
    url: 'admin/payment/bets/winners',
    method: 'GET',
  })
}

export const getMonthlyProfits = (): AxiosPromise => {
  return request({
    url: 'admin/payment/bets/monthly-profits',
    method: 'GET',
  })
}
