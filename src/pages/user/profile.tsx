import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Button, TextField, Box, Grid, styled } from '@mui/material';
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import { userAuth } from "@/middleware/withUserAuth";
import UserService from "@/services/user";
import { message } from "@/components/Message";
import { useState } from "react";

type UserProps =Awaited<ReturnType<typeof userAuth>>;

interface UserProfilePageProps {
  userInfo: UserProps;
}

export default function UserProfilePage({ userInfo }: UserProfilePageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();
  // const [profile, setProfile] = useState(userInfo);

  // 提交留言
  const onSubmit = (data: any) => {
    UserService.update(data).then((res) => {
      message.success("更新用户信息成功！");
      // 清空留言内容
      resetField("content");
      // setRunEffect((state) => !state);
    }).catch((err) => {
      message.error(err.message || '更新用户信息失败')
    })
  };

  return (
    <Layout>
      <Head>
        <title>用户信息</title>
      </Head>
      
      <Box component='form' mb={3} textAlign="center" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{ width: '400px' }}
              variant="standard"
              label='用户名称'
              size='small'
              disabled
              defaultValue={userInfo?.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ width: '400px' }}
              variant="standard"
              label='用户邮箱'
              size='small'
              disabled
              defaultValue={userInfo?.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              sx={{ width: '400px' }}
              variant="outlined"
              label='用户昵称'
              size='small'
              placeholder="请设置用户昵称"
              defaultValue={userInfo?.nickname}
              {...register("nickname")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              sx={{ width: '400px' }}
              variant="outlined"
              label='真实姓名'
              size='small'
              placeholder="请设置真实姓名"
              defaultValue={userInfo?.realname}
              {...register("realname")}
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

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disableElevation
            >
              更新用户信息
            </Button>
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