import * as React from "react";
import {
    Box,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    IconButton,
    Tooltip,
    Button,
    Typography,
} from "@mui/material";
import { Add, Settings, Logout, AccountCircle } from "@mui/icons-material";
import { UserContext } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "../../../config/axios";
import { toast } from "sonner";

export default function ProfileMenu() {
    const { user } = React.useContext(UserContext);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSignOut = () => {
        toast.success("Signed out successfully");
        setAnchorEl(null);
        localStorage.removeItem("token");
        axios.interceptors.request.use((config) => {
            config.headers.Authorization = null;
            return config;
        });
        navigate("/login");
    };
    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 2,
                }}
            >
                <Tooltip title="Create new form" arrow>
                    <Button
                        endIcon={<Add />}
                        variant="contained"
                        onClick={() => navigate("/dashboard/create-new")}
                        sx={{
                            bgcolor: "#00bfff",
                            fontWeight: 500,
                            fontFamily: "Poppins",
                            textTransform: "capitalize",
                            transition: "500ms ease",
                            ":hover": {
                                bgcolor: "#00bfff",
                                transform: "translateY(-10%)",
                            },
                        }}
                    >
                        Create
                    </Button>
                </Tooltip>
                <Typography
                    component={"span"}
                    variant="body1"
                    onClick={() => navigate("/docs")}
                    sx={{
                        display: { xs: "none", sm: "block" },
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        color: "#000",
                        cursor: "pointer",
                    }}
                >
                    Docs
                </Typography>
                <Typography
                    component={"span"}
                    variant="body1"
                    onClick={() => navigate("/contact")}
                    sx={{
                        display: { xs: "none", sm: "block" },
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        color: "#000",
                        cursor: "pointer",
                    }}
                >
                    Contact
                </Typography>
                <Tooltip title="Profile" arrow>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <AccountCircle
                            sx={{ width: 32, height: 32, color: "#00bfff" }}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate("/dashboard/settings");
                    }}
                    sx={{ fontFamily: "Poppins" }}
                >
                    <Avatar sx={{ backgroundColor: "#00bfff" }}>
                        {user?.fullname && user.fullname[0]}
                    </Avatar>{" "}
                    {user?.fullname}
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate("/docs");
                    }}
                    sx={{
                        fontFamily: "Poppins",
                        display: { xs: "block", sm: "none" },
                    }}
                >
                    Docs
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate("/contact");
                    }}
                    sx={{
                        fontFamily: "Poppins",
                        display: { xs: "block", sm: "none" },
                    }}
                >
                    Contact
                </MenuItem>
                <Divider sx={{ display: { xs: "block", sm: "none" } }} />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate("/dashboard/settings");
                    }}
                    sx={{ fontFamily: "Poppins" }}
                >
                    <ListItemIcon>
                        <Settings fontSize="small" sx={{ color: "#000" }} />
                    </ListItemIcon>
                    Account Settings
                </MenuItem>
                <MenuItem
                    onClick={handleSignOut}
                    sx={{ fontFamily: "Poppins" }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: "#000" }} />
                    </ListItemIcon>
                    Signout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
