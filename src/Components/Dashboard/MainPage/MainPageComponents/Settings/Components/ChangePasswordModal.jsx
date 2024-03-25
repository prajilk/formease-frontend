import React, { useRef } from "react";
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Fade,
    FormControl,
    IconButton,
    InputAdornment,
    Modal,
    OutlinedInput,
    Typography,
    useTheme,
} from "@mui/material";
import {
    VisibilityOff,
    Visibility,
    Error,
    CheckCircle,
} from "@mui/icons-material";
import { profileEditButton } from "./Sx";
import axiosBase from "../../../../../../config/axios";
import axios from "axios";

const ChangePasswordModal = ({ changePasswordOpen, setChangePassword }) => {
    const [loading, setLoading] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState();
    const [newPassword, setNewPassword] = React.useState();
    const [passwordStatus, setPasswordStatus] = React.useState(false);
    const [passwordChangeSuccess, setPasswordChangeSuccess] =
        React.useState(false);
    const [passwordStatusLabel, setPasswordStatusLabel] = React.useState();

    const source = useRef(null);

    const theme = useTheme();
    const changePsswordSx = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "40%",
        [theme.breakpoints.down("md")]: { width: "90%" },
        boxShadow: 24,
        bgcolor: "#fff",
        outline: "none",
    };

    const changePassword = (e) => {
        e.preventDefault();
        setPasswordStatus(false);
        setPasswordChangeSuccess(false);
        setLoading(true);
        source.current = axios.CancelToken.source();
        axiosBase
            .post(
                "/change-password",
                { oldPassword, newPassword },
                { cancelToken: source.current.token }
            )
            .then((res) => {
                setLoading((prev) => !prev);
                setPasswordStatusLabel(res.data.message);
                setPasswordStatus((prev) => !prev);
                setPasswordChangeSuccess((prev) => !prev);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setLoading((prev) => !prev);
                    setPasswordStatusLabel(err.response.data.message);
                    setPasswordStatus((prev) => !prev);
                } else {
                    setLoading((prev) => !prev);
                }
            });
    };

    const cancelRequest = () => {
        source.current?.cancel();
        setChangePassword(false);
        setPasswordChangeSuccess(false);
        setPasswordStatus(false);
    };

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassBtn = {
        ...profileEditButton,
        bgcolor: "#00bfff",
        color: "#fff",
        ":hover": { bgcolor: "#00bfff" },
    };

    return (
        <Modal
            aria-labelledby="change-password-modal"
            aria-describedby="change-old-password"
            open={changePasswordOpen}
            onClose={() => {
                setChangePassword(false);
                setPasswordChangeSuccess(false);
                setPasswordStatus(false);
            }}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={changePasswordOpen}>
                <Card sx={changePsswordSx}>
                    <CardContent sx={{ p: 0 }}>
                        <Box sx={{ px: 2, py: 1 }}>
                            <Typography
                                sx={{ fontSize: 20, fontFamily: "Poppins" }}
                                gutterBottom
                            >
                                Change password
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                px: 2,
                                py: 3,
                                bgcolor: "rgba(246,248,250,255)",
                            }}
                        >
                            {passwordStatus && (
                                <Chip
                                    avatar={
                                        passwordChangeSuccess ? (
                                            <CheckCircle
                                                style={{ color: "#2e7d32" }}
                                            />
                                        ) : (
                                            <Error
                                                style={{ color: "#d32f2f" }}
                                            />
                                        )
                                    }
                                    label={passwordStatusLabel}
                                    variant="outlined"
                                    color={
                                        passwordChangeSuccess
                                            ? "success"
                                            : "error"
                                    }
                                    sx={{
                                        "& span": {
                                            overflowX: "scroll",
                                            textOverflow: "clip",
                                            "::-webkit-scrollbar": {
                                                display: "none",
                                            },
                                        },
                                    }}
                                />
                            )}

                            <form onSubmit={changePassword} id="changePassword">
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: ".8rem",
                                            fontFamily: "Poppins",
                                        }}
                                    >
                                        Old password:{" "}
                                    </Typography>
                                    <FormControl
                                        sx={{ m: 1, flex: 1 }}
                                        variant="outlined"
                                        size="small"
                                        required
                                    >
                                        <OutlinedInput
                                            id="old-password"
                                            type="password"
                                            sx={{ bgcolor: "#fff" }}
                                            onChange={(e) =>
                                                setOldPassword(e.target.value)
                                            }
                                        />
                                    </FormControl>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        bgcolor: "rgba(246,248,250,255)",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: ".8rem",
                                            fontFamily: "Poppins",
                                        }}
                                    >
                                        New password:{" "}
                                    </Typography>
                                    <FormControl
                                        sx={{ m: 1, flex: 1 }}
                                        variant="outlined"
                                        size="small"
                                        required
                                    >
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            sx={{ bgcolor: "#fff" }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Box>
                            </form>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                        <Button
                            size="small"
                            variant="outlined"
                            sx={profileEditButton}
                            onClick={cancelRequest}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="changePassword"
                            size="small"
                            variant="contained"
                            sx={changePassBtn}
                            disabled={loading}
                        >
                            {loading ? (
                                <div
                                    className="loadingLite"
                                    style={{ margin: "3px 0" }}
                                ></div>
                            ) : (
                                "Change password"
                            )}
                        </Button>
                    </CardActions>
                </Card>
            </Fade>
        </Modal>
    );
};

export default ChangePasswordModal;
