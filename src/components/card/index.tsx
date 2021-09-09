import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Props } from './types'

export const Card = (props: Props): JSX.Element => {
  return (
    <Box
      className={props.className}
      width={props.width || 264}
      height={props.height || 150}
      boxShadow='1px 2px 12px 4px #f5f5f5'
      position='relative'
      p='24px'
      bgcolor='#FFF'
      style={props.scrollable ? { overflowX: 'hidden', overflowY: 'scroll' } : {}}
    >
      {/* OPTIONS */}
      <Box width={20} height={20} position='absolute' right={'5px'}>
        <img src='icons/dotdotdot.png' />
      </Box>
      {/* IF CARD's TITLE is a TEXT */}
      {props.titleText && (
        <Box style={{ opacity: 0.4 }}>
          <Typography variant='h3'>{props.titleText.toString().toUpperCase()}</Typography>
        </Box>
      )}
      {/* IF CARD's TITLE is a ICON */}
      {props.titleIcon && (
        <Box width={48} height={48} display='flex' alignItems='center' justifyContent='center' borderRadius={24} bgcolor='#e4e6eb' mt={-1}>
          {props.titleIcon}
        </Box>
      )}
      {/* CARD's CONTENT */}
      <Box>{props.children}</Box>
    </Box>
  )
}

export default Card
