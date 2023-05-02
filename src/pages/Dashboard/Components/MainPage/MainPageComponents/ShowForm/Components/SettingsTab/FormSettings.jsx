import { Edit } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardContent, Grid, Snackbar, Switch, Typography } from '@mui/material';
import React, { lazy, useRef, useState } from 'react'
import './style.css'
import '../../../Settings/Settings.css'
import axios from 'axios'
import { profileEditButton } from '../../../Settings/SettingsSx';
import axiosBase from '../../../../../../../../config/axios';
import MainContentLoading from '../../../../MainContentLoading'
const DeleteFormModal = lazy(() => import('./DeleteFormModal'));

const FormSettings = ({ formData, setFormData }) => {

    const [formName, setFormName] = useState();
    const [isChanged, setIsChanged] = useState(false);
    const [isEditForm, setIsEditForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [stopServiceLoading, setStopServiceLoading] = useState(false);
    const [startServiceLoading, setStartServiceLoading] = useState(false);
    const [deleteFormOpen, setDeleteFormOpen] = useState(false)
    const [editFormStatus, setEditFormStatus] = useState(false);
    const [editFormLabel, setEditFormLabel] = useState({});
    const [sendMailLoad, setSendMailLoad] = useState(false);

    const cancelEditRef = useRef(null);

    const saveFormBtn = { ...profileEditButton, bgcolor: '#00bfff', color: '#fff', ':hover': { bgcolor: '#00bfff' } }
    const deleteFormBtn = { ...profileEditButton, bgcolor: '#d32f2f', color: '#fff', ':hover': { bgcolor: '#d32f2f' } }

    const handleChange = (e) => {
        if (e.target.value !== formData.form_name) setIsChanged(true);
        else setIsChanged(false)
    }

    const editSendMail = (value) => {
        setSendMailLoad(true);
        axiosBase.post('/change-send-mail', { formId: formData?.form_id, value }).then(() => {
            setSendMailLoad(false);
            setFormData(prev => {
                return { ...prev, send_mail: value }
            })
        }).catch(() => {
            setSendMailLoad(false);
            setEditFormStatus(true)
            setEditFormLabel({ state: 'error', label: 'Something went wrong!' })
        })
    }

    const editForm = () => {
        setLoading(true)
        cancelEditRef.current = axios.CancelToken.source();
        axiosBase.post('/edit-form', { formName, formId: formData?.form_id }, { cancelToken: cancelEditRef.current.token }).then((response) => {
            if (response.status === 200) {
                setFormData(prev => {
                    return { ...prev, form_name: formName }
                })
                setLoading(false)
                setIsChanged(false)
                setIsEditForm(false)
                setEditFormStatus(true)
                setEditFormLabel({ state: 'success', label: 'Form updated successfully' })
            }
        }).catch(() => {
            setEditFormStatus(true)
            setEditFormLabel({ state: 'error', label: 'Something went wrong!' })
        })
    }
    const cancelEdit = () => {
        cancelEditRef.current?.cancel();
        setIsEditForm(prev => !prev)
        setFormData(prev => {
            return { ...prev, form_name: formData?.form_name }
        })
    }

    const changeService = (value, state) => {
        state(true)
        axiosBase.post('/change-service', { formId: formData?.form_id, value }).then(() => {
            state(false);
            setFormData(prev => {
                return { ...prev, service_cancelled: value }
            })
        }).catch(() => {
            state(false);
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>Form settings</Typography>
                <Box>
                    {!isEditForm ? <Button
                        type='button'
                        endIcon={<Edit sx={{ color: '#000' }} />}
                        size='small'
                        variant='outlined'
                        sx={profileEditButton}
                        onClick={() => setIsEditForm(true)}>
                        Edit
                    </Button> :
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                size='small'
                                variant='outlined'
                                sx={profileEditButton}
                                onClick={cancelEdit}>
                                Cancel
                            </Button>
                            <Button
                                size='small'
                                onClick={editForm}
                                variant='contained'
                                sx={saveFormBtn}
                                disabled={isChanged ? false : true}>
                                {loading ? <div className='loadingLite'></div> : 'Save'}
                            </Button>
                        </Box>}
                </Box>
            </Box>
            <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>Form name</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <input
                            type="text"
                            className={isEditForm ? 'editForm' : 'showForm'}
                            onChange={(e) => { handleChange(e); setFormName(e.target.value); }}
                            name='from-name'
                            defaultValue={formData?.form_name}
                            disabled={!isEditForm ? true : false} />
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>Form ID</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 400, p: '.5rem' }}>{formData.form_id}</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>Service settings</Typography>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>Email notification</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '.8rem' }}>
                                You will receive a notification via email every time a new form submission occurs.
                            </Typography>
                            {sendMailLoad ?
                                <div className='loading'></div> :
                                <Switch checked={formData?.send_mail} onChange={(e) => editSendMail(e.target.checked)} />
                            }
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>Stop form service</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', rowGap: 1 }}>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '.8rem' }}>Temporarily stop accepting submissions from this form.</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                <Typography sx={{
                                    fontFamily: 'Poppins',
                                    color: formData?.service_cancelled ? '#d32f2f' : 'rgb(91, 222, 195)'
                                }}>
                                    {formData?.service_cancelled ? 'Service stopped' : 'Service running'}
                                </Typography>
                                <Button size='small' variant='contained' sx={{
                                    ...deleteFormBtn,
                                    "&.Mui-disabled": {
                                        background: "rgba(211, 47, 47, 0.5)",
                                        color: "#fff"
                                    }
                                }} onClick={() => changeService(true, setStopServiceLoading)}
                                    disabled={formData?.service_cancelled || stopServiceLoading} >
                                    {stopServiceLoading ? <div className='loadingLite'></div> : 'Stop'}
                                </Button>
                                <Button size='small' variant='contained' sx={{
                                    ...profileEditButton,
                                    "&.Mui-disabled": {}
                                }} onClick={() => changeService(false, setStartServiceLoading)}
                                    disabled={!formData?.service_cancelled || startServiceLoading} >
                                    {startServiceLoading ? <div className='loading'></div> : 'Start'}
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>Delete form</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '.8rem' }}>Once you delete this form, there is no going back. Please be certain.</Typography>
                            <Button size='small' variant='contained' sx={deleteFormBtn} onClick={() => setDeleteFormOpen(true)}>Delete</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <React.Suspense fallback={<MainContentLoading />}>
                <DeleteFormModal deleteFormOpen={deleteFormOpen} setDeleteFormOpen={setDeleteFormOpen} formData={formData} />
            </React.Suspense>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={editFormStatus}
                autoHideDuration={3000}
                onClose={() => setEditFormStatus(false)}>
                <Alert
                    severity={editFormLabel.state}
                    variant='filled'
                    sx={{ width: '100%' }}
                    onClose={() => setEditFormStatus(false)}>
                    {editFormLabel.label}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default FormSettings
