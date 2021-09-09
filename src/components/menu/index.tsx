import { useEffect, useState, useRef } from 'react'
import DashboardIcon from '@material-ui/icons/DashboardOutlined'
import PhoneIcon from '@material-ui/icons/PhonelinkRingOutlined'
import UserIcon from '@material-ui/icons/GroupOutlined'
import Settingcon from '@material-ui/icons/SettingsOutlined'
import PayIcon from '@material-ui/icons/MonetizationOn'
import WebsiteIcon from '@material-ui/icons/Language'
import ShareIcon from '@material-ui/icons/Share'
import EuroIcon from '@material-ui/icons/Euro'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import MenuIcon from '@material-ui/icons/Menu'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { Props, MenuItem } from './types'
import { DefaultMenu } from './defaultMenu'
import { SimpleMenu } from './simpleMenu'
import { useRouter } from 'next/router'
import { useOutsideClick } from '../../hooks/useClickOutside'

const useStyles = makeStyles(theme => ({
  toggleMenu: {
    display: 'none',
  },
  [theme.breakpoints.down(600)]: {
    toggleMenu: {
      display: 'block',
    },
  },
}))

export const Menu = (props: Props): JSX.Element => {
  const { route: currentRoute, push: kickOut } = useRouter()
  const [expanded, setExpanded] = useState(false)
  const classes = useStyles()

  const menu: MenuItem[] = [
    {
      name: 'Dashboard',
      routeName: '/dashboard',
      icon: <DashboardIcon color='secondary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      iconActive: <DashboardIcon color='primary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
    },
    {
      name: 'Customers',
      routeName: '/customers',
      icon: <UserIcon color='secondary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      iconActive: <UserIcon color='primary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      hidden: props.role === 'ROLE_ADMIN',
    },
    {
      name: 'Pay Management',
      routeName: '/payment-management',
      icon: <PayIcon color='secondary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      iconActive: <PayIcon color='primary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      children: [
        {
          name: 'Wallet Accounts',
          routeName: '/payment-management/wallets',
        },
        {
          name: 'Deposit Transactions',
          routeName: '/payment-management/deposit-transactions',
        },
        {
          name: 'Withdraw Transactions',
          routeName: '/payment-management/withdraw-transactions',
        },
        {
          name: 'Transfer Transactions',
          routeName: '/payment-management/transfer-transactions',
        },
      ],
      hidden: props.role === 'ROLE_ADMIN',
    },
    {
      name: 'Affiliates',
      routeName: '/affiliates',
      icon: <ShareIcon color='secondary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      iconActive: <ShareIcon color='primary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      hidden: props.role === 'ROLE_ADMIN' || props.brandId === 'caltechcasino',
      children: [
        {
          name: 'Weekly Volume',
          routeName: '/affiliates/weekly-volume',
        },
        {
          name: 'Weekly Commission',
          routeName: '/affiliates/weekly-commission',
        },
      ],
    },
    {
      name: 'Live Bets',
      routeName: '/live-bets',
      icon: <PhoneIcon color='secondary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      iconActive: <PhoneIcon color='primary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      hidden: props.role === 'ROLE_ADMIN',
    },
    {
      name: 'Manager Users',
      routeName: '/manager-users',
      icon: <UserIcon color='secondary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      iconActive: <UserIcon color='primary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      hidden: props.role === 'ROLE_MANAGER',
    },
    {
      name: 'Admin Registrations',
      routeName: '/registrations',
      icon: <GroupAddIcon color='secondary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      iconActive: <GroupAddIcon color='primary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      hidden: props.role === 'ROLE_MANAGER',
    },
    {
      name: 'Brands',
      routeName: '/brands',
      icon: <WebsiteIcon color='secondary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      iconActive: <WebsiteIcon color='primary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      hidden: props.role === 'ROLE_MANAGER',
    },
    {
      name: 'Currency Coins',
      routeName: '/currency-coins',
      icon: <EuroIcon color='secondary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      iconActive: <EuroIcon color='primary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      hidden: props.role === 'ROLE_ADMIN',
    },
    {
      name: 'Settings',
      routeName: '/settings',
      icon: <Settingcon color='secondary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
      iconActive: <Settingcon color='primary' fontSize={props.isCollapsed ? 'default' : 'small'} />,
    },
  ]
  const ref = useRef(null)

  useOutsideClick(ref, () => setExpanded(false), expanded)

  useEffect(() => {
    const currentMenu = menu.find(e => e.routeName === currentRoute)
    if (currentMenu?.hidden) {
      kickOut('404')
    }
  }, [props])

  return (
    <div ref={ref}>
      {props.menuType === 'simple' && <SimpleMenu menu={menu} {...props} mobileOpened={expanded} />}
      {props.menuType !== 'simple' && <DefaultMenu menu={menu} {...props} mobileOpened={expanded} />}
      {/* Toggle Navigation */}
      <Box
        className={classes.toggleMenu}
        position='fixed'
        width={50}
        height={50}
        zIndex={100}
        top={0}
        ml={1}
        mt={1}
        onClick={() => setExpanded(true)}
      >
        <MenuIcon fontSize='large' />
      </Box>
    </div>
  )
}

export default Menu
