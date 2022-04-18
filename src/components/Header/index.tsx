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
            Next.js + SQLite 留言系统
          </Typography>
          <Search />
          <Button color="inherit">登录</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
