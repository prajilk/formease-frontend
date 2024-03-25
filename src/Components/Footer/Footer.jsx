import React from "react";
import {
    Container,
    Box,
    Typography,
    Link,
    List,
    ListItem,
} from "@mui/material";
import "./Footer.css";
import { footerListItem } from "./FooterSx";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer>
            <Container maxWidth="md" sx={{ position: "relative" }}>
                <Container maxWidth="md">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            pt: 5,
                            gap: 3,
                            flexWrap: "wrap-reverse",
                        }}
                    >
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <img
                                src="logo.png"
                                alt=""
                                width="50px"
                                height="40px"
                            />
                            <Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography
                                        sx={{
                                            color: "#fff",
                                            fontWeight: 300,
                                            fontFamily: "Poppins",
                                        }}
                                    >
                                        form
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#fff",
                                            fontWeight: 700,
                                            fontFamily: "Poppins",
                                        }}
                                    >
                                        ease
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 300,
                                        fontFamily: "Poppins",
                                    }}
                                >
                                    &copy; 2022, All rights reserved
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                gap: 1,
                                flexWrap: "wrap",
                                flex: 1,
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 800,
                                        fontFamily: "Poppins",
                                        mb: 1,
                                    }}
                                >
                                    Navigation
                                </Typography>
                                <List
                                    sx={{ p: 0, justifyContent: "flex-start" }}
                                >
                                    <ListItem
                                        onClick={() => navigate("/docs")}
                                        sx={footerListItem}
                                    >
                                        Docs
                                    </ListItem>
                                    <ListItem
                                        onClick={() => navigate("/dashboard")}
                                        sx={footerListItem}
                                    >
                                        Dashboard
                                    </ListItem>
                                    <ListItem
                                        onClick={() =>
                                            navigate("/dashboard/login")
                                        }
                                        sx={footerListItem}
                                    >
                                        Login
                                    </ListItem>
                                    <ListItem
                                        onClick={() =>
                                            navigate("/dashboard/register")
                                        }
                                        sx={footerListItem}
                                    >
                                        Register
                                    </ListItem>
                                    <ListItem
                                        onClick={() => navigate("/contact")}
                                        sx={footerListItem}
                                    >
                                        Contact
                                    </ListItem>
                                </List>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 800,
                                        fontFamily: "Poppins",
                                        mb: 1,
                                    }}
                                >
                                    Contact Developer
                                </Typography>
                                <Link
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=prajilk20017@gmail.com"
                                    target="_blank"
                                    rel="noopener"
                                    sx={footerListItem}
                                >
                                    prajilk20017@gmail.com
                                </Link>
                                <Link
                                    href="https://prajilk.github.io/"
                                    target="_blank"
                                    rel="noopener"
                                    sx={footerListItem}
                                >
                                    Website
                                </Link>
                                <Link
                                    href="https://linkedin.com/in/prajilk/"
                                    target="_blank"
                                    rel="noopener"
                                    sx={footerListItem}
                                >
                                    Linkedin
                                </Link>
                                <Link
                                    href="https://github.com/prajilk"
                                    target="_blank"
                                    rel="noopener"
                                    sx={footerListItem}
                                >
                                    Github
                                </Link>
                                <Link
                                    href="https://www.instagram.com/p_ra_jil/"
                                    target="_blank"
                                    rel="noopener"
                                    sx={footerListItem}
                                >
                                    Instagram
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Container>
        </footer>
    );
};

export default Footer;
