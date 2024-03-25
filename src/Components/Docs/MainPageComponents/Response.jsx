import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Response = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ mt: 8 }}>
            <Typography sx={{ color: '#00bfff', fontFamily: 'Poppins', fontWeight: 600 }}>
                Response
            </Typography>
            <Typography variant='h4' sx={{ fontFamily: 'Poppins', fontWeight: 700, my: 2 }}>
                Server response
            </Typography>
            <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5, color: 'rgb(91, 222, 195)' }}>
                Success response
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins', lineHeight: '1.7rem' }}>
                Server response a JSON object whenever a new form submisson was successful
            </Typography>
            <Box sx={{
                backgroundColor: '#0c2e4e',
                padding: '1rem',
                borderRadius: '10px',
                color: '#fff',
                whiteSpace: 'nowrap',
                mt: 2,
                overflow: 'scroll',
                '::-webkit-scrollBar': {
                    display: 'none'
                }
            }}>
                <code>
                    <span style={{ color: '#af63cb' }}>&#123;</span><br />&emsp;&emsp;
                    <span style={{ color: '#8bdbfe' }}>success:</span> <span style={{ color: 'rgb(124, 145, 249)' }}>true</span>,<br />&emsp;&emsp;
                    <span style={{ color: '#8bdbfe' }}>message:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"Form submission saved successfully"</span>,<br />&emsp;&emsp;
                    <span style={{ color: '#8bdbfe' }}>formId:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"6eaa51a0029f"</span>,<br />&emsp;&emsp;
                    <span style={{ color: '#8bdbfe' }}>submissionId:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"64412882cpd327719c3d70a6"</span>,<br />&emsp;&emsp;
                    <span style={{ color: '#8bdbfe' }}>sendMail:</span> <span style={{ color: 'rgb(124, 145, 249)' }}>true</span>,<br />
                    <span style={{ color: '#af63cb' }}>&#125;</span>
                </code>
            </Box>
            <Typography color='error' variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                Error response
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins', lineHeight: '1.7rem' }}>
                Server returns a JSON object whenever an error occurs during form submission. The JSON object includes the details of the error.
            </Typography>
            <ul>
                <li>
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                        Invalid API
                    </Typography>
                    <Box sx={{
                        backgroundColor: '#0c2e4e',
                        padding: '1rem',
                        borderRadius: '10px',
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        mt: 2,
                        overflow: 'scroll',
                        '::-webkit-scrollBar': {
                            display: 'none'
                        }
                    }}>
                        <code>
                            <span style={{ color: '#af63cb' }}>&#123;</span><br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>status_code:</span> <span style={{ color: 'rgb(124, 145, 249)' }}>403</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>code:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"FORBIDDEN"</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>message:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"Invalid API Key"</span>,<br />
                            <span style={{ color: '#af63cb' }}>&#125;</span>
                        </code>
                    </Box>
                    <Typography variant='caption' sx={{ fontFamily: 'Poppins' }}>
                        Verify the API key in the endpoint URL before using. <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={() => navigate('/dashboard/api')}>Go to API</span>
                    </Typography>
                </li>
                <li>
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                        Invalid form ID
                    </Typography>
                    <Box sx={{
                        backgroundColor: '#0c2e4e',
                        padding: '1rem',
                        borderRadius: '10px',
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        mt: 2,
                        overflow: 'scroll',
                        '::-webkit-scrollBar': {
                            display: 'none'
                        }
                    }}>
                        <code>
                            <span style={{ color: '#af63cb' }}>&#123;</span><br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>status_code:</span> <span style={{ color: 'rgb(124, 145, 249)' }}>403</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>code:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"FORBIDDEN"</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>message:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"Invalid form id"</span>,<br />
                            <span style={{ color: '#af63cb' }}>&#125;</span>
                        </code>
                    </Box>
                    <Typography variant='caption' sx={{ fontFamily: 'Poppins' }}>
                        Verify the Form ID in the endpoint URL before using. <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Go to Dashboard</span>
                    </Typography>
                </li>
                <li>
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                        API Key revoked
                    </Typography>
                    <Box sx={{
                        backgroundColor: '#0c2e4e',
                        padding: '1rem',
                        borderRadius: '10px',
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        mt: 2,
                        overflow: 'scroll',
                        '::-webkit-scrollBar': {
                            display: 'none'
                        }
                    }}>
                        <code>
                            <span style={{ color: '#af63cb' }}>&#123;</span><br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>status_code:</span> <span style={{ color: 'rgb(124, 145, 249)' }}>403</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>code:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"FORBIDDEN"</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>message:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"API Key revoked"</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>api_revoked:</span> <span style={{ color: 'rgb(124, 145, 249)' }}>true</span>,<br />
                            <span style={{ color: '#af63cb' }}>&#125;</span>
                        </code>
                    </Box>
                    <Typography variant='caption' sx={{ fontFamily: 'Poppins' }}>
                        Check out API Service. <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={() => navigate('/docs/api')}>Go to API docs</span>
                    </Typography>
                </li>
                <li>
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                        Form service stopped
                    </Typography>
                    <Box sx={{
                        backgroundColor: '#0c2e4e',
                        padding: '1rem',
                        borderRadius: '10px',
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        mt: 2,
                        overflow: 'scroll',
                        '::-webkit-scrollBar': {
                            display: 'none'
                        }
                    }}>
                        <code>
                            <span style={{ color: '#af63cb' }}>&#123;</span><br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>status_code:</span> <span style={{ color: 'rgb(124, 145, 249)' }}>403</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>code:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"FORBIDDEN"</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>message:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"Form service currently stopped"</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>service_cancelled:</span> <span style={{ color: 'rgb(124, 145, 249)' }}>true</span>,<br />
                            <span style={{ color: '#af63cb' }}>&#125;</span>
                        </code>
                    </Box>
                    <Typography variant='caption' sx={{ fontFamily: 'Poppins' }}>
                        Turn on the form service from form settings. <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Go to Dashboard</span>
                    </Typography>
                </li>
                <li>
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                        Empty payload
                    </Typography>
                    <Box sx={{
                        backgroundColor: '#0c2e4e',
                        padding: '1rem',
                        borderRadius: '10px',
                        color: '#fff',
                        mt: 2,
                        whiteSpace: 'nowrap',
                        overflow: 'scroll',
                        '::-webkit-scrollBar': {
                            display: 'none'
                        }
                    }}>
                        <code>
                            <span style={{ color: '#af63cb' }}>&#123;</span><br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>status_code:</span> <span style={{ color: 'rgb(124, 145, 249)' }}>400</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>code:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"BAD REQUEST"</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>message:</span> <span style={{ color: 'rgb(91, 222, 195)' }}>"Empty form data"</span>,<br />&emsp;&emsp;
                            <span style={{ color: '#8bdbfe' }}>form_data:</span> <span style={{ color: 'rgb(124, 145, 249)' }}>&#123;&#125;</span>,<br />
                            <span style={{ color: '#af63cb' }}>&#125;</span>
                        </code>
                    </Box>
                    <Typography variant='caption' sx={{ fontFamily: 'Poppins' }}>
                        Payload must not be an empty object.
                    </Typography>
                </li>
            </ul>
            <Divider sx={{ mt: 10 }} />
            <Box sx={{ py: 5 }}>
                <Button
                    size='large'
                    sx={{ float: 'left', textTransform: 'capitalize', color: '#00bfff', fontFamily: 'Poppins', fontWeight: 600 }}
                    onClick={() => navigate('/docs/setup')}
                    startIcon={<KeyboardArrowLeft />}>Setup</Button>
                <Button
                    size='large'
                    sx={{ float: 'right', textTransform: 'capitalize', color: '#00bfff', fontFamily: 'Poppins', fontWeight: 600 }}
                    onClick={() => navigate('/docs/api')}
                    endIcon={<KeyboardArrowRight />}>API</Button>
            </Box>
        </Box>
    )
}

export default Response
