import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Link,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./Auth.css";
import { country_list } from "../../lib/countries";
import { submitBtnSx, swapAuthLabelSx, swapAuthLinkSx } from "./AuthSx";
import axios from "../../config/axios";
import { Error } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [fullname, setFullname] = useState();
    const [password, setPassword] = useState();
    const [country, setCountry] = useState();
    const [loading, setLoading] = useState(false);
    const [isRegisterError, setIsRegisterError] = useState(false);
    const [registerErrorLabel, setRegisterErrorLabel] = useState("");

    const register = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post("/register", { email, fullname, password, country })
            .then(() => {
                setLoading(false);
                return navigate("/dashboard/login");
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 409) {
                    setIsRegisterError(true);
                    setRegisterErrorLabel(
                        "An account already exists with this email."
                    );
                } else {
                    setRegisterErrorLabel("Something went wrong!");
                }
            });
    };

    return (
        <section
            style={{
                display: "flex",
                justifyContent: "center",
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
                    <form onSubmit={register}>
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
                                    Create an account
                                </Typography>
                                {isRegisterError && (
                                    <Chip
                                        avatar={
                                            <Error
                                                style={{
                                                    color: "rgb(237,95,116)",
                                                    width: "1rem",
                                                }}
                                            />
                                        }
                                        label={registerErrorLabel}
                                        variant="outlined"
                                        color="error"
                                        sx={{
                                            border: "none",
                                            mb: 1,
                                            "& > span": {
                                                whiteSpace: "normal",
                                            },
                                        }}
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
                                        required
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Box>
                                <Box>
                                    <Typography>Fullname</Typography>
                                    <input
                                        type="text"
                                        name="fullname"
                                        placeholder="Fullname"
                                        className="authInput"
                                        spellCheck="false"
                                        required
                                        onChange={(e) =>
                                            setFullname(e.target.value)
                                        }
                                    />
                                </Box>
                                <Box>
                                    <Typography>Country</Typography>
                                    <select
                                        name="country"
                                        id="country"
                                        required
                                        onChange={(e) =>
                                            setCountry(e.target.value)
                                        }
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select your country
                                        </option>
                                        {country_list.map((country, i) => (
                                            <option
                                                value={country.toLowerCase()}
                                                key={i}
                                            >
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                </Box>
                                <Box>
                                    <Typography>Password</Typography>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="authInput"
                                        spellCheck="false"
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
                                            "Create account"
                                        )}
                                    </Button>
                                </Box>
                                <Box>
                                    <Typography sx={swapAuthLabelSx}>
                                        Have an account?&nbsp;
                                        <Typography
                                            component={"span"}
                                            variant="body2"
                                            onClick={() => navigate("/login")}
                                            sx={swapAuthLinkSx}
                                        >
                                            Log in
                                        </Typography>
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </form>
                    <Box>
                        <Typography
                            align="center"
                            sx={{ fontFamily: "Poppins", py: 5 }}
                        >
                            &copy; formease ·{" "}
                            <Link
                                href="/contact"
                                sx={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    ":hover": { color: "#00bfff" },
                                }}
                            >
                                Contact
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </section>
    );
};

export default Register;
