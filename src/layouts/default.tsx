import Box, { BoxProps } from '@material-ui/core/Box'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { observer } from 'mobx'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { Menu } from '../components/menu'
import { Navbar } from '../components/navbar'
import { Profile as UserThumb } from '../components/profile'
import { Dynamic } from '../components/nossr'
import { useMst } from '../stores'
import { Popup } from '../components/popup'
import { Profile as ProfilePage } from '../pages/profile'
import { useLocalStorage } from '../hooks'
import { ITEMS } from '../constants'
import { IUpdateProfileRequest } from '../apis'
import { getCurrentBrand } from '../utils'
import cx from 'clsx'

interface Props extends BoxProps {
  type: 'default' | 'higher'
  children: React.ReactNode
}

const useStyles = makeStyles(theme => ({
  container: {
    width: 'calc(100% - 240px)',
    height: '100vh',
    transition: 'width 0.5s',
    marginLeft: 'auto',
    overflowY: 'scroll',
    padding: '50px 10px 20px 10px',
    '&::-webkit-scrollbar': { display: 'none' },
    '&.simple': {
      width: 'calc(100% - 50px)',
      transition: 'width 0.5s',
    },
    [theme.breakpoints.down(600)]: {
      width: '100%',
    },
  },
}))

export const Layout = (props: Props): JSX.Element => {
  const { user, platforms, brands } = useMst()
  const { replace, locale, push, route } = useRouter()
  const [openProfile, setOpenProfile] = useState(false)
  const [currentMenuType, setMenuType] = useLocalStorage<'default' | 'simple' | ''>(ITEMS.CURRENT_MENU_TYPE, '')
  const classes = useStyles()

  useEffect(() => {
    const currentUser = user.doFetchCurrentUser() as any
    const currentBrand = getCurrentBrand()
    if (currentBrand) {
      brands.doSetMyBrand(currentBrand)
      if (locale !== currentBrand.id) {
        push(route, '', { locale: currentBrand.id })
      }
    }
    if (!currentUser) {
      replace(`/${locale}/sign-in`)
    } else {
      if (currentUser.mustChangePassword) {
        replace(`/${locale}/sign-in/change-password`)
      }
    }
  }, [user])

  const handleUpdate = (payload: IUpdateProfileRequest) => {
    user.doUpdateProfile(payload)
    setOpenProfile(false)
  }

  const handleSignOut = () => {
    user.doSignOut()
    replace(`/${locale}/sign-in`)
  }

  const handleGoToBlockGamings = () => {
    user.doUpdateBrandUser('blockgamings')
  }

  return (
    <>
      <Head>
        <title>{brands.myBrand.id.toUpperCase()}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='shortcut icon' href='/icons/favicon.ico' />
      </Head>
      <Box>
        <Dynamic>
          <Menu
            brandId={brands.myBrand.id}
            brandName={brands.myBrand.name}
            brandLogo={brands.myBrand.logo}
            role={user.currentUser?.role}
            isAdmin={user.currentUser.isAdmin}
            menuType={currentMenuType ?? 'default'}
            onUpdateMenuType={setMenuType}
            onGoToBlockGamings={handleGoToBlockGamings}
          />
        </Dynamic>
        <Dynamic>
          <Navbar
            isAdmin={user.currentUser.isAdmin}
            brandId={user.currentUser.brandId}
            menuType={currentMenuType ?? 'default'}
            onGoToBlockGamings={handleGoToBlockGamings}
          >
            <UserThumb
              displayName={user.currentUser.fullName || user.currentUser.username}
              role={user.currentUser.role}
              onLogout={handleSignOut}
              onOpenProfile={() => setOpenProfile(true)}
            />
          </Navbar>
        </Dynamic>
        <Box className={cx(classes.container, currentMenuType)}>
          <Dynamic>{props.children}</Dynamic>
        </Box>
        {user.currentUser && (
          <Popup open={openProfile} header='My Profile' width={650} height='100%' onClose={() => setOpenProfile(false)} scrollable>
            <ProfilePage user={user.currentUser} platforms={platforms} onUpdate={handleUpdate} onClose={() => setOpenProfile(false)} />
          </Popup>
        )}
      </Box>
    </>
  )
}

export default observer(Layout)
