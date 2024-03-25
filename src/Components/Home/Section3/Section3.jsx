import React from 'react'
import { Box, Container, Grid, Typography, useTheme } from '@mui/material'
import './Section3.css'
import GearSVG from './svgs/Gear/GearSVG';
import LockSVG from './svgs/Lock/LockSVG';
import PuzzleSVG from './svgs/Puzzle/PuzzleSVG';
import TagSVG from './svgs/Tag/TagSVG';
import { headings, des } from './Section3Sx';

const Section3 = () => {

    const theme = useTheme();

    return (
        <section className='section3'>
            <Container maxWidth='md'>
                <Box>
                    <Typography
                        variant='h2'
                        sx={{
                            [theme.breakpoints.down('md')]: { fontSize: '1.6rem' },
                            fontSize: '2rem',
                            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                            fontWeight: 800,
                            letterSpacing: '-0.025rem'
                        }}>
                        Why use Formease
                    </Typography>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', px: 2 }}>
                            <GearSVG w={80} h={80} />
                            <Typography sx={headings}>
                                Robust and Scalable
                            </Typography>
                            <Typography sx={des}>
                                Our API services are built to last, providing you with a reliable and scalable platform for your web applications.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', px: 2 }}>
                            <PuzzleSVG w={80} h={80} />
                            <Typography sx={headings}>
                                Easy to integrate
                            </Typography>
                            <Typography sx={des}>
                                The API was built for developers. You only need to add the API URL into your form on submit to be up and running.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', px: 2 }}>
                            <TagSVG w={80} h={80} />
                            <Typography sx={headings}>
                                Free of Cost
                            </Typography>
                            <Typography sx={des}>
                                Effortlessly store and manage form submissions for free, with secure encryption and easy-to-use API.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', px: 2 }}>
                            <LockSVG w={80} h={80} />
                            <Typography sx={headings}>
                                Secure and Trustworthy
                            </Typography>
                            <Typography sx={des}>
                                We encrypt your form data to ensure security and privacy. Trust us with your sensitive information.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </section>
    )
}

export default Section3
