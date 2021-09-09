export type Payload = {
  keyWord?: string
  dateFrom?: Date | string | number | null
  dateTo?: Date | string | number | null
  type?: 'WITHDRAWAL' | 'DEPOSIT' | 'TRANSFER' | 'CONVERT'
  status?: 'PENDING' | 'COMPLETED' | 'PROCESSING'
  coindCode?: 'USDT' | 'ETH' | 'BTC'
}

export interface Props {
  isLoading?: boolean
  onSearch: (payload: Payload) => void
  onReset: () => void
}
