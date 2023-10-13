export const submitBtnSx = {
    textTransform: 'capitalize',
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: '.9rem',
    py: 1,
    width: '100%',
    bgcolor: '#00bfff',
    boxShadow: 'none',
    ':hover': {
        bgcolor: '#00bfff',
        boxShadow: 'none'
    },
    '&.Mui-disabled': {
        opacity: '0.5',
        bgcolor: '#00bfff'
    }
}
export const demoUserBtnSx = {
    textTransform: 'capitalize',
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: '.9rem',
    py: 1,
    width: '100%',
    bgcolor: "transparent",
    border: '1px solid #00bfff',
    color: '#00bfff',
    marginTop: '.7rem',
    boxShadow: 'none',
    ':hover': {
        bgcolor: 'transparent',
        boxShadow: 'none'
    },
    '&.Mui-disabled': {
        color: '#00bfff',
        bgcolor: 'transparent'
    }
}
export const swapAuthLabelSx = {
    fontFamily: 'Poppins',
    fontWeight: 400,
    textAlign: 'center',
    mt: 2,
    color: '#3c4257',
    fontSize: '.9rem'
}

export const swapAuthLinkSx = {
    color: '#00bfff',
    fontWeight: 500,
    fontFamily: 'Poppins',
    cursor: 'pointer',
    ':hover': {
        color: '#3c4257'
    }
}