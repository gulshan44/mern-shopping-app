import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { contextapi } from '../Contextapi';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/productpage' },
  { name: 'Blog', path: '/blog' },
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Navbar() {

  const { loginname = "Guest", setLoginName } = React.useContext(contextapi)
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedLoginName = localStorage.getItem('loginname');
    if (storedLoginName) {
      setLoginName(storedLoginName); // Set state from localStorage if available
    } else {
      setLoginName('Guest'); // Set default value to Guest if no login name is in localStorage
    }
  }, [setLoginName]);

  const settings = [
    { name: loginname || "Guest" },
    { name: 'Profile', path: '/profile' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const handleLogout = () => {
    setLoginName('Guest');
    localStorage.removeItem('loginname'); // Clear loginname from localStorage
    navigate('/'); // Redirect to homepage
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    <AppBar position="static" id="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
            <img id="logo" src="/Rockstar-logo.png" alt="Logo" />
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search item" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          {/* cart button */}

          <Link to="/cartpage">
            <IconButton aria-label="cart" color="inherit" sx={{ mr: 2 }} id='cart_icon'>
              <StyledBadge badgeContent={4} color="secondary" sx={{ mr: 2 }}>
                <ShoppingCartIcon />
              </StyledBadge>
              Cart
            </IconButton>
          </Link>

          {/* Conditional Login Button */}
          {loginname === 'Guest' && (
            <Button className='animate__animated animate__flash' variant="outlined" component={Link} to="/login" sx={{ mr: 2 }}>
              Login
            </Button>
          )}

          {/* Conditional Avatar Display */}
          {loginname !== 'Guest' && (

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings" className='animate__animated animate__flash'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={loginname} src="..." />
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
                  <MenuItem id='profile' className='m-0' key={setting.name} onClick={handleCloseUserMenu} component={Link} to={setting.path}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
                {/* Show logout only if user is logged in */}
                {loginname !== 'Guest' && (
                  <MenuItem id='profile' onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                )}
              </Menu>

            </Box>

          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;