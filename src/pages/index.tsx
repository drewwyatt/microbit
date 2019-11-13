import React from 'react'
import Head from 'next/head'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import SupportGuard from '../components/SupportGuard'
import Unsupported from '../components/Unsupported'
import SerialProvider from '../components/Serial'
import ConnectButton from '../components/ConnectButton'

const theme = createMuiTheme({
  palette: { background: { default: '#cec6bf' } },
})

// --mdc-theme-background: #cec6bf;
// --mdc-theme-primary: #161517;
// --mdc-theme-on-primary: #ffffff;
// 18.2 AAA
// --mdc-theme-secondary: #cca4a7;
// --mdc-theme-on-secondary: #000000;
// 9.4 AAA
// --mdc-theme-error: #b00020;
// --mdc-theme-on-error: #ffffff;
// 7.3 AAA
// --mdc-theme-surface: #a78f84;
// --mdc-theme-on-surface: #000000;
// 6.9 AAA

const Home = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container>
      <Head>
        <title>MicroBit Demo</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <SupportGuard fallback={Unsupported}>
        <SerialProvider>
          <ConnectButton />
        </SerialProvider>
      </SupportGuard>
    </Container>
  </ThemeProvider>
)

export default Home
