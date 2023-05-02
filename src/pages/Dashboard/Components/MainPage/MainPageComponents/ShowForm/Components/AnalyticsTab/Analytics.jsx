import React, { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
    Legend,
    Filler,
    Tooltip
} from 'chart.js';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { ArrowDropDown, ShowChart, Timeline } from '@mui/icons-material';
import axiosBase from '../../../../../../../../config/axios';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Filler,
    Tooltip
)

function setMaxValue(n) {
    if (n) return Math.max(...n) + 1
}

const Analytics = ({ setIsError }) => {

    const [selectedFilter, setSelectedFilter] = React.useState(7);
    const [graphFilter, setGraphFilter] = React.useState("Last 7 days");
    const [totalSubmissions, setTotalSubmissions] = React.useState(0);
    const [todaysSubmissions, setTodaysSubmissions] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [formAnalytics, setFormAnalytics] = useState([]);
    const getFormAnalyticsRef = useRef(null);
    const [searchParam] = useSearchParams();
    const formId = searchParam.get('id');

    useEffect(() => {
        getFormAnalyticsRef.current = axios.CancelToken.source()
        axiosBase.post('/get-form-analytics', { form_id: formId }, { cancelToken: getFormAnalyticsRef.current?.token }).then((res) => {
            setFormAnalytics(res.data.formAnalytics)
            const totalSub = res.data.formAnalytics.sinceCreated.datas.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue;
            }, 0);
            setTotalSubmissions(totalSub)
            setTodaysSubmissions(res.data.formAnalytics['today'].submissions)
        }).catch((err) => {
            if (err.code !== "ERR_CANCELED") {
                setIsError(true)
            }
        })

        return () => {
            getFormAnalyticsRef.current?.cancel();
        }
    }, [formId, setIsError])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleFilter = (value) => {
        setAnchorEl(null);
        setSelectedFilter(value)
        if (value !== 999)
            setGraphFilter(`Last ${value} days`)
        else
            setGraphFilter('Since created')
    }

    const data = {
        labels: selectedFilter !== 999 ? formAnalytics[`${selectedFilter}days`]?.labels : formAnalytics.sinceCreated.labels,
        datasets: [{
            data: selectedFilter !== 999 ? formAnalytics[`${selectedFilter}days`]?.datas : formAnalytics.sinceCreated.datas,
            label: "Form submissions",
            fill: true,
            backgroundColor: ({ chart: { ctx } }) => {
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, "rgba(58,123,213,1)");
                gradient.addColorStop(1, "rgba(0,210,255,0.3)");
                return gradient;
            },
            borderColor: '#00bfff',
            pointBackgroundColor: '#00bfff'
        }]
    }

    const options = {
        plugins: {
            legend: true
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        responsive: true,
        radius: 5,
        hitRadius: 30,
        hoverRadius: 10,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                min: 0,
                max: setMaxValue(selectedFilter !== 999 ? formAnalytics[`${selectedFilter}days`]?.datas : formAnalytics.sinceCreated.datas)
            }
        }
    }

    return (
        <div>
            <div>
                <Button
                    id="basic-button"
                    endIcon={<ArrowDropDown />}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant='outlined'
                    sx={{ float: 'right', textTransform: 'capitalize', fontFamily: 'Poppins' }}
                >
                    {graphFilter}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem selected={selectedFilter === 3} onClick={() => handleFilter(3)}>Last 3 days</MenuItem>
                    <MenuItem selected={selectedFilter === 7} onClick={() => handleFilter(7)}>Last 7 days</MenuItem>
                    <MenuItem selected={selectedFilter === 28} onClick={() => handleFilter(28)}>Last 28 days</MenuItem>
                    <MenuItem selected={selectedFilter === 999} onClick={() => handleFilter(999)}>Since created</MenuItem>
                </Menu>
            </div>
            <Line data={data} options={options} />
            <Box sx={{ mt: 4, display: 'flex', gap: 3 }}>
                <Box sx={{
                    p: 3,
                    width: 'fit-content',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px 5px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Box>
                        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 'small' }}>Today's submissions</Typography>
                        <Typography variant='h4' sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>{todaysSubmissions}</Typography>
                    </Box>
                    <Box>
                        <ShowChart fontSize='large' />
                    </Box>
                </Box>
                <Box sx={{
                    p: 3,
                    width: 'fit-content',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px 5px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Box>
                        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 'small' }}>Total submissions</Typography>
                        <Typography variant='h4' sx={{ fontFamily: 'Poppins', fontWeight: 700 }}>{totalSubmissions}</Typography>
                    </Box>
                    <Box>
                        <Timeline fontSize='large' />
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default Analytics;
