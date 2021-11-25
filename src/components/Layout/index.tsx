import React from "react";
import Head from "next/head";
import Link from "next/link";
import Container from "@mui/material/Container";
import styles from "./layout.module.css";
import Header from "../Header";
import Message from '@/components/Message'
export interface LayoutProps {
  children?: any;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container maxWidth="md">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Next.js + SQLite 留言系统</title>
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
      </Head>
      <Header/>

      <main>{children}</main>

      <footer className={styles.footer}>
        <p>Copyright&nbsp;©&nbsp;{new Date().getFullYear()}&nbsp; </p>
      </footer>
      <Message />
    </Container>
  );
}
