import { KeyboardArrowRight } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Overview = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ mt: 8 }}>
            <Typography sx={{ color: '#00bfff', fontFamily: 'Poppins', fontWeight: 600 }}>
                Overview
            </Typography>
            <Typography variant='h4' sx={{ fontFamily: 'Poppins', fontWeight: 700, my: 2 }}>
                Getting started with formease
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins', lineHeight: '1.7rem' }}>
                Formease simplifies form management by securely storing and organizing your form submissions. With its intuitive interface and powerful features, you can easily collect and manage data without worrying about complex backend setup.<br /><br /> Experience the convenience of Formease - it's fast, reliable, and hassle-free.
            </Typography>
            <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                Advantages of formease
            </Typography>
            <ul>
                <li style={{ padding: '.3rem 0', fontFamily: 'Poppins' }}><span style={{ fontWeight: 700 }}>Effortless Form Handling: </span>Formease provides a seamless and user-friendly platform to handle your form submissions, saving you time and effort.</li>
                <li style={{ padding: '.3rem 0', fontFamily: 'Poppins' }}><span style={{ fontWeight: 700 }}>Secure Data Storage: </span>Your form data is securely stored with Formease, ensuring the privacy and protection of your sensitive information.</li>
                <li style={{ padding: '.3rem 0', fontFamily: 'Poppins' }}><span style={{ fontWeight: 700 }}>Cost-Effective Solution: </span>Formease provides valuable form management features at no cost, offering a cost-effective solution for your business or project.</li>
                <li style={{ padding: '.3rem 0', fontFamily: 'Poppins' }}><span style={{ fontWeight: 700 }}>Streamlined Workflow: </span>With Formease, you can easily organize and access your form submissions, allowing for efficient data management and analysis.</li>
                <li style={{ padding: '.3rem 0', fontFamily: 'Poppins' }}><span style={{ fontWeight: 700 }}>Reliable and Scalable: </span>Formease is designed to handle form submissions of any scale, ensuring reliability and scalability as your needs grow.</li>
                <li style={{ padding: '.3rem 0', fontFamily: 'Poppins' }}><span style={{ fontWeight: 700 }}>Time-Saving: </span>By automating form handling processes and providing intuitive features, Formease helps you save time and focus on other important tasks.</li>
            </ul>
            <Divider sx={{ mt: 10 }} />
            <Box sx={{ float: 'right', py: 5 }}>
                <Button
                    size='large'
                    sx={{ textTransform: 'capitalize', color: '#00bfff', fontFamily: 'Poppins', fontWeight: 600 }}
                    onClick={() => navigate('/docs/setup')}
                    endIcon={<KeyboardArrowRight />}>Setup</Button>
            </Box>
        </Box>
    )
}

export default Overview
