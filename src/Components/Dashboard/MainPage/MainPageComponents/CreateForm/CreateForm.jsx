import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    OutlinedInput,
    Snackbar,
    Switch,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import axiosBase from "../../../../../config/axios";
import { useNavigate } from "react-router-dom";

const CreateForm = ({ setCreatingFormLoad }) => {
    const navigate = useNavigate();

    const [formName, setFormName] = useState(null);
    const [sendMail, setSendMail] = useState(false);
    const [isError, setIsError] = useState(false);

    const createNewForm = (e) => {
        e.preventDefault();
        setCreatingFormLoad(true);
        axiosBase
            .post("/create-new-form", { formName, sendMail })
            .then(() => {
                setCreatingFormLoad(false);
                navigate("/dashboard", { replace: true });
            })
            .catch((err) => {
                setIsError(true);
            });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
                <Typography
                    variant="h5"
                    sx={{ fontFamily: "Poppins", fontWeight: 700 }}
                >
                    Create a new Form
                </Typography>
            </Box>
            <form onSubmit={createNewForm}>
                <Card>
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                            p: 3,
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontWeight: 600,
                                    mb: 1,
                                }}
                            >
                                Enter form name:
                            </Typography>
                            <FormControl
                                sx={{ width: "100%" }}
                                variant="outlined"
                                size="small"
                                required
                            >
                                <OutlinedInput
                                    id="form-name"
                                    type="text"
                                    sx={{
                                        bgcolor: "#fff",
                                        fontFamily: "Poppins",
                                    }}
                                    onChange={(e) =>
                                        setFormName(e.target.value)
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins",
                                        fontWeight: 600,
                                    }}
                                >
                                    Enable email notification
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontFamily: "Poppins",
                                        fontWeight: 400,
                                    }}
                                >
                                    You will receive a notification via email
                                    every time a new form submission occurs.
                                </Typography>
                            </Box>
                            <Switch
                                onChange={(e) => setSendMail(e.target.checked)}
                            />
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    float: "right",
                                    textTransform: "capitalize",
                                    fontFamily: "Poppins",
                                    bgcolor: "#00bfff",
                                    fontWeight: 700,
                                    ":hover": {
                                        bgcolor: "#00bfff",
                                    },
                                }}
                            >
                                Create form
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </form>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={isError}
                autoHideDuration={3000}
                onClose={() => setIsError(false)}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                    onClose={() => setIsError(false)}
                >
                    Somthing went wrong!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CreateForm;
