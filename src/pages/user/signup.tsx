/*
 * Page: 用户注册
 *
 * sobird<i@sobird.me> at 2021/11/19 13:10:38 created.
 */
import Head from 'next/head';
import Layout from '@/components/Layout';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';
import { Button, TextField, Box, Grid, styled } from '@mui/material';
import FieldCaptcha from '@/components/field-captcha';
import { message } from '@/components/Message';
import UserService from '@/services/user';

const TextError = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.error.light,
}));

const onSubmit = (values: any) => {
  UserService.signup(values).then(() => {
    message.success('注册成功');
    // 登录成功跳到首页
  }).catch(err => {
    message.error(err.message)
  });
};

export default function UserSignup() {
  const form = useForm({
    reValidateMode: 'onChange',
  });
  const errors = form.formState.errors;
  return (
    <Layout>
      <Head>
        <title>用户注册</title>
      </Head>

      <Box component='form' mb={3} onSubmit={form.handleSubmit(onSubmit)} textAlign='center'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              sx={{ width: '400px' }}
              variant='outlined'
              label='用户名称'
              size='small'
              {...form.register('username', {
                required: '请输入用户名',
                minLength: { value: 4, message: '用户名不能低于4位' },
                maxLength: { value: 64, message: '您输入的用户名过长' },
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
              label='用户密码'
              size='small'
              {...form.register('password', {
                required: '请输入用户密码',
                minLength: { value: 6, message: '密码长度不能低于6位' },
                maxLength: { value: 64, message: '您输入的用户密码过长' },
              })}
              error={Boolean(errors.password)}
            />
            {errors.password ? <TextError>{errors.password.message as any}</TextError> : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type='password'
              sx={{ width: '400px' }}
              variant='outlined'
              label='密码确认'
              size='small'
              {...form.register('password2', {
                validate: async (value, values) => {
                  if (values.password !== value) {
                    return '两次输入的密码不一致';
                  }
                },
              })}
              error={Boolean(errors.password)}
            />
            {errors.password2 ? <TextError>{errors.password2.message as any}</TextError> : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type='email'
              sx={{ width: '400px' }}
              variant='outlined'
              label='用户邮箱'
              size='small'
              {...form.register('email', {
                required: '请输入邮箱',
                maxLength: { value: 64, message: '您输入的邮箱过长' },
              })}
              error={Boolean(errors.email)}
            />
            {errors.email ? <TextError>{errors.email.message as any}</TextError> : null}
          </Grid>
          <Grid item xs={12}>
            <FieldCaptcha propName='email' form={form} />
            {errors.code ? <TextError>{errors.code.message as any}</TextError> : null}
          </Grid>

          <Grid item xs={12}>
            <Button type='submit' variant='contained' disableElevation>
              注册
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
