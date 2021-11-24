import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import useSWR from "swr";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Layout from "@/components/Layout";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home({}) {
  //const { data = [], error } = useSWR('/api/posts', fetcher)

  return (
    <Layout>
      <Box component="form" mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{ width: "300px" }}
              variant="outlined"
              label="姓名"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ width: "300px" }}
              variant="outlined"
              label="邮箱"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ width: "300px" }}
              variant="outlined"
              label="博客"
              size="small"
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
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" disableElevation size="small">提交</Button>
          </Grid>
        </Grid>
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
  const { req, res } = context;
  return {
    props: {},
  };
}
