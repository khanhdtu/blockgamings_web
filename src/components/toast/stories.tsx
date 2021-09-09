import React from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { Toast } from './index'
import { Props } from './types'

export const Default = (props: Props): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const message = 'Successfully create a new user'
  return (
    <Box>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Show message
      </Button>
      <Toast isOpen={open} message={props.message || message} type={props.type || 'success'} onClose={setOpen} />
    </Box>
  )
}

export default {
  title: 'Components/Toast',
  component: Toast,
}
