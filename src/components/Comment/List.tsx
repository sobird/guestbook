/*
 * 评论列表组件
 *
 * sobird<i@sobird.me> at 2021/11/25 10:32:34 created.
 */
import useSWR from 'swr';
import {List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar} from '@mui/material';
import * as Material from '@mui/material';
import Mdx from '@/components/mdx';

export interface CommentListProps {
  data: any[];
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  if (!name) {
    return {};
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')?.[1]?.[0] || ''}`,
  };
}

export default function CommentList({ data }: CommentListProps) {
  const items = data?.map(item => {
    return (
      <ListItem alignItems='flex-start' key={item.id}>
        <ListItemAvatar>
          <Avatar alt={item.author} {...stringAvatar(item.email)} />
        </ListItemAvatar>
        <ListItemText
          primary={<Mdx value={item.content} components={{
            ...Material
          }}/>}
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
    );
  });
  return <List sx={{ bgcolor: 'background.paper' }}>{items}</List>;
}
