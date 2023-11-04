/**
 * logout.ts
 * 
 * sobird<i@sobird.me> at 2023/11/04 21:09:39 created.
 */
import { GetServerSidePropsContext } from "next";
import { NextApiRequest, NextApiResponse } from 'next';
import restful from '@/lib/restful';
import { userAuth } from '@/middleware/withUserAuth';
import { setCookie } from '@/utils/cookies';

export default () => {}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  setCookie(res, 'token', "", {
    httpOnly: true,
    path: '/'
  });

  return {
    redirect: {
      destination: "/user/signin",
      permanent: false,
    },
  };
}
