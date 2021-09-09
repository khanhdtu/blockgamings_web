import { Color, SimplePaletteColorOptions } from '@material-ui/core'

export const hue: { [key: string]: SimplePaletteColorOptions & Partial<Color> } = {
  red: {
    main: '#FA3434',
    light: '#FEEAEA',
    dark: '',
  },
  blue: {
    main: '#E5F7E7',
    light: '#007BFF',
    dark: '#0079FD',
    100: '#F1F8FF',
  },
  orange: {
    main: '#FF9017',
    light: '#FF9017',
    dark: '#',
  },
  gray: {
    main: '#FA3434',
    light: '#FEEAEA',
    dark: '#',
  },
  green: {
    main: '#E5F7E7',
    light: '#00B517',
    dark: '#00CA8E',
  },
  pink: {
    main: '#FFF3E7',
    light: '',
    dark: '',
  },
  alert_info: {
    main: '#D8EAFD',
  },
}

export default hue
