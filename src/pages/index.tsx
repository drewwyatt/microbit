import React from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import SupportGuard from '../components/SupportGuard'
import Unsupported from '../components/Unsupported'
import SerialProvider from '../components/Serial'
import ConnectButton from '../components/ConnectButton'

const theme = createMuiTheme({
  palette: {
    background: { default: '#cec6bf' },
    primary: { main: '#161517' },
    secondary: { main: '#cca4a7', contrastText: '#000' },
    error: { main: '#b00020' },
  },
})

const LEDs = dynamic(() => import('../components/Grid'), { ssr: false })

const Home = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Head>
      <title>MicroBit Demo</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
    <SupportGuard fallback={Unsupported}>
      <SerialProvider>
        <LEDs />
        <ConnectButton />
      </SerialProvider>
    </SupportGuard>
  </ThemeProvider>
)

export default Home
