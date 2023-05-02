import * as React from 'react';
import {
    Alert,
    Box,
    Button,
    IconButton,
    Modal,
    Paper, Snackbar, Table, TableBody, TableCell,
    TableContainer, TableHead, TablePagination, TableRow, Typography
} from '@mui/material';
import { Delete, Warning } from '@mui/icons-material';
import axios from '../../../../../../../../config/axios';

let columns = [];
let rows = [];

export default function TableView({ formData, setFormData }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [submissionId, setSubmissionId] = React.useState()
    const [isError, setIsError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4
    };

    if (formData.form_data) {
        const keySet = formData.form_data.reduce((set, obj) => {
            Object.keys(obj).forEach(key => set.add(key));
            return set;
        }, new Set());
        columns = Array.from(keySet);

        // Place "time" to last in the table
        const timeIndex = columns.indexOf("time");
        if (timeIndex !== -1) {
            columns.splice(timeIndex, 1); // Remove the "time" element from its current position
            columns.push("time"); // Add the "time" element to the end of the array
        }
        const deleteIndex = columns.indexOf("delete");
        if (deleteIndex !== -1) {
            columns.splice(deleteIndex, 1); // Remove the "time" element from its current position
            columns.push("delete"); // Add the "time" element to the end of the array
        }

        rows = formData.form_data;
        rows.map((obj) => {
            return obj.delete = <IconButton onClick={() => { handleOpen(); setSubmissionId(obj._id_) }}><Delete color='error' /></IconButton>
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteSubmission = (id) => {

        setLoading(true);
        const idToDelete = id;
        const index = formData.form_data.findIndex(item => item._id_ === idToDelete);

        axios.post('/delete-this-submission', { formId: formData.form_id, submissionId }).then((res) => {
            setLoading(false);
            if (res.data.submissionDeleted) {
                if (index !== -1) {
                    const updatedFormData = formData.form_data.filter(item => item._id_ !== idToDelete);
                    setFormData(prevState => ({
                        ...prevState,
                        form_data: updatedFormData
                    }));
                }
            } else {
                setIsError(true)
            }
        }).catch(() => {
            setLoading(false);
            setIsError(true)
        })
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer
                sx={{
                    maxHeight: 440,
                    '::-webkit-scrollbar': {
                        width: '0.4rem',
                        height: '0.4rem',
                        bgcolor: 'rgba(0,0,0,0.1)'
                    },
                    '::-webkit-scrollbar-thumb': {
                        bgcolor: 'rgba(0,0,0,0.2)',
                        borderRadius: '10px'
                    }
                }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, i) => (
                                column !== '_id_' &&
                                <TableCell
                                    key={i}
                                    style={{
                                        fontWeight: 700,
                                        fontFamily: 'Poppins',
                                        color: '#fff',
                                        backgroundColor: '#00bfff'
                                    }}
                                >
                                    {column.charAt(0).toUpperCase() + column.slice(1)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {
                                return (
                                    <TableRow
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={i}>
                                        {columns.map((column, j) => {
                                            let value;
                                            if (column === '_id_')
                                                return null
                                            if (column === "time") {
                                                value = new Date(row[column]).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                });
                                            } else {
                                                value = row[column];
                                            }
                                            return (
                                                <TableCell key={j}>
                                                    {value === undefined ? '——' : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Warning color='warning' fontSize='large' sx={{ mt: 1 }} />
                        <Box>
                            <Typography sx={{
                                fontFamily: 'Poppins',
                                fontWeight: 600
                            }}>
                                Are you sure you want to delete this submission?
                            </Typography>
                            <Typography sx={{
                                mt: 2,
                                fontFamily: 'Poppins',
                                fontWeight: 400,
                                fontSize: '.9rem',
                            }}>
                                you cannot restore this after delete.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ float: 'right', mt: 2 }}>
                        <Button
                            variant='contained'
                            onClick={() => deleteSubmission(submissionId)}
                            disabled={loading}
                            color='error'
                            sx={{ textTransform: 'capitalize', mr: 1 }}>
                            {loading ? <div className='loadingLite'></div> : 'delete'}
                        </Button>
                        <Button variant='outlined' disabled={loading} onClick={handleClose} sx={{ textTransform: 'capitalize' }}>cancel</Button>
                    </Box>
                </Box>
            </Modal>
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
        </Paper>
    );
}