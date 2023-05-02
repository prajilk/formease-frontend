import { CloseRounded, Error, TipsAndUpdatesOutlined, Warning, WarningAmberRounded } from '@mui/icons-material';
import { Backdrop, Box, Button, Card, CardActions, CardContent, Fade, IconButton, Modal, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import axios from '../../../../../../../../config/axios';
import { useNavigate } from 'react-router-dom';
import '../../../Settings/Settings.css'

const DeleteFormModal = ({ deleteFormOpen, setDeleteFormOpen, formData }) => {

    const [loading, setLoading] = React.useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const theme = useTheme();
    const deleteAccountSx = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        [theme.breakpoints.down('md')]: { width: '90%' },
        boxShadow: 24,
        bgcolor: '#fff',
        outline: 'none'
    }

    const handleDeleteForm = () => {
        setLoading(true);
        setIsError(false)
        axios.post('/delete-form', { form_id: formData?.form_id }).then((res) => {
            navigate('/dashboard');
        }).catch((err) => {
            setIsError(true)
            setLoading(false);
        })
    }


    return (
        <Modal
            aria-labelledby="delet-account-modal"
            aria-describedby="confirm-delete-account"
            open={deleteFormOpen}
            onClose={() => setDeleteFormOpen(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={deleteFormOpen}>
                <Card sx={deleteAccountSx}>
                    <CardContent sx={{ p: 0 }}>
                        <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 20, fontFamily: 'Poppins' }} gutterBottom>
                                Delete form "{formData?.form_name}"
                            </Typography>
                            <IconButton onClick={() => setDeleteFormOpen(false)} style={{ padding: 1 }}>
                                <CloseRounded />
                            </IconButton>
                        </Box>
                        {isError && <Box sx={{ display: 'flex', px: 2, pb: 2, alignItems: 'center' }}>
                            <Error color='error' fontSize='small' />
                            <Typography color='error' sx={{ fontSize: '.7rem', fontFamily: 'Poppins' }}>Something went wrong!</Typography>
                        </Box>}
                        <Box sx={{ px: 2, py: 3, bgcolor: 'rgba(246,248,250,255)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Warning fontSize='large' />
                            <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>Contact me</Typography>
                            <Typography sx={{ fontFamily: 'Poppins' }}>{formData?.form_id}</Typography>
                            <Typography sx={{ fontFamily: 'Poppins' }}>{formData?.form_data?.length} form submissions</Typography>
                            <Box sx={{
                                bgcolor: 'rgba(0,0,0,0.1)',
                                p: '.4rem',
                                borderRadius: '10px'
                            }}>
                                <Box sx={{ position: 'relative' }}>
                                    <WarningAmberRounded fontSize='small' sx={{ position: 'absolute', top: 2, color: 'red' }} />
                                    <Typography variant='caption' align='center' sx={{ fontFamily: 'Poppins', pl: 3 }}>
                                        All form submissions associated with this form will be delete permanently. This process cannot be undo, so please be certain.
                                    </Typography>
                                </Box>
                                <Box sx={{ position: 'relative' }}>
                                    <TipsAndUpdatesOutlined fontSize='small' sx={{ position: 'absolute', top: 2, color: '#00bfff' }} />
                                    <Typography variant='caption' align='center' sx={{ fontFamily: 'Poppins', pl: 3 }}>
                                        Download the form submissions before deleting.
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button
                            size='small'
                            color='error'
                            onClick={handleDeleteForm}
                            variant='outlined'
                            disabled={loading}
                            sx={{ width: '100%' }}>
                            {loading ? <div className='loadingRed'></div> : 'I want to delete this form'}
                        </Button>
                    </CardActions>
                </Card>
            </Fade>
        </Modal>
    )
}

export default DeleteFormModal
