import React from 'react'
import { SearchWithOptions } from './index'
import { Payload } from './types'

export const Default = (): JSX.Element => {
  const getPayload = (payload: Payload) => {
    alert(
      `keyword: ${payload.keyWord}\n
         dateFrom: ${payload.dateFrom}\n
         dateTo: ${payload.dateTo}
        `,
    )
  }
  return <SearchWithOptions onSearch={getPayload} onReset={() => 1} />
}

export default {
  title: 'Components/SearchWithOptions',
  component: SearchWithOptions,
}
