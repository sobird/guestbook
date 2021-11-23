import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

import { Button } from "antd";

import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import { getSortedPostsData } from "../lib/posts";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home({ allPostsData }) {
  //const { data = [], error } = useSWR('/api/posts', fetcher)

  const posts = allPostsData;
  return (
    <Layout>
      <section className={utilStyles.headingMd}>
        <p>
          Hello,I'm Sobird. I'm a software enginer. Yan can contact me on my{" "}
          <a href="https://sobird.me" target="_blank">
            blog
          </a>
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section>
        <Link href="/user/login">
          <Button type="primary">登陆</Button>
        </Link>

        <Link href="/user/register">
          <Button type="ghost">注册</Button>
        </Link>

        <Link href="/user/profile">
          <Button type="default">个人中心</Button>
        </Link>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

/**
 * Because it’s meant to be run at build time,
 * you won’t be able to use data that’s only available during request time,
 * such as query parameters or HTTP headers.
 *
 * @returns
 */
// export async function getStaticProps(context) {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

/**
 * You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time.
 * Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request,
 * and the result cannot be cached by a CDN without extra configuration.
 *
 * @returns
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
