import * as React from 'react';
import {
    AppBar, Box, CssBaseline, IconButton, Toolbar,
    Typography, Container, useTheme, Tooltip, Menu, MenuItem, Divider, ListItemIcon
} from '@mui/material';
import { GitHub, MoreVert } from '@mui/icons-material';
import './Nav.css'
import navSx from './NavSX'
import { useNavigate } from 'react-router-dom';

const navItems = ['Docs', 'Dashboard'];

function DrawerAppBar() {

    const theme = useTheme();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = (path) => {
        setAnchorEl(null);
        if (path === 'github') window.open("https://github.com/prajilk", "_blank")
        else navigate(path)
    };
    const handleGoto = (path) => {
        if (path === 'Docs') navigate('/docs')
        else navigate('/dashboard')
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{
                boxShadow: '0 0 10px rgba(0,0,0,.09)',
                background: 'transparent',
                padding: '.5rem 0',
            }} position='absolute'>
                <Container maxWidth='xl'>
                    <Toolbar>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                                size="small"
                                sx={{ [theme.breakpoints.up('sm')]: { display: 'none' }, position: 'absolute', right: 0 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <MoreVert sx={{ width: 25, height: 25, color: '#000' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={() => setAnchorEl(null)}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    borderRadius: '15px',
                                    width: '80%',
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    }
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={() => handleClose('/docs')} sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>
                                Docs
                            </MenuItem>
                            <MenuItem onClick={() => handleClose('/dashboard')} sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>
                                Dashboard
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => handleClose('github')} sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>
                                <ListItemIcon>
                                    <GitHub fontSize="small" sx={{ color: '#000' }} />
                                </ListItemIcon>
                                Github
                            </MenuItem>
                        </Menu>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                                <img src={process.env.PUBLIC_URL + 'logo.png'} alt="..." width='40px' height='30px' />
                            </Box>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={navSx.titleFirst}
                                onClick={() => navigate('/')}
                            >
                                form
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={navSx.titleSecond}
                                onClick={() => navigate('/')}
                            >
                                ease
                            </Typography>
                        </Box>
                        <Box sx={{ display: { xs: 'none', sm: 'block' }, color: '#000' }}>
                            {navItems.map((item, i) => (
                                <span onClick={() => handleGoto(item)} className='nav-button' key={i}>{item}</span>
                            ))}
                            <IconButton aria-label="github" href='https://github.com/prajilk' target='_blank' rel='noopener noreferrer' sx={{ color: '#000' }}>
                                <GitHub />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default DrawerAppBar;