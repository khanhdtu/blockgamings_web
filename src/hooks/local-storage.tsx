/* eslint-disable no-console */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

// Local Storage Hook
export function useLocalStorage<T>(key: string, initialValue?: T): [T | null, Dispatch<SetStateAction<T | null>>] {
  const [storedValue, setStoredValue] = useState<T | null>(null)
  useEffect(() => {
    const item = localStorage.getItem(key)
    setStoredValue(item ? JSON.parse(item) : initialValue)
  }, [initialValue, key])

  const setValue = (value: SetStateAction<T | null>) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
