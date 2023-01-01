import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import Head from 'next/head'
import { NotificationsProvider } from '@mantine/notifications'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthContextProvider } from '../context/authContext'

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppProopsWithLayouts = AppProps & {
  Component: NextPageWithLayout
}


export default function App({ Component, pageProps }: AppProopsWithLayouts) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <>
      <Head>
        <title>YouTube Clone</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",


        }}>
        <NotificationsProvider>
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              {getLayout(
                <main>
                  <Component {...pageProps} />
                </main>
              )}
            </AuthContextProvider>
          </QueryClientProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  )

}
