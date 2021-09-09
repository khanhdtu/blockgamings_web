import { AxiosPromise } from 'axios'
import { request } from '../utils'

export const getPlatforms = (): AxiosPromise => {
  return request({
    url: '/platforms',
    method: 'GET',
  })
}
