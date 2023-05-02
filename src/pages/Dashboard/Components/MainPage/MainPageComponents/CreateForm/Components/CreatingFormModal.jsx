import { Backdrop, Card, Typography } from '@mui/material'
import React from 'react'

const CreatingFormModal = ({ creatingFormLoad }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={creatingFormLoad}
        >
            <Card sx={{ px: 5, py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <div className='loading'></div>
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: 300 }}>Creating form...</Typography>
            </Card>
        </Backdrop>
    )
}

export default CreatingFormModal
