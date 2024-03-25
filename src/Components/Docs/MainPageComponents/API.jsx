import { KeyboardArrowLeft } from '@mui/icons-material'
import { Box, Button, Divider, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const API = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ mt: 8 }}>
            <Typography sx={{ color: '#00bfff', fontFamily: 'Poppins', fontWeight: 600 }}>
                API
            </Typography>
            <Typography variant='h4' sx={{ fontFamily: 'Poppins', fontWeight: 700, mt: 2, mb: 1 }}>
                API Service docs
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins', lineHeight: '1.7rem' }}>
                When a user creates an account, a unique API key is automatically generated. This API key serves as a secure identifier and authentication mechanism for the user's account. <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={() => navigate('/dashboard/api')}>Go to API</span>
            </Typography>
            <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                Roll API Key
            </Typography>
            <ul>
                <li>
                    <Typography sx={{ fontFamily: 'Poppins', lineHeight: '1.7rem' }}>
                        Rolling an API key involves the generation of a new unique key while simultaneously invalidating and removing the previously assigned API key. This process is undertaken to enhance security and access control for the user's account. By generating a new API key and invalidating the previous one, the system ensures that only the most recent and authorized key is valid for authentication and interaction with the API services. Rolling API keys on a regular basis is a recommended security practice to mitigate the risk of unauthorized access and maintain the integrity of the user's account.
                    </Typography>
                </li>
            </ul>
            <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                Revoke API Key
            </Typography>
            <ul>
                <li>
                    <Typography sx={{ fontFamily: 'Poppins', lineHeight: '1.7rem' }}>
                        Revoking an API key involves the revocation of all services associated with the specific API key. This process is performed to enforce access control and ensure the security of the user's account. By revoking all services associated with the API key, the system effectively terminates any active authorizations and permissions granted to that key. This measure helps safeguard against potential misuse or unauthorized access to services, maintaining the overall security posture of the user's account and protecting the integrity of the associated resources.
                    </Typography>
                </li>
            </ul>
            <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 5 }}>
                Grant API Key
            </Typography>
            <ul>
                <li>
                    <Typography sx={{ fontFamily: 'Poppins', lineHeight: '1.7rem' }}>
                        Granting access to a previously revoked API key reinstates the privileges and permissions associated with that key. This process is carried out to provide authorized access to services for the specified API key. By granting access to a revoked API key, the system effectively restores the previous level of authorization, allowing the key to interact with the designated services once again. This action is typically taken when there is a legitimate need to reinstate access for the API key, such as resolving issues or fulfilling specific requirements
                    </Typography>
                </li>
            </ul>

            <Divider sx={{ mt: 10 }} />
            <Box sx={{ py: 5 }}>
                <Button
                    size='large'
                    sx={{ float: 'left', textTransform: 'capitalize', color: '#00bfff', fontFamily: 'Poppins', fontWeight: 600 }}
                    onClick={() => navigate('/docs/response')}
                    startIcon={<KeyboardArrowLeft />}>Response</Button>
            </Box>
        </Box>
    )
}

export default API
