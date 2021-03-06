/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import Document from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any): Promise<any> {
    const styledComponentSheet = new StyledComponentSheets()
    const materialUiSheets = new MaterialUiServerStyleSheets()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => styledComponentSheet.collectStyles(materialUiSheets.collect(<App {...props} />)),
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <React.Fragment key='styles'>
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
            {flush() || null}
          </React.Fragment>
        ),
      }
    } finally {
      styledComponentSheet.seal()
    }
  }
}
