import { AxiosPromise } from 'axios'
import { ITransactionArgs } from '../stores/payment'
import { request } from '../utils'

export const getWalletAccounts = (filter: { limit: number; skip: number }, search = ''): AxiosPromise => {
  return request({
    url: '/users/wallets',
    method: 'GET',
    params: {
      'filter[limit]': filter.limit,
      'filter[skip]': filter.skip,
      search,
    },
  })
}

export const getTransactions = (args: ITransactionArgs): AxiosPromise => {
  return request({
    url: 'admin/payment/transactions',
    method: 'GET',
    params: args,
  })
}

export const confirmWithdrawal = (args: { transactionId: string; approved: boolean }): AxiosPromise => {
  return request({
    url: 'admin/payment/withdrawal/confirm',
    method: 'POST',
    data: args,
  })
}

export interface IMakeDepositArgs {
  toUsername: string
  coinCode: string
  amount: number
}
export const makeDeposit = (args: IMakeDepositArgs): AxiosPromise => {
  return request({
    url: 'admin/payment/deposit',
    method: 'POST',
    data: args,
  })
}
