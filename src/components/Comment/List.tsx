/*
 * 评论列表组件
 *
 * sobird<i@sobird.me> at 2021/11/25 10:32:34 created.
 */
import useSWR from "swr";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export interface CommentListProps {
  data: any[];
}

export default function CommentList({data}: CommentListProps) {
  const items = data.map(item => {
    return (
      <ListItem alignItems="flex-start" key={item.id}>
        <ListItemAvatar>
          <Avatar alt={item.author} />
        </ListItemAvatar>
        <ListItemText
          primary={`${item.author}: ${item.content}`}
          secondary={
            <>
              {/* <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary">
                  ddd
              </Typography> */}
              于 {item.createdAt} 发布
            </>
          }
        />
      </ListItem>
    )
  });
  return (
    <List sx={{ bgcolor: "background.paper" }}>

      {items}
      
    </List>
  );
}
