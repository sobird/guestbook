import React, { useEffect } from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import styles from "./layout.module.css";
import Header from "../Header";
import Message from '@/components/Message'
import { useAppDispatch } from '@/store/hooks';
import UserService from '@/services/user';
import { updateUser } from "@/store/actions/app";
export interface LayoutProps {
  children?: any;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch =  useAppDispatch()
  useEffect(() => {
    UserService.profile().then(res=> {
      dispatch(updateUser(res));
    })
  }, []);

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
