import { InferGetServerSidePropsType, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import * as Material from '@mui/material';
import { Button, TextField, Box, Grid, styled, Paper } from '@mui/material';
import useUpdateEffect from '@/hooks/useUpdateEffect';
import useCookie from '@/hooks/useCookie';
import Layout from '@/components/Layout';
import { message } from '@/components/Message';
import CommentList from '@/components/Comment/List';
import { CommentModel } from '@/models';
import CommentService from '@/services/comment';
import ProfileImage from '@/assets/profile.jpg';
import indexMdxRaw from '!raw-loader!./index.mdx';
import Editor, { loader } from '@monaco-editor/react';
import Mdx from '@/components/mdx';
import { useAppSelector } from '@/store/hooks';

const monacoConfig = {
  paths: {
    vs: 'https://unpkg.com/monaco-editor@0.44.0/min/vs',
  },
};

loader.config(monacoConfig);

const TextError = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.error.light,
}));

export interface FormDataProps {
  author?: string;
  email: string;
  url?: string;
  content: string;
}

// export async function query(data?) {
//   return axios.get('/api/comments', {
//     params: data,
//   });
// }

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm({
    defaultValues: {
      content: indexMdxRaw
    }
  });

  const { userProfile } = useAppSelector(state => state.app);

  const [comment, setComment] = useState(props.comment);
  const [content, setComtent] = useState('');
  const [runEffect, setRunEffect] = useState(false);

  // 提交留言
  const onSubmit = (data: FormDataProps) => {
    if(!userProfile.username) {
      message.error('只有登录用户才可留言！');
      return;
    }
    CommentService.create(data as any).then(res => {
      message.success('提交留言成功！');

      // 清空留言内容
      resetField('content');
      setRunEffect(state => !state);
    });
  };

  useUpdateEffect(() => {
    CommentService.findAllWithPagination().then(res => {
      setComment(res as any);
    });
  }, [runEffect]);

  return (
    <Layout>
      <Grid item xs={12} mb={3}>
          <Mdx value={content || indexMdxRaw} components={{
            ...Material
          }} />
      </Grid>

      <Box component='form' mb={3} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Editor
              theme='vs-dark'
              height='40vh'
              defaultLanguage='mdx'
              defaultValue={indexMdxRaw}
              onChange={(value) => {
                setValue('content', value);
                setComtent(value)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button disabled={!userProfile.username} type='submit' variant='contained' disableElevation>
              提交
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box mb={3}>
        <Paper variant='outlined' sx={{ padding: '10px' }}>
          目前共有{comment.count}条留言
        </Paper>

        <CommentList data={comment.rows} />
      </Box>

      <Image alt='' src={ProfileImage} width='600'></Image>
    </Layout>
  );
}

/**
 * Because it’s meant to be run at build time,
 * you won’t be able to use data that’s only available during request time,
 * such as query parameters or HTTP headers.
 *
 * @returns
 */
// export async function getStaticProps(context) {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }
// import { parseBody } from 'next/dist/server/api-utils';
/**
 * You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time.
 * Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request,
 * and the result cannot be cached by a CDN without extra configuration.
 *
 * @returns
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res, query } = context;
  res.setHeader('SOBIRD', 123);
  const { pn, ps } = query;

  const comment = await CommentModel.findAllWithPagination({ pn, ps });

  return {
    props: {
      comment,
    },
  };
}
