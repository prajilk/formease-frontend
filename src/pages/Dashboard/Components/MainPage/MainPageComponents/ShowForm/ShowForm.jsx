import { Alert, Box, Button, Chip, Skeleton, Snackbar, Tab, Tabs, Typography } from '@mui/material'
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import axiosBase from '../../../../../../config/axios'
import axios from 'axios';
import { ContentCopy, Download, Error } from '@mui/icons-material';
import TableLoading from './Components/SubmissionsTab/TableLoading';
import MainContentLoading from '../../MainContentLoading';
import DownloadOptionBox from './Components/SubmissionsTab/DownloadOptionBox';
import FormSettings from './Components/SettingsTab/FormSettings';
const Analytics = lazy(() => import('./Components/AnalyticsTab/Analytics'));
const TableView = lazy(() => import('./Components/SubmissionsTab/TableView'));

const ShowForm = () => {

    const [value, setValue] = useState(0);
    const [searchParam] = useSearchParams();
    const [isError, setIsError] = useState(false);
    const [open, setOpen] = useState(false);
    const [inValidFormId, setInValidFormId] = useState(null);
    const [formData, setFormData] = useState([]);
    const [showDownloadMenu, setshowDownloadMenu] = useState(false);
    const formId = searchParam.get('id');

    const getThisFormRef = useRef(null);

    const ENDPOINT_URL = `https://api-formease.domain.com/form?api_key=<<api_key>>&form_id=${formData?.form_id}`

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getThisFormRef.current = axios.CancelToken.source()
        axiosBase.post('/get-this-form', { form_id: formId }, { cancelToken: getThisFormRef.current?.token }).then((res) => {
            setFormData(res.data.forms[0])
        }).catch((err) => {
            if (err.code !== "ERR_CANCELED") {
                setIsError(true)
                setInValidFormId(err.response.data.message)
            }
        })

        return () => {
            getThisFormRef.current?.cancel();
        }
    }, [formId])

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ pt: 2 }}>
                        <Box>{children}</Box>
                    </Box>
                )}
            </div>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            {!inValidFormId ?
                <Box>
                    <Box sx={{ mb: 1 }}>
                        {formData?.form_name ?
                            <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>{formData?.form_name}</Typography>
                            : <Skeleton variant='h5' animation="wave" width={'250px'} sx={{ borderRadius: '5px', mb: 1 }} />
                        }
                        {formData?.form_id ?
                            <Typography variant='body2' sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>{formData?.form_id}</Typography>
                            : <Skeleton variant='body2' animation="wave" width={'200px'} sx={{ borderRadius: '5px' }} />
                        }
                        <div>
                            <Chip
                                label={ENDPOINT_URL}
                                sx={{
                                    color: '#00bfff',
                                    fontFamily: 'Poppins',
                                    fontWeight: 600,
                                    bgcolor: 'rgba(0, 191, 255, 0.08)'
                                }}
                                avatar={<ContentCopy style={{ color: '#00bfff' }} />}
                                onClick={() => { setOpen(true); navigator.clipboard.writeText(ENDPOINT_URL) }} />
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
                                    Url copied!
                                </Alert>
                            </Snackbar>
                        </div>
                    </Box>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="form details">
                            <Tab label="Submissions" sx={{ fontFamily: 'Poppins', fontWeight: 500, textTransform: 'capitalize' }} />
                            <Tab label="Analytics" sx={{ fontFamily: 'Poppins', fontWeight: 500, textTransform: 'capitalize' }} />
                            <Tab label="Settings" sx={{ fontFamily: 'Poppins', fontWeight: 500, textTransform: 'capitalize' }} />
                        </Tabs>
                    </Box>
                    {formData?.form_data?.length !== 0 ? <TabPanel value={value} index={0}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
                            <div style={{ position: 'relative' }}>
                                <Button
                                    endIcon={<Download />}
                                    size='small'
                                    variant='contained'
                                    onClick={() => setshowDownloadMenu(prev => !prev)}
                                    sx={{
                                        textTransform: 'capitalize',
                                        fontFamily: 'Poppins',
                                        bgcolor: '#00bfff',
                                        ':hover': {
                                            bgcolor: '#00bfff'
                                        }
                                    }}>Download</Button>
                                <DownloadOptionBox states={{ showDownloadMenu, setshowDownloadMenu }} formData={formData} />
                            </div>
                        </Box>
                        {formData?.form_data ? <Box>
                            <Suspense fallback={<TableLoading />}>
                                <TableView formData={formData} setFormData={setFormData} />
                            </Suspense>
                        </Box> : <MainContentLoading />}
                    </TabPanel> :
                        <TabPanel value={value} index={0}>
                            <Typography align='center' sx={{ mt: 4, fontFamily: 'Poppins' }}>No Submissions yet!</Typography>
                        </TabPanel>}
                    <TabPanel value={value} index={1}>
                        <Suspense fallback={<TableLoading />}>
                            <Analytics setIsError={setIsError} />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Suspense fallback={<TableLoading />}>
                            <FormSettings formData={formData} setFormData={setFormData} />
                        </Suspense>
                    </TabPanel>
                </Box> :
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Chip
                        label={inValidFormId}
                        avatar={<Error style={{ color: 'red' }} />}
                        color='error'
                        variant='outlined' />
                </Box>}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isError}
                autoHideDuration={3000}
                onClose={() => setIsError(false)}>
                <Alert
                    severity="error"
                    variant='filled'
                    sx={{ width: '100%' }}
                    onClose={() => setIsError(false)}>
                    Somthing went wrong!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default ShowForm
