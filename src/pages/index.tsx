import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import useSWR from "swr";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Layout from "@/components/Layout";

import CommentList from "@/components/Comment/List";

import { useForm } from "react-hook-form";

import { message } from "@/components/Message";

import { Comment as Comment2} from '@/models'
import { useEffect } from "react";

import {query as clist} from '@/api/comment';


const TextError = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.error.light,
}));

export interface HomeProps {
  /**
   * 评论列表
   */
  comment: {
    /**
     * 总评论数
     */
    count: number;
    
    rows: any[];
  };
}

export interface FormDataProps {
  author?: string;
  email: string;
  url?: string;
  content: string;
}

export default function Home({ comment }: HomeProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 提交留言
  const onSubmit = (data: FormDataProps) => {
    console.log(`data`, data);

    // Comment.create(data as any).then(res => {
    //   message.success("提交留言成功！");
    // });
  };

  useEffect(() => {
    clist().then(res => {
      console.log('res', res);
      
    })
  }, []);


  return (
    <Layout>
      <Box
        component="form"
        mb={3}
        onSubmit={handleSubmit<FormDataProps>(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              sx={{ width: "300px" }}
              variant="outlined"
              label="姓名"
              size="small"
              {...register("author", {
                maxLength: { value: 32, message: "too long" },
              })}
            />
          </Grid>
          <Grid item xs={12} display="flex" alignItems="center">
            <TextField
              type="email"
              sx={{ width: "300px" }}
              variant="outlined"
              label="邮箱"
              size="small"
              {...register("email", {
                required: "请输入邮箱",
                maxLength: { value: 64, message: "您输入的邮箱过长" },
              })}
              error={Boolean(errors.email)}
            />

            <TextError>{errors.email ? errors.email.message : "*"}</TextError>
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ width: "300px" }}
              variant="outlined"
              label="博客"
              size="small"
              {...register("url")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={5}
              variant="outlined"
              label="内容"
              size="small"
              {...register("content", {
                required: "请填写留言内容",
                maxLength: { value: 3200, message: "您输入的留言内容过长" },
              })}
              error={Boolean(errors.content)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disableElevation
              size="small"
            >
              提交
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box mb={3}>
        <Paper variant="outlined" sx={{ padding: "10px" }}>
          目前有{comment.count}条留言
        </Paper>

        <CommentList data={comment.rows}/>
      </Box>
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

/**
 * You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time.
 * Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request,
 * and the result cannot be cached by a CDN without extra configuration.
 *
 * @returns
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res, query } = context;
  const {count, rows} = await Comment2.findAndPagination();

  // rows.map(item => {
  //   console.log(`item123`, item)
  // })

  return {
    props: {
      comment: {
        count,
        rows: rows.map(item => JSON.parse(JSON.stringify(item)))
      },
    },
  };
}
