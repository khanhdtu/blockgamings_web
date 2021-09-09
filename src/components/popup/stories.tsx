import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Popup } from './index'

export const Default = (): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  return (
    <Box>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Popup
      </Button>
      <Popup open={open}>
        <Box>Popup works!</Box>
        <Button variant='contained' onClick={() => setOpen(false)}>
          Close Popup
        </Button>
      </Popup>
    </Box>
  )
}

export default {
  title: 'Components/Popup',
  component: Popup,
}
