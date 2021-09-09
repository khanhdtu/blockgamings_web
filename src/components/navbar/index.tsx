import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import cx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    width: 'calc(100% - 240px)',
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '10px',
    backgroundColor: '#f9fcff',
    top: 0,
    right: 0,
    zIndex: 1,
    height: 60,
    '&.simple': {
      width: 'calc(100% - 45px)',
    },
    '& .goToBlockgmings': {
      width: 200,
      margin: 'auto',
      cursor: 'pointer',
      color: '#000',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    [theme.breakpoints.down(600)]: {
      width: '100%',
      '& .goToBlockgmings': {
        display: 'none',
        marginTop: -10,
        marginLeft: 85,
        width: 100,
        fontSize: 12,
      },
    },
  },
}))

type Props = {
  isAdmin: boolean
  brandId: string
  menuType: 'default' | 'simple' | ''
  children: React.ReactNode
  onGoToBlockGamings: () => void
}

export const Navbar = ({ isAdmin, brandId, menuType, children, onGoToBlockGamings }: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <Box className={cx(classes.root, menuType)}>
      {isAdmin && brandId !== 'blockgamings' && (
        <Box width='100%' textAlign='center'>
          <Typography className='goToBlockgmings' onClick={onGoToBlockGamings} variant='subtitle1'>
            GO TO BLOCKGAMINGS
          </Typography>
        </Box>
      )}
      {children}
    </Box>
  )
}

export default Navbar
