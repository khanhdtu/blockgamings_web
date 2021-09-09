/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect } from 'react'

export const useOutsideClick = (ref: any, callback: () => void, isOpen: boolean): void => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      // prevent document keep listening event when the dropdown is already closed
      if (!isOpen) document.removeEventListener('mousedown', handleClickOutside)
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    // Bind the event listener if the isOpen is true
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, isOpen])
}
