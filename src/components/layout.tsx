import React from "react";
import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Sobird";
export const siteTitle = "Next.js Sample Website";

export interface LayoutProps {
  children?: any;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Next.js + SQLite 留言系统</title>
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
      </Head>
      <header className={styles.header}>header</header>
      
      <main>{children}</main>

      <footer className={styles.footer}>
        <p>Copyright&nbsp;©&nbsp;{new Date().getFullYear()}&nbsp; </p>
      </footer>
    </div>
  );
}
