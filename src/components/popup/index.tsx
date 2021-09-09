import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import CloseIcon from '@material-ui/icons/Close'
import { Props } from './types'
import { Loading } from '../../components/loading'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: 'translateZ(0)',
      zIndex: 2,
      '@media all and (-ms-high-contrast: none)': {
        display: 'none',
      },
    },
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    modalHeader: {
      position: 'relative',
    },
    headerCenter: {
      textAlign: 'center',
    },
    closeModal: {
      position: 'absolute',
      right: 0,
      top: 0,
      marginRight: -20,
      cursor: 'pointer',
    },
    loading: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      zIndex: 99999,
    },
    paper: (props: Props) => ({
      width: props.width,
      height: props.height,
      backgroundColor: '#FFF',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 10,
      overflowY: props.scrollable ? 'scroll' : 'unset',
      outline: 'none',
    }),
    [theme.breakpoints.down(600)]: {
      paper: {
        padding: '5px !important',
      },
      closeModal: {
        right: 15,
      },
      modalHeader: {
        textAlign: 'center',
      },
      '& .MuiTypography-h5': {
        fontSize: '13px !important',
      },
    },
  }),
)

export const Popup = (props: Props): JSX.Element => {
  const classes = useStyles(props)
  const rootRef = React.useRef<HTMLDivElement>(null)
  if (!props.open) return <></>

  return (
    <div className={classes.root} ref={rootRef}>
      {/* If you disable Javascript, you will still see this modal */}
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={props.open}
        aria-labelledby='server-modal-title'
        aria-describedby='server-modal-description'
        className={clsx(classes.modal, 'modal')}
        container={() => rootRef.current}
        onBackdropClick={props.onClose}
      >
        <Box className={classes.paper}>
          {/* MODAL HEADER */}
          {props.header && (
            <Box className={clsx(classes.modalHeader, props.headerAlignCenter && classes.headerCenter)}>
              <Typography variant='h1' color='secondary'>
                {props.header}
              </Typography>
              <Box className={classes.closeModal}>
                <CloseIcon onClick={props.onClose} />
              </Box>
            </Box>
          )}
          {/* MODAL BODY */}
          {props.children}
        </Box>
      </Modal>
      {props.isLoading && (
        <Box className={classes.loading}>
          <Loading />
        </Box>
      )}
    </div>
  )
}

export default Popup
