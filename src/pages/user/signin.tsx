/*
 * Page: 用户登录
 *
 * sobird<i@sobird.me> at 2021/11/19 13:10:38 created.
 */
import Head from 'next/head';
import Layout from '@/components/Layout';
import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Grid, styled } from '@mui/material';
import { message } from '@/components/Message';
import UserService from '@/services/user';

const TextError = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.error.light,
}));

export default function UserSigninPage() {
  const form = useForm();
  const errors = form.formState.errors;

  const onSubmit = (values: any) => {
    UserService.signin(values).then((res) => {
      message.success("用户登录成功");
    }).catch((error) => {
      message.error(error.message);
    });
  };

  return (
    <Layout>
      <Head>
        <title>用户登录</title>
      </Head>

      <Box component='form' mb={3} onSubmit={form.handleSubmit(onSubmit)} textAlign="center">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{ width: '400px' }}
              variant='outlined'
              label='用户名称'
              size='small'
              {...form.register('username', {
                required: '请输入用户名称',
              })}
              error={Boolean(errors.username)}
            />
            {errors.username ? <TextError>{errors.username.message as any}</TextError> : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type='password'
              sx={{ width: '400px' }}
              variant='outlined'
              label='登录密码'
              size='small'
              {...form.register('password', {
                required: '请输入登录密码',
              })}
              error={Boolean(errors.password)}
            />
            {errors.password ? <TextError>{errors.password.message as any}</TextError> : null}
          </Grid>

          <Grid item xs={12}>
            <Button type='submit' variant='contained' disableElevation>
              登录
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

