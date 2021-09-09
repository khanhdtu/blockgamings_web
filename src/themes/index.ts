import './hue'

import { colors, createMuiTheme, responsiveFontSizes, ThemeOptions } from '@material-ui/core'
import { mergeAll } from 'ramda'

import typography from './typography'

const baseConfig: ThemeOptions = {
  direction: 'ltr',
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)',
      },
    },
  },
}

export const themeConfig: ThemeOptions = {
  palette: {
    type: 'light',
    background: {
      default: colors.common.white,
      paper: '#f6f7f8',
    },
    primary: {
      light: '#e3f2fd',
      main: '#2E5BFF',
      dark: '#e7cb59',
    },
    secondary: {
      light: '#B0BAC9',
      main: '#2E384D',
      dark: '#09090a',
    },
    error: {
      light: '#e87878',
      main: '#E84A50',
      dark: '#c03535',
    },
    info: {
      light: '#559eee',
      main: '#B0BAC9',
      dark: '#0066d3',
    },
    success: {
      light: '#6ad7bb',
      main: '#00c692',
      dark: '#00b27d',
    },
    warning: {
      light: '#f8b267',
      main: '#F7C137',
      dark: '#e67a05',
    },
  },
}

export function createTheme(): ThemeOptions {
  const themeSetting: ThemeOptions = mergeAll([{}, baseConfig, themeConfig])
  const theme = responsiveFontSizes(createMuiTheme(themeSetting))

  return theme
}
