import { DataObject, GridOn } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import React from 'react'
import * as XLSX from 'xlsx';

const DownloadOptionBox = ({ states, formData }) => {

    const { showDownloadMenu, setshowDownloadMenu } = states;

    const downloadAsJson = () => {
        setshowDownloadMenu(false)
        const json = JSON.stringify(formData.form_data);
        const blobData = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blobData);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${formData.form_name}.json`);
        document.body.appendChild(link);
        link.click();
    }
    const downloadAsExcel = () => {
        setshowDownloadMenu(false)
        // Create worksheet from JSON data
        const worksheet = XLSX.utils.json_to_sheet(formData.form_data);

        // Modify header row formatting
        const keySet = formData.form_data.reduce((set, obj) => {
            Object.keys(obj).forEach(key => set.add(key.charAt(0).toUpperCase() + key.slice(1)));
            return set;
        }, new Set());
        const header = Array.from(keySet);

        XLSX.utils.sheet_add_aoa(worksheet, [header]);

        // Create workbook and add worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Convert workbook to buffer and initiate download
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blobData = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blobData);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${formData.form_name}.xlsx`);
        document.body.appendChild(link);
        link.click();
    };


    return (
        <Box sx={{
            display: showDownloadMenu ? 'block' : 'none',
            borderRadius: '5px',
            bgcolor: '#fff',
            position: 'absolute',
            zIndex: 10,
            right: 0,
            mt: .5,
            p: 0,
            boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);',
        }}>
            <Button
                startIcon={<GridOn />}
                onClick={downloadAsExcel}
                sx={{
                    width: '100%',
                    textTransform: 'capitalize',
                    fontFamily: 'Poppins',
                    color: '#000'
                }}>As Excel</Button>
            <Button
                startIcon={<DataObject />}
                onClick={downloadAsJson}
                sx={{
                    width: '100%',
                    textTransform: 'capitalize',
                    fontFamily: 'Poppins',
                    color: '#000'
                }}>
                As Json</Button>
        </Box>
    )
}

export default DownloadOptionBox
