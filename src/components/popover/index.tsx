import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import MuiPopover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
)

export type Props = {
  name: string
  event: React.MouseEvent<HTMLButtonElement>
}

export const Popover = (props: Props): JSX.Element => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? props.name : undefined

  React.useEffect(() => {
    if (props.event) {
      setAnchorEl(props.event.currentTarget)
    }
  }, [anchorEl])

  return (
    <div>
      <Button aria-describedby={id} variant='contained' color='primary' onClick={handleClick}>
        Open Popover
      </Button>
      <MuiPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>The content of the Popover.</Typography>
      </MuiPopover>
    </div>
  )
}

export default Popover
