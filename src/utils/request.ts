import axios from 'axios'
import { getCurrentUser, errorResponseHandler, successResponseHandler } from '../utils'

const request = axios.create({
  baseURL: `${process.env.ROOT_URL}:${process.env.API_PORT}`,
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// request configs
request.interceptors.request.use(
  async config => {
    config.headers['token'] = getCurrentUser()?.token ?? ''
    return config
  },
  error => Promise.reject(error),
)

// response configs
export interface IResponse {
  statusCode: number | string
  message?: string
  data?: unknown
  error?: unknown
}

request.interceptors.response.use(
  response => successResponseHandler(response),
  error => errorResponseHandler(error),
)

export { request }
export default request
