import { GetServerSidePropsContext } from "next";
import { SignJWT, jwtVerify } from "jose";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Layout from "@/components/Layout";

export const TOKEN_COOKIE_NAME = "token";
export const JWT_SECRET_KEY = "jwt_secret_key";

export default function UserProfilePage({ user }) {
  const [session] = useSession();
  console.log(`session`, session);
  return (
    <Layout>
      <Head>
        <title>Profile</title>
      </Head>
      <h1>User Profile</h1>
      <p>hello, {user.name}</p>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const {
    cookies: { token },
  } = req;

  if (!token) {
    return {
      redirect: {
        destination: "/user/login",
        permanent: false,
      },
    };
  }

  const result = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_SECRET_KEY)
  ).catch(() => {});

  if (!result) {
    return {
      redirect: {
        destination: "/user/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        name: result.payload.username,
      },
    },
  };
}
