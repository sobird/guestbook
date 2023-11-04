import {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { Button, TextField, Box, Grid, styled, Paper } from "@mui/material";
import useUpdateEffect from "@/hooks/useUpdateEffect";
import useCookie from "@/hooks/useCookie";
import Layout from "@/components/Layout";
import { message } from "@/components/Message";
import CommentList from "@/components/Comment/List";
import { CommentModel } from "@/models";
import CommentService from "@/services/comment";
import ProfileImage from "@/assets/profile.jpg";

const TextError = styled("div")(({ theme }) => ({
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

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const [comment, setComment] = useState(props.comment);
  const [runEffect, setRunEffect] = useState(false);

  // 提交留言
  const onSubmit = (data: FormDataProps) => {
    CommentService.create(data as any).then((res) => {
      message.success("提交留言成功！");

      // 清空留言内容
      resetField("content");
      setRunEffect((state) => !state);
    });
  };

  useUpdateEffect(() => {
    CommentService.findAllWithPagination().then((res) => {
      setComment(res as any);
    });
  }, [runEffect]);

  return (
    <Layout>
      <Box component="form" mb={3} onSubmit={handleSubmit(onSubmit)}>
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

            <TextError>
              {errors.email ? (errors.email.message as any) : "*"}
            </TextError>
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
              label="留言内容"
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
          目前共有{comment.count}条留言
        </Paper>

        <CommentList data={comment.rows} />
      </Box>

      <Image alt="" src={ProfileImage} width="600"></Image>
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
  res.setHeader("SOBIRD", 123);
  const { pn, ps } = query;

  const comment = await CommentModel.findAllWithPagination({ pn, ps });

  return {
    props: {
      comment,
    },
  };
}
