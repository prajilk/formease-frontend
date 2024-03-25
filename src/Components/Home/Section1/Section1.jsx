import { Box, Container, Typography, useTheme } from '@mui/material'
import React from 'react'
import './Section1.css'

const Section1 = () => {

    const theme = useTheme();

    return (
        <section style={{ paddingBottom: '2rem' }}>
            <Container maxWidth="md">
                <Box sx={{
                    [theme.breakpoints.down('md')]: { mt: '23rem' },
                    mt: '17rem',
                    display: 'flex',
                    flexDirection: 'column',
                    mx: '.5rem',
                    gap: 8
                }}>
                    <Typography
                        variant='h6'
                        sx={{
                            [theme.breakpoints.down('md')]: { fontSize: '1.8rem', textAlign: 'left' },
                            fontSize: '3rem',
                            fontFamily: 'Poppins',
                            fontWeight: 900,
                            color: '#3a4258',
                        }}>
                        Focus on managing <span className='line-through'>Backend and Databases</span>&nbsp;&nbsp; <mark>Frontend</mark>
                    </Typography>
                    <Box>
                        <Typography
                            variant='h6'
                            sx={{
                                [theme.breakpoints.down('md')]: { fontSize: '1.3rem' },
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                fontFamily: 'Poppins',
                                color: '#3a4258',
                                mb: '.3rem'
                            }}>
                            Quick workflow
                        </Typography>
                        <Typography
                            variant='body1'
                            sx={{
                                [theme.breakpoints.down('md')]: { fontSize: '1.1rem' },
                                fontSize: '1.3rem',
                                fontWeight: 300,
                                fontFamily: 'Poppins',
                                color: '#3a4258'
                            }}>
                            Welcome to our web app that makes form management effortless. Our powerful API service stores and manages form data securely, allowing developers to focus on the frontend. With our user-friendly interface and robust features, you can streamline your workflow. Sign up for free today and see how our web app can transform your form handling processes.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </section>
    )
}

export default Section1
