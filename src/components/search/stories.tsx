import React from 'react'
import { Search as SearchInput } from './index'

export const Default = (): JSX.Element => {
  return <SearchInput onSearch={e => alert(JSON.stringify(e))} onReset={() => 1} />
}

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
}
