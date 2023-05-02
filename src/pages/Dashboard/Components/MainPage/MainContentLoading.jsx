import { Box } from '@mui/material'
import React from 'react'
import './MainPage.css'

const MainContentLoading = () => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
            <div className='mainContentLoading'></div>
        </Box>
    )
}

export default MainContentLoading
