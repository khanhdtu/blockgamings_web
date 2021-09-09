import React from 'react'
import { MuiThemeProvider, StylesProvider } from '@material-ui/core'
import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { Provider, rootStore } from '../stores'
import { createTheme } from '../themes'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const theme = createTheme()
  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <Provider value={rootStore}>
          <Component {...pageProps} />
          <ToastContainer />
        </Provider>
      </StylesProvider>
    </MuiThemeProvider>
  )
}
