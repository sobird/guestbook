/**
 * 自定义 Document
 *
 * <Html>, <Head />, <Main /> and <NextScript /> 是正确渲染页面所必需的.
 *
 * 1.Document仅在服务端渲染，像 onClick 这样的事件处理程序将不起作用。
 * 2.<Main />之外的组件不会被浏览器初始化（水合）。
 * 3.如果您需要在所有页面中共享组件（如菜单或工具栏），请查看 App 组件。
 * 4.Document's getInitialProps function is not called during client-side transitions, nor when a page is statically optimized.
 * 5.Document currently does not support Next.js Data Fetching methods like getStaticProps or getServerSideProps.
 *
 * sobird<i@sobird.me> at 2021/11/11 19:30:41 created.
 */

import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '@/lib/emotion';
import theme from '@/lib/theme';
import { userAuth } from "@/middleware/withUserAuth";

class MyDocument extends Document {
  // `getInitialProps` belongs to `_document` (instead of `_app`),
  // it's compatible with static-site generation (SSG).
  static async getInitialProps(ctx: DocumentContext) {
    console.log('Document ctx', ctx.req)

    const user = await userAuth(ctx.req, ctx.res);

    console.log('user', user)

    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => props => <App emotionCache={cache} {...props} />,
      });
    const initialProps = await Document.getInitialProps(ctx);

    console.log('initialProps', initialProps)

    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map(style => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps, // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
    };
  }

  render() {
    return (
      <Html lang='zh-CN'>
        {/* 这里的 <Head /> 组件与 next/head 中的组件不同 */}
        <Head>
          {/* PWA primary color */}
          <meta name='theme-color' content={theme.palette.primary.main} />
        </Head>
        <body className='next-js'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
