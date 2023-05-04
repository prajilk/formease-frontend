import React from 'react'
import './Error404.css'
import { Box, Button, Container, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Error404 = () => {

    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Container maxWidth='md'>
            <Box sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }}>
                <Box sx={{
                    fontFamily: "maven pro, sans-serif",
                    fontWeight: 900,
                    color: '#ececec',
                    position: 'absolute',
                    zIndex: '-1',
                    width: '100%',
                    height: '100%',
                    fontSize: '20rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: '-100px',
                    overflow: 'hidden',
                    [theme.breakpoints.down('md')]: {
                        fontSize: '11rem'
                    },
                }}>
                    404
                </Box>
                <Typography variant='h3' sx={{
                    fontFamily: "maven pro, sans-serif",
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    fontWeight: 900,
                    [theme.breakpoints.down('md')]: {
                        fontSize: '2rem'
                    },
                }}>We are sorry, page not found!</Typography>
                <Typography sx={{
                    mt: '14px',
                    fontFamily: 'maven pro, sans-serif',
                    fontWeight: 400,
                    textAlign: 'center',
                    [theme.breakpoints.down('md')]: {
                        fontSize: '.9rem'
                    },
                }}>THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME CHANGED OR IS TEMPORARILY UNAVAILABLE.</Typography>
                <Button sx={{
                    fontFamily: 'maven pro, sans-serif',
                    color: '#fff',
                    bgcolor: '#00bfff',
                    borderRadius: '100vw',
                    p: '15px 30px',
                    mt: '15px',
                    transition: '.2s all',
                    border: '2px solid #00bfff',
                    ':hover': {
                        bgcolor: '#fff',
                        color: '#00bfff'
                    },
                    [theme.breakpoints.down('md')]: {
                        p: '10px 25px'
                    },
                }} onClick={() => navigate('/')}>
                    Back to homepage
                </Button>
            </Box>
        </Container>
    )
}

export default Error404
