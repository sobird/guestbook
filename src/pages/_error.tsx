/**
 * 全局通用错误页面
 *
 * 单独定义的错误页，例如 404.tsx, 500.tsx 将会优先展示
 *
 * sobird<i@sobird.me> at 2023/10/30 15:59:00 created.
 */

function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
