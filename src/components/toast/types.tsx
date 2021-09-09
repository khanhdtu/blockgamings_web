export type Props = {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  isOpen: boolean
  onClose?: (isOpen: boolean) => void
}
