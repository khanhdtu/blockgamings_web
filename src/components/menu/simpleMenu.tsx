import { useEffect, useState } from 'react'
import { Box, Typography, Popover, Avatar } from '@material-ui/core'
import { useSimplifyStyles } from './styles'
import { Props, ChildMenuItem } from './types'
import { useRouter } from 'next/router'
import { useLocalStorage } from '../../hooks'
import { ITEMS } from '../../constants'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

export const SimpleMenu = (props: Props): JSX.Element => {
  const { brandLogo, menu, onUpdateMenuType } = props
  const { push, route } = useRouter()
  const [currentMenu, setMenu] = useLocalStorage(ITEMS.CURRENT_MENU, '/dashboard')
  const [, setMenuChild] = useLocalStorage(ITEMS.CURRENT_MENU_CHILD, '')
  const [currentIndex, setIndex] = useState(-1)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const classes = useSimplifyStyles()
  const open = Boolean(anchorEl)
  const poperId = open ? currentMenu : undefined

  const handleClose = () => {
    setAnchorEl(null)
  }

  const renderMenuChildren = (items: ChildMenuItem[]) => {
    return (
      <Popover
        id={poperId ?? ''}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        {items.map(item => {
          return (
            <Box
              key={item.routeName}
              className='hover'
              onClick={() => {
                setMenuChild(item.routeName)
                push(item.routeName)
              }}
              m={1}
            >
              <Typography>{item.name}</Typography>
            </Box>
          )
        })}
      </Popover>
    )
  }

  useEffect(() => {
    if (route === '/') {
      setMenu('/dashboard')
    }
  }, [])

  return (
    <Box className={classes.root}>
      <Avatar style={{ marginLeft: 2 }} className='logo' src={brandLogo} />
      <Box className='pointer' mt={1} mb={1} bgcolor='#f5f5f5' onClick={() => onUpdateMenuType && onUpdateMenuType('default')}>
        <ArrowRightIcon />
      </Box>

      {menu?.map((menuItem, index) => {
        if (!menuItem.hidden)
          return (
            <Box
              key={menuItem.name}
              aria-describedby={poperId ?? ''}
              className='pointer'
              onClick={e => {
                setMenu(menuItem.routeName)
                setIndex(index)
                if (!open && menuItem.children) {
                  setAnchorEl((e as any).currentTarget)
                }
                if (!menuItem.children) {
                  push(menuItem.routeName)
                }
              }}
              mb={2}
            >
              {currentMenu === menuItem.routeName ? menuItem.iconActive : menuItem.icon}
              {menuItem.children?.length && currentIndex === index && renderMenuChildren(menuItem.children)}
            </Box>
          )
        return <Box key={menuItem.name} />
      })}
    </Box>
  )
}

export default SimpleMenu
