import { AxiosPromise } from 'axios'
import { request } from '../utils'
import { ITransactionArgs } from '../stores/payment'

export const getTransfers = (filter: { limit: number; skip: number }, args?: ITransactionArgs): AxiosPromise => {
  return request({
    url: 'admin/payment/transfers',
    method: 'GET',
    params: {
      'filter[limit]': filter.limit,
      'filter[skip]': filter.skip,
      ...args,
    },
  })
}
