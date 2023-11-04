import Link from 'next/link';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Search from "../Search";

export default function Header() {
  return (
    <Box mb={3}>
      <AppBar
        sx={{ borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
        position="static"
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{color: "#fff", textDecoration: "none"}}>Next.js + SQLite 留言系统</Link>
          </Typography>
          <Search />

          <Link href="/user/signin" style={{color: "#fff"}}><Button color="inherit">登录</Button></Link>
          <Link href="/user/signup" style={{color: "#fff"}}><Button color="inherit">注册</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;

  console.log('context', context)
  // const user = await userAuth(req, res);

  // if (!user) {
  //   return {
  //     redirect: {
  //       destination: "/user/signin",
  //       permanent: false,
  //     },
  //   };
  // }

  // return {
  //   props: {
  //     user: user,
  //   },
  // };
}