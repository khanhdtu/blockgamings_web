import { AxiosPromise } from 'axios'
import { request } from '../utils'

export const getPlayers = (filter?: string): AxiosPromise => {
  return request({
    url: 'users/players',
    method: 'GET',
    params: { filter },
  })
}

export const getPlayerDetails = (id: string): AxiosPromise => {
  return request({
    url: `users/players/${id}`,
    method: 'GET',
  })
}
