import { useContext, useState } from 'react';
import Link from 'next/link';
import { Avatar, Box, AppBar, Toolbar, Button, Menu, MenuItem, Typography } from '@mui/material';
import Search from '../Search';
import { useAppSelector } from '@/store/hooks';

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

export default function Header() {
  const { userProfile } = useAppSelector(state => state.app);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box mb={3}>
      <AppBar sx={{ borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }} position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link href='/' style={{ color: '#fff', textDecoration: 'none' }}>
              Next.js + SQLite 留言系统
            </Link>
          </Typography>
          <Search />

          {userProfile.username ? (
            <>
              <Avatar
                aria-describedby={id}
                alt={userProfile.username}
                {...stringAvatar(userProfile.username)}
                onClick={handleClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Link href='/user/profile' style={{ color: '#333', textDecoration: 'none' }}>
                  <MenuItem onClick={handleClose}>{userProfile.username}</MenuItem>
                </Link>
                <a href='/user/logout' style={{ color: '#333', textDecoration: 'none' }}>
                  <MenuItem onClick={handleClose}>退出</MenuItem>
                </a>
              </Menu>
            </>
          ) : (
            <>
              <Link href='/user/signin' style={{ color: '#fff' }}>
                <Button color='inherit'>登录</Button>
              </Link>
              <Link href='/user/signup' style={{ color: '#fff' }}>
                <Button color='inherit'>注册</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
