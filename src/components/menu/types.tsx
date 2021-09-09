import React from 'react'

export type ChildMenuItem = {
  name: string
  routeName: string
}

export type MenuItem = {
  name: string
  routeName: string
  icon: React.ReactElement
  iconActive: React.ReactElement
  hidden?: boolean
  children?: ChildMenuItem[]
}

export type Props = {
  brandId: string
  brandName?: string
  brandLogo?: string
  role?: 'ROLE_ADMIN' | 'ROLE_MANAGER' | 'ROLE_USER'
  isCollapsed?: boolean
  mobileOpened?: boolean
  isAdmin?: boolean
  menu?: MenuItem[]
  menuType?: 'default' | 'simple' | ''
  onUpdateMenuType?: (type: 'default' | 'simple') => void
  onGoToBlockGamings: () => void
}
