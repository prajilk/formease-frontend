import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { NavigateNext, TextSnippet } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getStartedBtn, docsBtn, headerDes, headerBox } from "./Header";
import FormAnim from "../../../formAnimation/FormAnim";

const HeaderSection = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const getStartedBtnCustom = {
        ...getStartedBtn,
        [theme.breakpoints.down("md")]: { minWidth: "100%" },
    };
    const docsBtnCustom = {
        ...docsBtn,
        [theme.breakpoints.down("md")]: { minWidth: "100%" },
    };

    return (
        <section
            style={{
                padding: "6rem 0 5rem 0",
                background: `url(${process.env.PUBLIC_URL}/bg.jpg)`,
                backgroundSize: "cover",
                height: "800px",
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    [theme.breakpoints.down("md")]: {
                        display: "flex",
                        justifyContent: "center",
                    },
                }}
            >
                <Box sx={headerBox}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "Poppins",
                            fontWeight: 900,
                            [theme.breakpoints.down("md")]: {
                                fontSize: "2rem",
                            },
                        }}
                    >
                        Powerful{" "}
                        <span style={{ color: "#00bfff" }}>
                            Form Management
                        </span>{" "}
                        Made Simple with Our API Service
                    </Typography>
                    <Typography variant="h6" sx={headerDes}>
                        Say goodbye to manual{" "}
                        <span style={{ color: "#00bfff" }}>
                            form management
                        </span>{" "}
                        and enjoy effortless data storage with our powerful and
                        secure API service.{" "}
                        <span style={{ color: "#00bfff" }}>
                            Try it now for free!
                        </span>
                    </Typography>
                    <Box>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/dashboard")}
                            endIcon={<NavigateNext sx={{ fontWeight: 700 }} />}
                            sx={getStartedBtnCustom}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate("/docs")}
                            startIcon={<TextSnippet sx={{ fontWeight: 700 }} />}
                            sx={docsBtnCustom}
                        >
                            Docs
                        </Button>
                    </Box>
                </Box>
            </Container>
            <FormAnim />
        </section>
    );
};

export default HeaderSection;
