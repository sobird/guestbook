/**
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

import '../styles/global.scss'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
