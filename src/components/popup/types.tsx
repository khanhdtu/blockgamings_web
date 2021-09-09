export type Props = {
  open: boolean
  width?: number | string
  height?: number | string
  header?: string
  headerAlignCenter?: boolean
  isLoading?: boolean
  scrollable?: boolean
  onClose?: () => void
  children: React.ReactNode
}
