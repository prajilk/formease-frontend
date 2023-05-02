import * as React from 'react';
import {
    AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List,
    ListItem, ListItemButton, ListItemText, Toolbar, Typography
} from '@mui/material';
import { NotesRounded } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import NavMenu from './NavMenu';
import MainContentLoading from '../../Dashboard/Components/MainPage/MainContentLoading';
const API = React.lazy(() => import('./MainPageComponents/API'));
const Response = React.lazy(() => import('./MainPageComponents/Response'));
const Overview = React.lazy(() => import('./MainPageComponents/Overview'))
const Setup = React.lazy(() => import('./MainPageComponents/Setup'))

const drawerWidth = 240;

function MainPage(props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [active, setActive] = React.useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="..." width='40px' height='30px' />
                    <Typography sx={{ display: 'flex', fontFamily: 'Poppins', fontWeight: 400 }}>
                        form
                        <Typography component={'span'} variant='body1' sx={{ fontWeight: 800 }}>ease</Typography>
                    </Typography>
                </Box>
            </Toolbar>
            <Divider />
            <Box sx={{ px: { xs: 1, md: 2 }, pt: 3 }}>
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Getting Started</Typography>
                <List>
                    {[{ label: 'Overview', path: '/docs' }, { label: 'Setup', path: '/docs/setup' }, { label: 'Response', path: '/docs/response' }, { label: 'API', path: '/docs/api' }].map((data, index) => (
                        <ListItem key={index} disablePadding onClick={() => { navigate(data.path); setActive(index) }}>
                            <ListItemButton sx={{ py: 0, borderLeft: index === active ? '1px solid #00bfff' : '1px solid #e5e7eb' }}>
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography sx={{ fontSize: '.9rem', fontFamily: 'Poppins', color: index === active && '#00bfff' }}>{data.label}</Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );

    const MainContent = () => {

        React.useEffect(() => {
            if (location.pathname === '/docs') {
                setActive(0);
            } else if (location.pathname === '/docs/setup') {
                setActive(1);
            } else if (location.pathname === '/docs/response') {
                setActive(2);
            } else if (location.pathname === '/docs/api') {
                setActive(3);
            }
        }, []);

        switch (location.pathname) {
            case "/docs":
                return (
                    <React.Suspense fallback={<MainContentLoading />}>
                        <Overview />
                    </React.Suspense>
                )
            case "/docs/setup":
                return (
                    <React.Suspense fallback={<MainContentLoading />}>
                        <Setup />
                    </React.Suspense>
                )
            case "/docs/response":
                return (
                    <React.Suspense fallback={<MainContentLoading />}>
                        <Response />
                    </React.Suspense>
                )
            case "/docs/api":
                return (
                    <React.Suspense fallback={<MainContentLoading />}>
                        <API />
                    </React.Suspense>
                )
            default:
                return <h1>Dash</h1>
        }
    }

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    bgcolor: '#fff',
                    boxShadow: 'none',
                    color: '#414552'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 1, display: { md: 'none' } }}
                    >
                        <NotesRounded />
                    </IconButton>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }} onClick={() => navigate('/')}>
                        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="..." width='35px' />
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                        <NavMenu />
                    </Box>
                </Toolbar>
                <Divider />
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, bgcolor: 'rgb(247, 250, 252)', height: '100vh', overflowY: 'scroll' }}
            >
                {/* MAIN CONTENT HERE */}
                <MainContent />
                {/* MAIN CONTENT HERE */}
            </Box>
        </Box>
    );
}

export default MainPage;