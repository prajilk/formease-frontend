import React, { useEffect, useContext } from 'react'
import MainPage from './Components/MainPage/MainPage'
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';
import './Dashboard.css'

const Dashboard = () => {

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        axios.get('/user/verify').then(({ data }) => {
            setUser(data.user);
        }).catch(() => {
            navigate('/dashboard/login')
        })
    }, [navigate, setUser]);

    return (
        <div>
            <MainPage />
        </div>
    )
}

export default Dashboard
