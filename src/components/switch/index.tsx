import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export type Props = {
  label?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export const Switch = ({ checked, label, onChange }: Props): JSX.Element => {
  const handleClick = () => onChange(!checked)

  return (
    <Box display='flex' alignItems='center'>
      <Typography variant='subtitle2'>{`${label}: `}</Typography>
      {!checked && <img className='pointer' width={30} style={{ marginLeft: 10 }} src='/icons/switch_on.svg' onClick={handleClick} />}
      {checked && <img className='pointer' width={30} style={{ marginLeft: 10 }} src='/icons/switch_off.svg' onClick={handleClick} />}
    </Box>
  )
}

export default Switch
