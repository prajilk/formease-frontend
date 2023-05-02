import { CloseRounded, Error, Warning } from '@mui/icons-material'
import { Backdrop, Box, Button, Card, CardActions, CardContent, Fade, IconButton, Modal, Typography, useTheme } from '@mui/material'
import React, { useRef, useState } from 'react'
import '../Api.css'
import axiosBase from '../../../../../../../config/axios'
import axios from 'axios'

const RollApiModal = ({ rollApiOpen, setRollApiOpen, setApiKey }) => {

    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const rollApiRef = useRef(null)

    const theme = useTheme();
    const rollApiSx = {
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

    const handleRollKey = () => {
        setLoading(true)
        rollApiRef.current = axios.CancelToken.source();
        axiosBase.get('/roll-api', { cancelToken: rollApiRef.current?.token }).then((res) => {
            setApiKey(res.data.new_API_key)
            setLoading(false);
            setRollApiOpen(false)
        }).catch(() => {
            setIsError(true);
            setLoading(false);
        })
    }

    return (
        <Modal
            aria-labelledby="update-api-modal"
            aria-describedby="update-api-key"
            open={rollApiOpen}
            onClose={() => { setRollApiOpen(false); rollApiRef.current?.cancel() }}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={rollApiOpen}>
                <Card sx={rollApiSx}>
                    <CardContent sx={{ p: 0 }}>
                        <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 20, fontFamily: 'Poppins' }} gutterBottom>
                                Roll API Key
                            </Typography>
                            <IconButton onClick={() => setRollApiOpen(false)} style={{ padding: 1 }}>
                                <CloseRounded />
                            </IconButton>
                        </Box>
                        {isError && <Box sx={{ display: 'flex', px: 2, pb: 2, alignItems: 'center' }}>
                            <Error color='error' fontSize='small' />
                            <Typography color='error' sx={{ fontSize: '.7rem', fontFamily: 'Poppins' }}>Something went wrong!</Typography>
                        </Box>}
                        <Box sx={{ px: 2, py: 3, bgcolor: 'rgba(246,248,250,255)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Warning fontSize='large' />
                            <Typography sx={{ fontFamily: 'Poppins' }}>
                                All access to services associated with this key will be terminated, and any forms published using this key, its data will no longer be saved.
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button
                            size='small'
                            color='error'
                            onClick={handleRollKey}
                            variant='outlined'
                            sx={{ width: '100%' }}
                            disabled={loading}>
                            {loading ? <div className='loadingRed'></div> : 'Roll API Key'}
                        </Button>
                    </CardActions>
                </Card>
            </Fade>
        </Modal>
    )
}

export default RollApiModal
