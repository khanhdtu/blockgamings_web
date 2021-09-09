/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { toast } from 'react-toastify'
import { deleteCurrentUser } from '../utils'

export const errorResponseHandler = (error: any): any => {
  if (!error.response || !error.response.data) {
    if (error.statusCode && error.statusCode === 403) {
      toast.error(error.message, { autoClose: 2500 })
      deleteCurrentUser()
      setTimeout(() => {
        window.location.href = '/sign-in'
      }, 3500)
      return
    }
    if (error.statusCode && error.statusCode === 401) {
      toast.error(error.message, { autoClose: 2500 })
      deleteCurrentUser()
      window.location.href = '/sign-in'
      return
    }
    toast.error(error.message, { autoClose: 2500 })
    return
  }
  const { data } = error.response
  if (data && data.error) {
    if (data.error.statusCode) {
      if (data.error.statusCode === 401 || data.error.statusCode === 403) {
        toast.error(data.error.message, { autoClose: 2500 })
        deleteCurrentUser()
        setTimeout(() => {
          window.location.href = '/sign-in'
        }, 3500)
      }

      return
    }
    if (data.error.details) {
      const input = data.error.details[0].path.replace('/', '').toLowerCase()
      const message = data.error.details[0].message
      toast.error(`${input} ${message}`, { autoClose: 2500 })
      return
    }
    if (data.error.message) {
      const message = data.error.message
      toast.error(message, { autoClose: 2500 })
      return
    }
  }
}

export const successResponseHandler = (response: any): any => {
  const { data } = response
  if (data) {
    if (data.statusCode && data.statusCode === 199) {
      toast.warn(data.message, { autoClose: 2500 })
      return
    }
    if (data.statusCode && data.statusCode === 200) {
      toast.success(data.message, { autoClose: 2500 })
      return data
    }
    toast.error(data.message, { autoClose: 2500 })
    return
  }

  return response
}
