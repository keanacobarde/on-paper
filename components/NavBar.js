/* eslint-disable max-len */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';

const pages = ['Dashboard', 'Timeline'];
const settings = ['Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            OnPaper
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            />
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            OnPaper
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => router.push(`/${page.toLowerCase()}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="16" fill="#63B3ED" />
                  <path d="M8.77912 20V11.2727H10.0959V15.4403H10.2024L13.8629 11.2727H15.5206L12.0007 15.2017L15.5334 20H13.9482L11.1271 16.1009L10.0959 17.2855V20H8.77912ZM23.5629 14.1108H22.2333C22.1822 13.8267 22.087 13.5767 21.9478 13.3608C21.8086 13.1449 21.6381 12.9616 21.4364 12.8111C21.2347 12.6605 21.0089 12.5469 20.7589 12.4702C20.5117 12.3935 20.2489 12.3551 19.9705 12.3551C19.4677 12.3551 19.0174 12.4815 18.6197 12.7344C18.2248 12.9872 17.9123 13.358 17.6822 13.8466C17.4549 14.3352 17.3413 14.9318 17.3413 15.6364C17.3413 16.3466 17.4549 16.946 17.6822 17.4347C17.9123 17.9233 18.2262 18.2926 18.6239 18.5426C19.0217 18.7926 19.4691 18.9176 19.9663 18.9176C20.2418 18.9176 20.5032 18.8807 20.7504 18.8068C21.0004 18.7301 21.2262 18.6179 21.4279 18.4702C21.6296 18.3224 21.8001 18.142 21.9393 17.929C22.0813 17.7131 22.1793 17.4659 22.2333 17.1875L23.5629 17.1918C23.4918 17.6207 23.354 18.0156 23.1495 18.3764C22.9478 18.7344 22.6879 19.044 22.3697 19.3054C22.0543 19.5639 21.6935 19.7642 21.2873 19.9062C20.881 20.0483 20.4379 20.1193 19.9577 20.1193C19.2021 20.1193 18.5288 19.9403 17.9379 19.5824C17.3469 19.2216 16.881 18.706 16.5401 18.0355C16.2021 17.3651 16.033 16.5653 16.033 15.6364C16.033 14.7045 16.2035 13.9048 16.5444 13.2372C16.8853 12.5668 17.3512 12.0526 17.9421 11.6946C18.533 11.3338 19.2049 11.1534 19.9577 11.1534C20.4208 11.1534 20.8526 11.2202 21.2532 11.3537C21.6566 11.4844 22.0188 11.6776 22.3398 11.9332C22.6609 12.1861 22.9265 12.4957 23.1367 12.8622C23.3469 13.2259 23.489 13.642 23.5629 14.1108Z" fill="black" />
                </svg>

              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={signOut}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
