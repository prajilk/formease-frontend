import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { GitHub, MoreVert } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const navItems = ['Dashboard', 'Docs', 'Contact', 'Login'];
const navMenuStyle = {
    fontFamily: 'Poppins',
    fontWeight: 600,
    marginRight: '1.7rem',
    cursor: 'pointer'
}

export default function NavMenu() {

    const theme = useTheme();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (path) => {
        setAnchorEl(null);
        if (path === 'github') window.open("https://github.com/prajilk", "_blank")
        else if (path !== null) navigate(path)
    };
    const handleGoto = (path) => {
        if (path === 'Contact') navigate('/contact')
        else if (path === 'Login') navigate('/dashboard/login')
        else if (path === 'Dashboard') navigate('/dashboard')
        else navigate('/docs')
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Box sx={{ display: { xs: 'none', sm: 'block' }, color: '#000' }}>
                    {navItems.map((item, i) => (
                        <span onClick={() => handleGoto(item)} style={navMenuStyle} key={i}>{item}</span>
                    ))}
                    <IconButton aria-label="github" href='https://github.com/prajilk' target='_blank' rel='noopener noreferrer' sx={{ color: '#000' }}>
                        <GitHub />
                    </IconButton>
                </Box>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ [theme.breakpoints.up('sm')]: { display: 'none' }, position: 'absolute', right: 0 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <MoreVert sx={{ width: 25, height: 25, color: '#000' }} />
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={() => handleClose(null)}
                onClick={() => handleClose(null)}
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
                <MenuItem onClick={() => handleClose('/dashboard')} sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    Dashboard
                </MenuItem>
                <MenuItem onClick={() => handleClose('/docs')} sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    Docs
                </MenuItem>
                <MenuItem onClick={() => handleClose('/contact')} sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    Contact
                </MenuItem>
                <MenuItem onClick={() => handleClose('/dashboard/login')} sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    Login
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleClose('github')} sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>
                    <ListItemIcon>
                        <GitHub fontSize="small" sx={{ color: '#000' }} />
                    </ListItemIcon>
                    Github
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}