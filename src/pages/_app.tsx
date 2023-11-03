/**
 * 自定义 App
 * 
 * This App component is the top-level component which will be common across all the different pages.
 * You can use this App component to keep state when navigating between pages, for example.
 *
 * You need to restart the development server when you add pages/_app.js.
 * Press Ctrl + c to stop the server and run:
 *
 * npm run dev
 *
 * In Next.js, you can add global CSS files by importing them from pages/_app.js.
 * You cannot import global CSS anywhere else.
 *
 * sobird<i@sobird.me> at 2021/11/09 15:18:01 created.
 */
import Head from "next/head";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import "@/styles/global.scss";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/lib/emotion";
import theme from "@/lib/theme";
import { userAuth } from "@/middleware/withUserAuth";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type MyAppProps = {
  emotionCache?: EmotionCache;
  example: string
}

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
  example,
  user
}: AppProps & MyAppProps) {

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <p>Data: {example}</p> */}
        <Component {...pageProps} user={user} />
      </ThemeProvider>
    </CacheProvider>
  );
}

/**
 * We do not recommend using this pattern. 
 * Instead, consider incrementally adopting the App Router, 
 * which allows you to more easily fetch data for pages and layouts.
 * @param context 
 * @returns 
 */
MyApp.getInitialProps = async (
  context: AppContext
): Promise<MyAppProps & AppInitialProps> => {
  const { ctx: {req, res} } = context;
  const initialProps = await App.getInitialProps(context);

  // const user = await userAuth(req, res);

  // console.log('ctx', user)
  
 
  return { ...initialProps, example: 'data'  }
}
