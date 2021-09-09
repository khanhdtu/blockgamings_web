import { TypographyOptions } from '@material-ui/core/styles/createTypography'

const typography: TypographyOptions = {
  fontFamily: ['Roboto'].join(','),

  h1: {
    fontWeight: 600,
    fontSize: 36,
    letterSpacing: '-0.24px',
  },
  h2: {
    fontWeight: 600,
    fontSize: 28,
    letterSpacing: '-0.24px',
  },
  h3: {
    fontWeight: 600,
    fontSize: 24,
    letterSpacing: '-0.06px',
  },
  h4: {
    fontWeight: 600,
    fontSize: 22,
    letterSpacing: '-0.06px',
  },
  h5: {
    fontWeight: 600,
    fontSize: 18,
    letterSpacing: '-0.05px',
  },
  h6: {
    fontWeight: 400,
    fontSize: 18,
    letterSpacing: '-0.05px',
  },
  overline: {
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: 14,
    lineHeight: '15px',
    fontWeight: 600,
    fontStyle: 'italic',
    color: '#2E384D',
  },
  subtitle2: {
    fontSize: 14,
    lineHeight: '15px',
    color: '#8798AD',
  },
  body1: {
    color: '#263238',
  },
}

export default typography
