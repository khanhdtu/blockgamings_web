export type Action = {
  name: 'view' | 'edit' | 'delete' | 'approve' | 'redirect' | 'deposit'
  itemId: string
}

export type Props = {
  data: any[]
  actions?: ('view' | 'edit' | 'delete' | 'approve' | 'redirect' | 'deposit')[]
  omit?: string[]
  sortBy?: string
  totalPages?: number
  currentPage?: number
  currentRecord?: number
  onAction?: (action: Action) => void
  onRecord?: (record: number) => void
  onNext?: () => void
  onPrevious?: () => void
}
