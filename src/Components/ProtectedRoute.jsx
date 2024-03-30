import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import PageLoading from "./Shared/PageLoading";
import { UserContext } from "../Context/Context";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const { setUser, user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const token = localStorage.getItem("token");

        if (!token) navigate("/login");

        axios
            .get("/user/verify")
            .then(({ data }) => {
                setUser(data.user);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                navigate("/login", { replace: true });
            });
    }, [navigate, setUser, setIsLoading]);

    if (isLoading) {
        return <PageLoading />;
    }

    return (
        <React.Suspense fallback={<PageLoading />}>
            <Outlet context={user} />
        </React.Suspense>
    );
};

export default ProtectedRoute;
