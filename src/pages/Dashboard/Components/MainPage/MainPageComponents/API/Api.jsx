import { ContentCopy } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardContent, Divider, IconButton, Snackbar, Typography } from '@mui/material';
import React, { lazy, useEffect, useState } from 'react'
import axiosBase from '../../../../../../config/axios';
import './Api.css'
import MainContentLoading from '../../MainContentLoading';
const RevokeApiModal = lazy(() => import('./Components/RevokeApiModal'));
const RollApiModal = lazy(() => import('./Components/RollApiModal'));

const Api = () => {

    const [revealKey, setRevealKey] = useState(false);
    const [open, setOpen] = useState(false)
    const [apiRevoked, setApiRevoked] = useState(false);
    const [loading, setLoading] = useState(false)
    const [wentWrong, setWentWrong] = useState(false)
    const [rollApiOpen, setRollApiOpen] = useState(false)
    const [revokeApiOpen, setRevokeApiOpen] = useState(false)
    const [apiKey, setApiKey] = useState(null)

    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        axiosBase.get('/get-api').then((res) => {
            if (res.data.api_revoked) {
                setApiRevoked(true)
                throw new Error(JSON.stringify({ api_revoked: true, message: 'Error: API Key is revoked' }));
            }
            setApiKey(res.data.api_key)

        }).catch((err) => {
            const errorData = JSON.parse(err.message);
            if (errorData.api_revoked) {
                setWentWrong(true)
                setApiKey(errorData.message)
            }
            else
                setApiKey("Error: Something went wrong")
        })
    }, [])

    const handleGrantApi = () => {
        setLoading(true)
        axiosBase.get('/grant-api').then((res) => {
            setLoading(false)
            setApiKey(res.data.api_key)
            setApiRevoked(false)
            setWentWrong(false)
        }).catch(() => {
            setApiKey("Error: Something went wrong")
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
                <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>API keys</Typography>
                <Typography variant='caption' sx={{ fontFamily: 'Poppins' }}>These key will allow you to authenticate API requests.</Typography>
            </Box>
            <Card>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                        <Box>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>API Key</Typography>
                            <Typography variant='body2' sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>This is the key you will need to interact with the API</Typography>
                        </Box>
                        <Box sx={{ position: 'relative' }}>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 300 }}>{apiKey}</Typography>
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                width: '100%',
                                backdropFilter: revealKey ? 'none' : 'blur(4px)',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <Button
                                    variant='contained'
                                    size='small'
                                    onClick={() => setRevealKey(true)}
                                    sx={{
                                        display: revealKey ? 'none' : 'block',
                                        bgcolor: '#fff',
                                        color: '#000',
                                        textTransform: 'capitalize',
                                        boxShadow: 'none',
                                        border: '1px solid rgba(0,0,0,0.2)',
                                        ':hover': {
                                            bgcolor: '#fff',
                                            color: '#000'
                                        }
                                    }}>Reveal API Key</Button>
                            </Box>
                        </Box>
                        <Box>
                            <IconButton aria-describedby={id} onClick={() => { setOpen(true); navigator.clipboard.writeText(apiKey) }}>
                                <ContentCopy />
                            </IconButton>
                            <Snackbar
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={open}
                                autoHideDuration={3000}
                                onClose={() => setOpen(false)}>
                                <Alert
                                    onClose={() => setOpen(false)}
                                    severity="success"
                                    variant='filled'
                                    sx={{ width: '100%' }}>
                                    API Key copied!
                                </Alert>
                            </Snackbar>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>Roll API Key</Typography>
                            <Typography
                                variant='body2'
                                sx={{ fontFamily: 'Poppins', fontWeight: 400, position: 'relative' }}>
                                It will create a new API key and delete the previous API key.
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant='contained'
                                color='error'
                                disabled={apiRevoked || wentWrong}
                                onClick={() => setRollApiOpen(true)}
                                sx={{
                                    fontFamily: 'Poppins',
                                    textTransform: 'capitalize'
                                }}>
                                Roll
                            </Button>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>Revoke API Key</Typography>
                            <Typography variant='body2' sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>It will revoke all services associated with this API key.</Typography>
                        </Box>
                        <Box>
                            <Button
                                variant='contained'
                                color='error'
                                disabled={apiRevoked || wentWrong}
                                onClick={() => setRevokeApiOpen(true)}
                                sx={{
                                    fontFamily: 'Poppins',
                                    textTransform: 'capitalize'
                                }}>
                                Revoke
                            </Button>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>Grant API Key</Typography>
                            <Typography variant='body2' sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>Grant access to previous Revoked API Key.</Typography>
                        </Box>
                        <Box>
                            <Button
                                variant='contained'
                                disabled={!apiRevoked || loading}
                                onClick={handleGrantApi}
                                sx={{
                                    bgcolor: '#f6f8fa',
                                    color: '#000',
                                    border: '1px solid rgba(0,0,0,0.2)',
                                    boxShadow: 'none',
                                    fontFamily: 'Poppins',
                                    textTransform: 'capitalize',
                                    ':hover': {
                                        bgcolor: '#f6f8fa',
                                        color: '#000'
                                    }
                                }}>
                                {loading ? <div className='loadingDark'></div> : 'Grant'}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <React.Suspense fallback={<MainContentLoading />}>
                <RollApiModal rollApiOpen={rollApiOpen} setRollApiOpen={setRollApiOpen} setApiKey={setApiKey} />
            </React.Suspense>
            <React.Suspense fallback={<MainContentLoading />}>
                <RevokeApiModal revokeApiOpen={revokeApiOpen} setApiRevoked={setApiRevoked} setRevokeApiOpen={setRevokeApiOpen} setApiKey={setApiKey} />
            </React.Suspense>
        </Box>
    )
}

export default Api
