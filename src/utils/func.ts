export const wait = (miliseconds: number, todo?: unknown): void => {
  setTimeout(() => {
    return todo
  }, miliseconds)
}

export const waitForAsync = (miliseconds: number): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, miliseconds)
  })
}

export const convertFileToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export const formatFriendlyName = (name: string): string => {
  switch (name) {
    case 'ROLE_ADMIN':
      return 'Super Admin'
    case 'ROLE_MANAGER':
      return 'Admin'
    case 'ROLE_USER':
      return 'Customer'
    default:
      return ''
  }
}
