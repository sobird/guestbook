/**
 * 自定义 Document
 *
 * <Html>, <Head />, <Main /> and <NextScript /> are required for the page to be properly rendered.
 * 
 * 1.Document仅在服务端渲染，像 onClick 这样的事件处理程序将不起作用。
 * 2.<Main />之外的组件不会被浏览器初始化（水合）。
 * 3.如果您需要在所有页面中共享组件（如菜单或工具栏），请查看 App 组件。
 * 4.Document's getInitialProps function is not called during client-side transitions, nor when a page is statically optimized.
 * 5.Document currently does not support Next.js Data Fetching methods like getStaticProps or getServerSideProps.
 * 
 * sobird<i@sobird.me> at 2021/11/11 19:30:41 created.
 */

import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="zh-CN">
        {/* 这里的 <Head /> 组件与 next/head 中的组件不同 */}
        <Head />
        <body className="next-js">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
