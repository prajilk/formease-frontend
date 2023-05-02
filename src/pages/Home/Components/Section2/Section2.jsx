import { Box, Button, Container, Typography, useTheme } from '@mui/material'
import React from 'react'
import './Section2.css'
import CodeAnim from '../../../../codeAnim/CodeAnim';
import { NavigateNext } from '@mui/icons-material';
import { docsBtn, content, heading } from './Section2Sx'
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const Section2 = () => {

    const { ref, inView } = useInView();
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <section className='section2'>
            <Container maxWidth='lg'>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Box sx={{
                        textAlign: 'left',
                        [theme.breakpoints.down('md')]: {
                            width: '100%',
                            pt: 10
                        },
                        width: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        mb: 3
                    }}>
                        <Typography sx={{ color: '#00bfff', fontFamily: 'Poppins', fontWeight: 600 }}>
                            Designed for Developers
                        </Typography>
                        <Typography sx={heading}>
                            Simplify your development process with our easy-to-use API
                        </Typography>
                        <Typography sx={content}>
                            Say goodbye to the complexities of form management with our unified platform. We handle the details of form submissions and data storage, so you can focus on building your website. Our robust and scalable API solutions make form management effortless, so you can streamline your workflow and boost productivity. With our user-friendly interface and secure data handling, you can trust us to manage your form submissions with ease. Sign up today and experience the ease of our powerful form management solution.
                        </Typography>
                        <Button variant='contained' onClick={() => navigate('/docs')} sx={docsBtn} endIcon={<NavigateNext />}>
                            docs
                        </Button>
                    </Box>
                    <Box sx={{ [theme.breakpoints.down('md')]: { width: '100%' }, width: '50%' }} ref={ref}>
                        {inView && <CodeAnim />}
                    </Box>
                </Box>
            </Container>
        </section>
    )
}

export default Section2
