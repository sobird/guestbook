/*
 * 用户登录
 *
 * sobird<i@sobird.me> at 2021/11/19 13:10:38 created.
 */
import Head from 'next/head';
import Layout from '@/components/Layout';
import axios from '@/lib/axios';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';
import { Button, TextField, Box, Grid, styled } from '@mui/material';
import FieldCaptcha from '@/components/field-captcha';
import CommonService from '@/services/common';
import { message } from '@/components/Message';

function register(data: any) {
  return axios.post('/api/user/register', data);
}

const TextError = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.error.light,
}));

export default function UserLoginPage() {
  const form = useForm();
  const errors = form.formState.errors;

  const onSubmit = (values: any) => {
    // register(values).then(res => {
    // });
    CommonService.verifyCaptcha(values).then((res) => {
      
    }).catch(() => {
      message.error('验证失败');
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
              type='email'
              sx={{ width: '400px' }}
              variant='outlined'
              label='邮箱'
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
            <FieldCaptcha propName="email" form={form}/>
            {errors.code ? <TextError>{errors.code.message as any}</TextError> : null}
          </Grid>

          <Grid item xs={12}>
            <Button type='submit' variant='contained' disableElevation size='small'>
              注册
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

