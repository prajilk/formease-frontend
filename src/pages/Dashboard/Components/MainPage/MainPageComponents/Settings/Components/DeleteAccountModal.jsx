import { AccountCircle, CloseRounded, Error } from '@mui/icons-material';
import { Backdrop, Box, Button, Card, CardActions, CardContent, Fade, IconButton, Modal, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../../../../../config/axios';
import { useNavigate } from 'react-router-dom';
import '../Settings.css'
import { UserContext } from '../../../../../../../Context/Context';

const DeleteAccountModal = ({ deleteAccountOpen, setDeleteAccountOpen }) => {

    const { user } = useContext(UserContext);

    const [loading, setLoading] = React.useState(false);
    const [isError, setIsError] = useState(false);
    const [totalForms, setTotalForms] = useState();
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

    const handleDeleteAccount = () => {
        setLoading(true);
        setIsError(false)
        axios.get('/delete-account').then(() => {
            navigate('/dashboard/login', { replace: true })
        }).catch(() => setIsError(true))
    }

    useEffect(() => {
        axios.get('/number-of-forms').then((res) => {
            setTotalForms(res.data.total_forms)
        }).catch((err) => {
            setTotalForms(err.response.data.total_forms)
        })
    }, [])

    return (
        <Modal
            aria-labelledby="delet-account-modal"
            aria-describedby="confirm-delete-account"
            open={deleteAccountOpen}
            onClose={() => setDeleteAccountOpen(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={deleteAccountOpen}>
                <Card sx={deleteAccountSx}>
                    <CardContent sx={{ p: 0 }}>
                        <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 20, fontFamily: 'Poppins' }} gutterBottom>
                                Delete account "{user?.fullname}"
                            </Typography>
                            <IconButton onClick={() => setDeleteAccountOpen(false)} style={{ padding: 1 }}>
                                <CloseRounded />
                            </IconButton>
                        </Box>
                        {isError && <Box sx={{ display: 'flex', px: 2, pb: 2, alignItems: 'center' }}>
                            <Error color='error' fontSize='small' />
                            <Typography color='error' sx={{ fontSize: '.7rem', fontFamily: 'Poppins' }}>Something went wrong!</Typography>
                        </Box>}
                        <Box sx={{ px: 2, py: 3, bgcolor: 'rgba(246,248,250,255)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <AccountCircle fontSize='large' />
                            <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>{user?.fullname}</Typography>
                            <Typography sx={{ fontFamily: 'Poppins' }}>{user?.email}</Typography>
                            <Typography sx={{ fontFamily: 'Poppins' }}>{totalForms} forms published</Typography>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button
                            size='small'
                            color='error'
                            onClick={handleDeleteAccount}
                            variant='outlined'
                            disabled={loading}
                            sx={{ width: '100%' }}>
                            {loading ? <div className='loadingRed'></div> : 'I want to delete this account'}
                        </Button>
                    </CardActions>
                </Card>
            </Fade>
        </Modal>
    )
}

export default DeleteAccountModal
