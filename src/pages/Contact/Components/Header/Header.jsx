import { Alert, Box, Button, Card, CardContent, Container, Snackbar, Typography, useTheme } from '@mui/material'
import './Header.css'
import React, { useState } from 'react'
import { country_list } from '../../../countries'
import { submitBtnSx } from '../../../Auth/AuthSx'
import axios from '../../../../config/axios';

const Header = () => {

    const theme = useTheme();

    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [country, setCountry] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [status, setStatus] = useState(false);
    const [statusColor, setStatusColor] = useState('success');

    const sendMessage = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(process.env.REACT_APP_CONTACT_US_ENDPOINT, {
            email,
            fullname,
            country,
            msg,
        }).then((res) => {
            if (res.data.success) {
                setStatus(true);
                setLoading(false);
                // set input field to blank
                setFullname('')
                setEmail('')
                setMsg('')
            } else {
                throw new Error("Response success false");
            }
        }).catch(() => {
            setStatusColor('error');
            setLoading(false);
            setIsError(true);
        })
    }

    return (
        <section style={{ padding: '6rem 0 5rem 0' }}>
            <Container maxWidth='md' sx={{ display: 'flex', mt: 5, flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant='h3' sx={{ fontWeight: 700, fontFamily: 'Poppins' }}>
                        Contact us
                    </Typography>
                    <Typography sx={{ fontWeight: 400, fontFamily: 'Poppins', mt: 2 }}>
                        We welcome any feedback or suggestions you may have and are always looking for ways to improve our service.
                    </Typography>
                </Box>
                <Box sx={{ width: '100%', [theme.breakpoints.up('md')]: { width: '50%' } }}>
                    <form onSubmit={sendMessage}>
                        <Card sx={{ boxShadow: '0 30px 60px -12px rgba(50,50,93,0.25),0 18px 36px -18px rgba(0,0,0,0.3)' }}>
                            <CardContent>
                                <Box>
                                    <Typography>Fullname</Typography>
                                    <input
                                        type="text"
                                        name="fullname"
                                        placeholder='Fullname'
                                        className='contactInput'
                                        spellCheck='false'
                                        value={fullname}
                                        required
                                        onChange={(e) => setFullname(e.target.value)} />
                                </Box>
                                <Box>
                                    <Typography>Work email</Typography>
                                    <input
                                        type="email"
                                        name="mail"
                                        placeholder='Email'
                                        className='contactInput'
                                        spellCheck='false'
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)} />
                                </Box>
                                <Box>
                                    <Typography>Country</Typography>
                                    <select name="country" id='country' onChange={(e) => setCountry(e.target.value)} required defaultValue="">
                                        <option value="" disabled>Select your country</option>
                                        {country_list.map((country, i) => <option value={country.toLowerCase()} key={i}>{country}</option>)}
                                    </select>
                                </Box>
                                <Box>
                                    <Typography>Message</Typography>
                                    <textarea
                                        onChange={(e) => setMsg(e.target.value)}
                                        className='contactInput'
                                        value={msg}
                                        required
                                        placeholder='Write us about your query.'></textarea>
                                </Box>
                                <Box>
                                    <Button
                                        type='submit'
                                        size="small"
                                        variant="contained"
                                        disabled={loading}
                                        sx={submitBtnSx}
                                    >
                                        {loading ? <div className='loadingLite'></div> : 'Submit'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </form>
                </Box>
            </Container>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isError || status}
                autoHideDuration={3000}
                onClose={() => { setIsError(false); setStatus(false); setStatusColor('success'); }}>
                <Alert
                    severity={statusColor}
                    variant='filled'
                    sx={{ width: '100%' }}
                    onClose={() => { setIsError(false); setStatus(false); setStatusColor('success'); }}>
                    {isError ? "Somthing went wrong!" : "Message sent successfully"}
                </Alert>
            </Snackbar>
        </section>
    )
}

export default Header
