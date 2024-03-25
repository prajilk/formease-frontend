import { Edit } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import React, { lazy, useContext, useRef, useState } from "react";
import "./Settings.css";
import axios from "axios";
import { profileEditButton } from "./SettingsSx";
import { UserContext } from "../../../../../Context/Context";
import axiosBase from "../../../../../config/axios";
import MainContentLoading from "../../MainContentLoading";
const ChangePasswordModal = lazy(() =>
    import("./Components/ChangePasswordModal")
);
const DeleteAccountModal = lazy(() =>
    import("./Components/DeleteAccountModal")
);

const Settings = () => {
    const { user } = useContext(UserContext);
    const [fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [isChanged, setIsChanged] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
    const [changePasswordOpen, setChangePassword] = useState(false);

    const cancelEditRef = useRef(null);

    const saveProfileBtn = {
        ...profileEditButton,
        bgcolor: "#00bfff",
        color: "#fff",
        ":hover": { bgcolor: "#00bfff" },
    };
    const deleteAccBtn = {
        ...profileEditButton,
        bgcolor: "#d32f2f",
        color: "#fff",
        ":hover": { bgcolor: "#d32f2f" },
    };

    const handleChange = (e, field) => {
        if (field === "fullname") {
            if (e.target.value !== user.fullname) setIsChanged(true);
            else setIsChanged(false);
        } else {
            if (e.target.value !== user.email) setIsChanged(true);
            else setIsChanged(false);
        }
    };

    const editProfile = () => {
        setLoading(true);
        cancelEditRef.current = axios.CancelToken.source();
        axiosBase
            .post(
                "/edit-profile",
                { _id: user._id, fullname, email },
                { cancelToken: cancelEditRef.current.token }
            )
            .then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    setIsChanged(false);
                }
            });
    };
    const cancelEdit = () => {
        cancelEditRef.current?.cancel();
        setIsEditProfile((prev) => !prev);
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontFamily: "Poppins", fontWeight: 700 }}
                >
                    Profile
                </Typography>
                <Box>
                    {!isEditProfile ? (
                        <Button
                            type="button"
                            endIcon={<Edit sx={{ color: "#000" }} />}
                            size="small"
                            variant="outlined"
                            sx={profileEditButton}
                            onClick={() => setIsEditProfile((prev) => !prev)}
                        >
                            Edit
                        </Button>
                    ) : (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                                size="small"
                                variant="outlined"
                                sx={profileEditButton}
                                onClick={cancelEdit}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="small"
                                onClick={() => editProfile()}
                                variant="contained"
                                sx={saveProfileBtn}
                                disabled={isChanged ? false : true}
                            >
                                {loading ? (
                                    <div className="loadingLite"></div>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid
                        item
                        xs={4}
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <Typography
                            sx={{ fontFamily: "Poppins", fontWeight: 500 }}
                        >
                            Email
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <input
                            type="email"
                            className={
                                isEditProfile ? "editProfile" : "showProfile"
                            }
                            onChange={(e) => {
                                handleChange(e, "email");
                                setEmail(e.target.value);
                            }}
                            name="email"
                            defaultValue={user?.email}
                            disabled={!isEditProfile ? true : false}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <Typography
                            sx={{ fontFamily: "Poppins", fontWeight: 500 }}
                        >
                            Fullname
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <input
                            type="text"
                            className={
                                isEditProfile ? "editProfile" : "showProfile"
                            }
                            onChange={(e) => {
                                handleChange(e, "fullname");
                                setFullname(e.target.value);
                            }}
                            name="fullname"
                            defaultValue={user?.fullname}
                            disabled={!isEditProfile ? true : false}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <Typography
                            sx={{ fontFamily: "Poppins", fontWeight: 500 }}
                        >
                            Password
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        {!isEditProfile ? (
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontWeight: 500,
                                    py: "6px",
                                    pl: ".5rem",
                                }}
                            >
                                ••••••••
                            </Typography>
                        ) : (
                            <Button
                                type="button"
                                sx={profileEditButton}
                                onClick={() => setChangePassword(true)}
                            >
                                Change Password...
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Typography
                    variant="h5"
                    sx={{ fontFamily: "Poppins", fontWeight: 700 }}
                >
                    Delete account
                </Typography>
                <Card>
                    <CardContent>
                        <Typography
                            sx={{ fontFamily: "Poppins", fontWeight: 500 }}
                        >
                            Delete account
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontWeight: 400,
                                    fontSize: ".8rem",
                                }}
                            >
                                Once you delete account, there is no going back.
                                Please be certain.
                            </Typography>
                            <Button
                                size="small"
                                variant="contained"
                                sx={deleteAccBtn}
                                onClick={() => setDeleteAccountOpen(true)}
                            >
                                Delete
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <React.Suspense fallback={<MainContentLoading />}>
                <DeleteAccountModal
                    deleteAccountOpen={deleteAccountOpen}
                    setDeleteAccountOpen={setDeleteAccountOpen}
                />
            </React.Suspense>
            <React.Suspense fallback={<MainContentLoading />}>
                <ChangePasswordModal
                    changePasswordOpen={changePasswordOpen}
                    setChangePassword={setChangePassword}
                />
            </React.Suspense>
        </Box>
    );
};

export default Settings;
