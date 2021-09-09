import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDefaultStyles } from './styles'
import cx from 'clsx'
import Box from '@material-ui/core/Box'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRightOutlined'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Props } from './types'
import { LogoBrand } from '../logo'
import { useLocalStorage } from '../../hooks'
import { ITEMS } from '../../constants/items'

export const DefaultMenu = (props: Props): JSX.Element => {
  const { menu, brandId, brandName, brandLogo, isAdmin, mobileOpened, onUpdateMenuType, onGoToBlockGamings } = props
  const { push, route } = useRouter()
  const classes = useDefaultStyles()
  const [currentMenu, setMenu] = useLocalStorage(ITEMS.CURRENT_MENU, '/dashboard')
  const [currentMenuChild, setMenuChild] = useLocalStorage(ITEMS.CURRENT_MENU_CHILD, '')

  const createMenu = (
    routeName: string,
    name: string,
    icon: React.ReactElement,
    iconActive: React.ReactElement,
    children?: { routeName: string; name: string }[],
    hidden?: boolean,
  ) => {
    if (!hidden)
      return (
        <Box key={name}>
          <MenuItem
            className={cx(classes.menuItem, routeName === currentMenu ? classes.menuActive : '')}
            onClick={() => {
              setMenu(routeName)
              if (!children) {
                setMenuChild('')
                push(routeName)
                return
              }
              setMenuChild(routeName)
            }}
          >
            <ListItemIcon>{currentMenu === routeName ? iconActive : icon}</ListItemIcon>
            <Typography variant='h6' className={currentMenu === routeName ? classes.menuLabelActive : classes.menuLabel}>
              {name}
            </Typography>
            {/* Arrow Expanding if have children items*/}
            {children?.length && (
              <Box position='absolute' right={0} mt={1}>
                <ArrowRightIcon />
              </Box>
            )}
          </MenuItem>

          {/* Expanding of Menu Childen */}
          {currentMenuChild?.includes(routeName) &&
            children?.map((item, index) => (
              <MenuItem
                key={`menu-child-${index}`}
                className={classes.menuChildItem}
                onClick={() => {
                  setMenuChild(item.routeName)
                  push(item.routeName)
                }}
              >
                <Box className={cx(classes.dot, currentMenuChild === item.routeName && classes.dotActive)} />
                <Typography variant='h6' className={currentMenuChild === item.routeName ? classes.menuLabelActive : classes.menuLabel}>
                  {item.name}
                </Typography>
              </MenuItem>
            ))}
        </Box>
      )
    return <Box key={name} />
  }

  useEffect(() => {
    if (route === '/') {
      setMenu('/dashboard')
    } else {
      setMenu(route)
    }
    if (!route.includes('user-management') && !route.includes('payment-management') && !route.includes('affiliates')) {
      setMenuChild('')
    }
  }, [])

  return (
    <Box className={cx(classes.root, mobileOpened ? 'show' : 'hide')}>
      <LogoBrand name={brandName ?? ''} logo={brandLogo} />
      <Box height={10} position='relative'>
        <ArrowLeft className='collapse' fontSize='large' onClick={() => onUpdateMenuType && onUpdateMenuType('simple')} />
      </Box>
      <MenuList>
        {menu?.map(menuItem =>
          createMenu(menuItem.routeName, menuItem.name, menuItem.icon, menuItem.iconActive, menuItem.children, menuItem.hidden),
        )}
      </MenuList>
      {mobileOpened && isAdmin && brandId !== 'blockgamings' && (
        <Box width='fit-content' position='fixed' display='flex' alignItems='center' borderBottom='1px solid' bottom={10} ml={2}>
          <ArrowBackIcon fontSize='small' />
          <Typography onClick={onGoToBlockGamings} variant='subtitle1'>
            GO TO BLOCKGAMINGS
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default DefaultMenu
