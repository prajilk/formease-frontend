import React from "react";
import Nav from "../Components/Nav/Nav";
import Header from "./Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const Contact = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}
        >
            <Nav />
            <Header />
            <Footer />
        </div>
    );
};

export default Contact;
