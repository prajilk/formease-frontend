import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const func = {
    color: '#dcd997'
}
const string = {
    color: '#b76a4a'
}
const variable = {
    color: '#8bdbfe'
}

const Setup = () => {

    const navigate = useNavigate()

    return (
        <Box sx={{ mt: 8 }}>
            <Typography sx={{ color: '#00bfff', fontFamily: 'Poppins', fontWeight: 600 }}>
                Setup
            </Typography>
            <Typography variant='h4' sx={{ fontFamily: 'Poppins', fontWeight: 700, mt: 2, mb: 1 }}>
                Setup
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins', lineHeight: '1.7rem' }}>
                Follow these simple steps to set up Formease and start managing your forms effortlessly.
            </Typography>
            <Box>
                <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                    Step 1: Sign up
                </Typography>
                <Typography sx={{ fontFamily: 'Poppins', my: 1 }}>
                    Create an account on Formease's website to get started. <span onClick={() => navigate('/dashboard/register')} style={{ color: '#00bfff', cursor: 'pointer' }}>Register</span>
                </Typography>
            </Box>
            <Box>
                <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                    Step 2: Create a Form
                </Typography>
                <Typography sx={{ fontFamily: 'Poppins', my: 1 }}>
                    Create an account on Formease's website to get started. <span onClick={() => navigate('/dashboard/create-new')} style={{ color: '#00bfff', cursor: 'pointer' }}>Create now</span>
                </Typography>
            </Box>
            <Box>
                <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                    Step 3: Obtain API URL
                </Typography>
                <Typography sx={{ fontFamily: 'Poppins', my: 1 }}>
                    Formease will provide you with an API URL specifically generated for your form.
                </Typography>
                <Box sx={{ p: 3, bgcolor: 'rgba(0,0,0,0.1)', borderRadius: '10px', color: '#003A75', fontFamily: 'Poppins', border: '1px solid rgba(0,0,0,0.1)' }}>
                    <Typography>
                        https://api-formease.domain.com/form?api_key=&lt;&lt;api_key&gt;&gt;&form_id=&lt;&lt;api_key&gt;&gt;
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                    Step 4: Add API URL to your code
                </Typography>
                <Typography sx={{ fontFamily: 'Poppins', my: 1 }}>
                    Use Fetch, Axios, or similar libraries to make an HTTP POST request to the Formease API URL, passing the form data as the payload.
                </Typography>
                <Box sx={{ p: 3, bgcolor: 'rgba(0,0,0,0.1)', borderRadius: '10px', color: '#003A75', fontFamily: 'Poppins', border: '1px solid rgba(0,0,0,0.1)', mb: 3 }}>
                    <Typography>
                        ⓘ Use any HTTP Request Libraries like Fetch, Axios, Ajax etc.
                    </Typography>
                    <Typography>
                        ⓘ Method must be post (method: 'POST')
                    </Typography>
                    <Typography>
                        ⓘ Payload must be a JSON Object
                    </Typography>
                </Box>
                <Box sx={{
                    backgroundColor: '#0c2e4e',
                    padding: '1rem',
                    borderRadius: '10px',
                    color: 'gray',
                    overflow: 'scroll',
                    '::-webkit-scrollBar': {
                        display: 'none'
                    }
                }}>
                    <code>
                        <span style={func}>fetch</span><span style={{ color: '#af63cb' }}>(</span><span style={string}>'https://api-formease.domain.com/form?api_key=&lt;&lt;api_key&gt;&gt;&form_id=&lt;&lt;api_key&gt;&gt;'</span>, &#123;<br />&emsp;&emsp;
                        <span style={variable}>method:</span> <span style={string}>'POST'</span>,<br />&emsp;&emsp;
                        <span style={variable}>headers:</span> &#123;<span style={string}>'Content-Type'</span>: <span style={string}>'application/json'</span> &#125;,<br />&emsp;&emsp;
                        <span style={variable}>body:</span> <span style={variable}>JSON</span>.<span style={func}>stringify</span>(&#123;<br />&emsp;&emsp;&emsp;&emsp;
                        <span style={variable}>name:</span> <span style={string}>"Prajil"</span>,<br />&emsp;&emsp;&emsp;&emsp;
                        <span style={variable}>email:</span> <span style={string}>"prajil@gmail.com"</span>,<br />&emsp;&emsp;&emsp;&emsp;
                        <span style={variable}>message:</span> <span style={string}>"Hi, try using formeas it's free!"</span>,<br />&emsp;&emsp;
                        &#125;)<br />
                        &#125;<span style={{ color: '#af63cb' }}>)</span><br />
                        .<span style={func}>then</span><span style={{ color: '#af63cb' }}>(</span><span style={variable}>response</span> =&gt; <span style={variable}>response</span>.<span style={func}>json</span><span style={{ color: '#1985f3' }}>()</span><span style={{ color: '#af63cb' }}>)</span><br />
                        .<span style={func}>then</span><span style={{ color: '#af63cb' }}>(</span><span style={variable}>data</span> =&gt; <span style={variable}>console</span>.<span style={func}>log</span><span style={{ color: '#1985f3' }}>(</span><span style={variable}>data</span><span style={{ color: '#1985f3' }}>)</span><span style={{ color: '#af63cb' }}>)</span><br />
                        .<span style={func}>catch</span><span style={{ color: '#af63cb' }}>(</span><span style={variable}>error</span> =&gt; <span style={variable}>console</span>.<span style={func}>error</span><span style={{ color: '#1985f3' }}>(</span><span style={variable}>error</span><span style={{ color: '#1985f3' }}>)</span><span style={{ color: '#af63cb' }}>)</span>
                    </code>
                </Box>
            </Box>
            <Divider sx={{ mt: 10 }} />
            <Box sx={{ py: 5 }}>
                <Button
                    size='large'
                    sx={{ float: 'left', textTransform: 'capitalize', color: '#00bfff', fontFamily: 'Poppins', fontWeight: 600 }}
                    onClick={() => navigate('/docs')}
                    startIcon={<KeyboardArrowLeft />}>Overview</Button>
                <Button
                    size='large'
                    sx={{ float: 'right', textTransform: 'capitalize', color: '#00bfff', fontFamily: 'Poppins', fontWeight: 600 }}
                    onClick={() => navigate('/docs/response')}
                    endIcon={<KeyboardArrowRight />}>Response</Button>
            </Box>
        </Box>
    )
}

export default Setup;