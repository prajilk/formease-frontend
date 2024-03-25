import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Typography,
} from "@mui/material";
import { Error } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./Auth.css";
import {
    demoUserBtnSx,
    submitBtnSx,
    swapAuthLabelSx,
    swapAuthLinkSx,
} from "./AuthSx";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import PageLoading from "../../Components/Shared/PageLoading";

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);
    const [loginErrorLabel, setLoginErrorLabel] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get("/user/verify")
            .then(() => {
                navigate("/dashboard");
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [navigate]);

    const login = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post("/login", { email, password })
            .then(() => {
                setLoading(false);
                return navigate("/dashboard");
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 401) {
                    setIsLoginError(true);
                    setLoginErrorLabel("Incorrect email or password");
                } else {
                    setLoginErrorLabel("Something went wrong!");
                }
            });
    };

    const setDemoUser = () => {
        setEmail("test@user.com");
        setPassword("12345678");
    };

    if (isLoading) {
        return <PageLoading />;
    }

    return (
        <section
            style={{
                display: "flex",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f7fafc",
            }}
        >
            <Container maxWidth="xs">
                <Box sx={{ width: "100%", mt: 3 }}>
                    <Typography
                        onClick={() => navigate("/")}
                        variant="h5"
                        sx={{
                            fontFamily: "Poppins",
                            fontWeight: 400,
                            my: 2,
                            textAlign: "center",
                            color: "#00bfff",
                            cursor: "pointer",
                        }}
                    >
                        form
                        <span style={{ fontWeight: 700 }}>ease</span>
                    </Typography>
                    <form onSubmit={login}>
                        <Card
                            sx={{
                                boxShadow: "0px 6px 21px -3px rgba(0,0,0,0.14)",
                                borderRadius: "20px",
                                padding: "20px 10px",
                            }}
                        >
                            <CardContent sx={{ p: 5 }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins",
                                        fontWeight: 600,
                                        fontSize: "1.3rem",
                                        mb: 2,
                                    }}
                                >
                                    Log in to your account
                                </Typography>
                                {isLoginError && (
                                    <Chip
                                        avatar={
                                            <Error
                                                style={{
                                                    color: "rgb(237,95,116)",
                                                    width: "1rem",
                                                }}
                                            />
                                        }
                                        label={loginErrorLabel}
                                        variant="outlined"
                                        color="error"
                                        sx={{ border: "none", mb: 1 }}
                                    />
                                )}
                                <Box>
                                    <Typography>Email</Typography>
                                    <input
                                        type="email"
                                        name="mail"
                                        className="authInput"
                                        placeholder="Email"
                                        spellCheck="false"
                                        value={email}
                                        required
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Box>
                                <Box>
                                    <Typography>Password</Typography>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="authInput"
                                        spellCheck="false"
                                        value={password}
                                        required
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Box>
                                <Box>
                                    <Button
                                        type="submit"
                                        size="small"
                                        variant="contained"
                                        disabled={loading}
                                        sx={submitBtnSx}
                                    >
                                        {loading ? (
                                            <div className="loading"></div>
                                        ) : (
                                            "Continue"
                                        )}
                                    </Button>
                                </Box>
                                <Box>
                                    <Button
                                        type="submit"
                                        size="small"
                                        onClick={setDemoUser}
                                        variant="contained"
                                        disabled={loading}
                                        sx={demoUserBtnSx}
                                    >
                                        Continue as Demo user
                                    </Button>
                                </Box>
                                <Box>
                                    <Typography sx={swapAuthLabelSx}>
                                        Don't have an account?&nbsp;
                                        <Typography
                                            component={"span"}
                                            variant="body2"
                                            onClick={() =>
                                                navigate("/register")
                                            }
                                            sx={swapAuthLinkSx}
                                        >
                                            Sign up
                                        </Typography>
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </form>
                    <Box>
                        <Typography
                            align="center"
                            sx={{ fontFamily: "Poppins", mt: 4 }}
                        >
                            &copy; formease ·&nbsp;
                            <Typography
                                component={"span"}
                                variant="body1"
                                onClick={() => navigate("/contact")}
                                sx={{
                                    cursor: "pointer",
                                    color: "inherit",
                                    fontFamily: "Poppins",
                                    ":hover": { color: "#00bfff" },
                                }}
                            >
                                Contact
                            </Typography>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </section>
    );
};

export default Register;
