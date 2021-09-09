import { makeStyles } from '@material-ui/core/styles'

export const useDefaultStyles = makeStyles(theme => ({
  root: {
    width: 240,
    transition: 'width 0.5s',
    paddingTop: 20,
    height: '100vh',
    borderRight: `2px solid #F5F5F5`,
    position: 'fixed',
    overflowY: 'scroll',
    backgroundColor: '#FFF',
    top: 0,
    zIndex: 1,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '& .collapse': {
      position: 'absolute',
      right: 0,
      top: -7,
      zIndex: 1,
      cursor: 'pointer',
    },
    [theme.breakpoints.down(600)]: {
      paddingTop: 65,
      paddingBottom: 30,
      '&.show': {
        width: 240,
      },
      '&.hide': {
        width: 0,
      },
      '& .collapse': {
        display: 'none',
      },
    },
  },
  menuItem: {
    height: 56,
    position: 'relative',
  },
  menuActive: {
    backgroundColor: theme.palette.primary.light,
  },
  menuLabel: {
    color: '#000',
  },
  menuLabelActive: {
    color: theme.palette.primary.main,
    '&.MuiTypography-h6': {
      fontWeight: 'bold',
    },
  },
  menuChildItem: {
    height: 50,
    display: 'flex',
    marginLeft: '20px !important',
  },
  close: {
    cursor: 'pointer',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    border: '1px solid silver',
    marginRight: 10,
  },
  dotActive: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}))

export const useSimplifyStyles = makeStyles(() => ({
  root: {
    width: 45,
    paddingTop: 10,
    height: '100vh',
    position: 'fixed',
    overflowY: 'scroll',
    backgroundColor: '#FFF',
    textAlign: 'center',
    top: 0,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '& .logo': {
      width: 40,
    },
  },
}))
