import * as React from 'react';
import {
    AppBar, Backdrop, Box, Button, Card, CssBaseline, Divider, Drawer, IconButton, List,
    ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography
} from '@mui/material';
import { ApiRounded, DashboardRounded, Menu } from '@mui/icons-material';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import MainContentLoading from './MainContentLoading';
import CreatingFormModal from './MainPageComponents/CreateForm/Components/CreatingFormModal';
const ShowForm = React.lazy(() => import('./MainPageComponents/ShowForm/ShowForm'));
const CreateForm = React.lazy(() => import('./MainPageComponents/CreateForm/CreateForm'))
const DashboardHome = React.lazy(() => import('./MainPageComponents/DashboardHome/DashboardHome'));
const Api = React.lazy(() => import('./MainPageComponents/API/Api'))
const Settings = React.lazy(() => import('./MainPageComponents/Settings/Settings'))

const drawerWidth = 240;

function MainPage(props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [creatingFormLoad, setCreatingFormLoad] = React.useState(false)
    const [logOutLoading, setLogOutLoading] = React.useState(false);

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
            <List>
                {[{ label: 'Dashboard', icon: <DashboardRounded />, path: '/dashboard' }, { label: 'API', icon: <ApiRounded />, path: '/dashboard/api' }].map((data, index) => (
                    <ListItem key={index} disablePadding onClick={() => navigate(data.path)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {data.icon}
                            </ListItemIcon>
                            <ListItemText primary={data.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const MainContent = () => {
        switch (location.pathname) {
            case "/dashboard":
                return (
                    <React.Suspense fallback={<MainContentLoading />}>
                        <DashboardHome />
                    </React.Suspense>
                )
            case "/dashboard/settings":
                return (
                    <React.Suspense fallback={<MainContentLoading />}>
                        <Settings />
                    </React.Suspense>
                )
            case "/dashboard/api":
                return (
                    <React.Suspense fallback={<MainContentLoading />}>
                        <Api />
                    </React.Suspense>
                )
            case "/dashboard/create-new":
                return (
                    <React.Suspense fallback={<MainContentLoading />}>
                        <CreateForm setCreatingFormLoad={setCreatingFormLoad} />
                    </React.Suspense>
                )
            case "/dashboard/form":
                return (
                    <React.Suspense fallback={<MainContentLoading />}>
                        <ShowForm />
                    </React.Suspense>
                )
            default:
                return (
                    <Box sx={{
                        width: '100%',
                        mt: '5rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <Typography variant='h2' sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 900
                        }}>
                            404
                        </Typography>
                        <Typography sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 700
                        }}>WE ARE SORRY, PAGE NOT FOUND!</Typography>
                        <Button size='small' sx={{
                            bgcolor: '#00bfff',
                            color: '#fff',
                            fontFamily: 'Poppins',
                            p: '5px 20px',
                            borderRadius: '100vw',
                            mt: '.7rem',
                            border: '1px solid #00bfff',
                            ':hover': {
                                background: 'transparent',
                                color: '#00bfff',
                            }
                        }} onClick={() => navigate('/dashboard')}>
                            back to dashboard
                        </Button>
                    </Box>
                )
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
                    bgcolor: '#ebeef1',
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
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <ProfileMenu setLogOutLoading={setLogOutLoading} />
                    </Box>
                </Toolbar>
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
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
                <Toolbar />
                {/* MAIN CONTENT HERE */}
                <MainContent />
                {/* MAIN CONTENT HERE */}
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={logOutLoading}
            >
                <Card sx={{ px: 5, py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <div className='loading'></div>
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 300 }}>Signing out...</Typography>
                </Card>
            </Backdrop>
            <CreatingFormModal creatingFormLoad={creatingFormLoad} />
        </Box>
    );
}

export default MainPage;