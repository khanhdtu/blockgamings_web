import { MuiThemeProvider, StylesProvider } from '@material-ui/core'
import React, { createElement } from 'react'
// import { ThemeProvider } from 'styled-components'
import { createTheme } from '../src/themes'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
const theme = createTheme()
const generateClassName = (rule, sheet) => {
  return `${sheet.options.classNamePrefix}-${rule.key}`
}

const themeDecorator = storyFn => (
  <MuiThemeProvider theme={theme}>
    {/* <ThemeProvider theme={theme}> */}
    {process.env.NODE_ENV === 'test' ? (
      <StylesProvider generateClassName={generateClassName} injectFirst>
        {storyFn()}
      </StylesProvider>
    ) : (
      <StylesProvider injectFirst>{storyFn()}</StylesProvider>
    )}
    {/* </ThemeProvider> */}
  </MuiThemeProvider>
)

export const decorators = [createElement, themeDecorator]
