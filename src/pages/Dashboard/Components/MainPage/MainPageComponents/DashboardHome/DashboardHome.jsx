import { Circle, ContentCopy, Description } from '@mui/icons-material'
import { Alert, Box, Divider, IconButton, Snackbar, Typography, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import axiosBase from '../../../../../../config/axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContentLoading from '../../MainContentLoading';

const DashboardHome = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const getFormRef = useRef(null);

    const [forms, setForms] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [copied, setCopied] = useState(false);
    const [copiedError, setCopiedError] = useState(false);

    useEffect(() => {
        getFormRef.current = axios.CancelToken.source();
        axiosBase.get('/get-forms', { cancelToken: getFormRef.current?.token }).then((res) => {
            setForms(res.data.formList.reverse())
            setIsLoaded(true);
        }).catch((err) => {
            if (err.code !== "ERR_CANCELED")
                setIsError(true)
        })
        return () => {
            getFormRef.current?.cancel();
        }
    }, [setForms])

    const copyToClipboard = (e, form_id) => {
        e.stopPropagation();
        navigator.clipboard.writeText(form_id).then(() => {
            setCopied(true)
        }).catch(() => {
            setCopiedError(true);
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
                <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>Overview</Typography>
            </Box>
            <Box sx={{ overflowX: 'scroll', '::-webkit-scrollBar': { display: 'none' } }}>
                <Box sx={{
                    width: '100%',
                    [theme.breakpoints.down('md')]: { width: 'fit-content' }
                }}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ minWidth: '300px', width: '35%', height: '30px' }}>
                            <Typography sx={{ fontSize: '1rem', fontFamily: 'Poppins', fontWeight: 400, color: 'rgba(0,0,0,0.5)' }}>Name</Typography>
                        </Box>
                        <Box sx={{ minWidth: '200px', width: '30%', height: '30px' }}>
                            <Typography sx={{ fontSize: '1rem', fontFamily: 'Poppins', fontWeight: 400, color: 'rgba(0,0,0,0.5)' }}>Status</Typography>
                        </Box>
                        <Box sx={{ minWidth: '300px', width: '35%', height: '30px' }}>
                            <Typography sx={{ fontSize: '1rem', fontFamily: 'Poppins', fontWeight: 400, color: 'rgba(0,0,0,0.5)' }}>Form ID</Typography>
                        </Box>
                    </Box>
                    <Divider />
                </Box>
                {forms[0] ? forms.map((form, i) => {
                    return (
                        <Box key={i} onClick={() => navigate(`/dashboard/form?id=${form.form_id}`)} sx={{
                            ":hover": { bgcolor: 'rgba(0,0,0,0.1)', cursor: 'pointer' },
                            pt: 2,
                            width: '100%',
                            [theme.breakpoints.down('md')]: { width: 'fit-content' }
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ minWidth: '300px', width: '35%', height: '30px', display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Description sx={{ color: 'rgba(0,0,0,0.4)' }} />
                                    <Typography sx={{ fontSize: '1rem', fontFamily: 'Poppins', fontWeight: 500, whiteSpace: 'nowrap', overflowX: 'scroll', '::-webkit-scrollBar': { display: 'none' } }}>
                                        {form.form_name}
                                    </Typography>
                                </Box>
                                <Box sx={{ minWidth: '200px', width: '30%', height: '30px', display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Circle sx={{ width: '10px', height: '10px', color: form.service_cancelled ? 'red' : 'rgb(91, 222, 195)' }} />
                                    <Typography sx={{ fontSize: '1rem', fontFamily: 'Poppins', fontWeight: 500 }}>
                                        {form.service_cancelled ? 'Service Cancelled' : 'Success'}
                                    </Typography>
                                </Box>
                                <Box sx={{ minWidth: '300px', width: '35%', height: '30px', display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontSize: '1rem', fontFamily: 'Poppins', fontWeight: 500, whiteSpace: 'nowrap', overflowX: 'scroll', '::-webkit-scrollBar': { display: 'none' } }}>
                                        {form.form_id}
                                    </Typography>
                                    <IconButton sx={{ cursor: 'pointer' }} onClick={(e) => copyToClipboard(e, form.form_id)}>
                                        <ContentCopy />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Divider sx={{ pt: 2 }} />
                        </Box>
                    )
                }) :
                    isLoaded ? <Typography align='center' sx={{ fontSize: '1rem', fontFamily: 'Poppins', fontWeight: 500 }}>No forms created yet.</Typography>
                        : <Box sx={{ mt: 4 }}><MainContentLoading /></Box>}
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isError || copiedError}
                autoHideDuration={3000}
                onClose={() => { setIsError(false); setCopiedError(false); }}>
                <Alert
                    severity="error"
                    variant='filled'
                    sx={{ width: '100%' }}
                    onClose={() => { setIsError(false); setCopiedError(false); }}>
                    {isError ? "Somthing went wrong!" : "Failed to copy to clipboard!"}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={copied}
                autoHideDuration={3000}
                onClose={() => setCopied(false)}>
                <Alert
                    severity="success"
                    variant='filled'
                    sx={{ width: '100%' }}
                    onClose={() => setCopied(false)}>
                    Copied to clipboard
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default DashboardHome
