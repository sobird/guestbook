import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Button, TextField, Box, Grid, styled } from '@mui/material';
import Layout from "@/components/Layout";
import { userAuth } from "@/middleware/withUserAuth";

type UserProps =Awaited<ReturnType<typeof userAuth>>;

interface UserProfilePageProps {
  userInfo: UserProps;
}

export default function UserProfilePage({ userInfo }: UserProfilePageProps) {
  return (
    <Layout>
      <Head>
        <title>用户信息</title>
      </Head>
      
      <Box component='form' mb={3} textAlign="center">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{ width: '400px' }}
              variant="standard"
              label='用户名称'
              size='small'
              disabled
              value={userInfo?.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ width: '400px' }}
              variant="standard"
              label='用户邮箱'
              size='small'
              disabled
              value={userInfo?.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              sx={{ width: '400px' }}
              variant="standard"
              label='用户昵称'
              size='small'
              disabled
              value={userInfo?.nickname || "未设置用户昵称"}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              sx={{ width: '400px' }}
              variant="standard"
              label='真实姓名'
              size='small'
              disabled
              value={userInfo?.realname || "未设置真实姓名"}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              sx={{ width: '400px' }}
              variant="standard"
              label='创建时间'
              size='small'
              disabled
              value={userInfo?.createdAt || "未设置真实姓名"}
            />
          </Grid>
        </Grid>
      </Box>

    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const user = await userAuth(req, res);

  if (!user) {
    return {
      redirect: {
        destination: "/user/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userInfo: user,
    },
  };
}

// UserProfilePage.getInitialProps = async (ctx) => {
//   console.log('ctx', Object.keys(ctx));
//   console.log(ctx.query)
  

//   if (typeof window === 'undefined') {
//     console.log("Dd")
//   }

//   return {};
// }