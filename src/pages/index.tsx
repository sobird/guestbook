import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import useSWR from "swr";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Layout from "@/components/Layout";
import utilStyles from "@/styles/utils.module.css";


export default function Home({}) {
  //const { data = [], error } = useSWR('/api/posts', fetcher)

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      

      <Button variant="contained" size="small">
        按钮
      </Button>
      <TextField variant="outlined" label="用户" size="small" />
      <section className={utilStyles.headingMd}></section>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              p: 2,
            }}
          >
            primary.main
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              bgcolor: "secondary.main",
              color: "secondary.contrastText",
              p: 2,
            }}
          >
            secondary.main
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{ bgcolor: "error.main", color: "error.contrastText", p: 2 }}
          >
            error.main
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              bgcolor: "warning.main",
              color: "warning.contrastText",
              p: 2,
            }}
          >
            warning.main
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ bgcolor: "info.main", color: "info.contrastText", p: 2 }}>
            info.main
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              bgcolor: "success.main",
              color: "success.contrastText",
              p: 2,
            }}
          >
            success.main
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{ bgcolor: "text.primary", color: "background.paper", p: 2 }}
          >
            text.primary
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{ bgcolor: "text.secondary", color: "background.paper", p: 2 }}
          >
            text.secondary
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{ bgcolor: "text.disabled", color: "background.paper", p: 2 }}
          >
            text.disabled
          </Box>
        </Grid>
      </Grid>
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
