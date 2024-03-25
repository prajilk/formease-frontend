import { Backdrop, Card, CircularProgress, Typography } from "@mui/material";

const PageLoading = () => {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <Card
                sx={{
                    px: 5,
                    py: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                <CircularProgress />
                <Typography sx={{ fontFamily: "Poppins", fontWeight: 300 }}>
                    Loading...
                </Typography>
            </Card>
        </Backdrop>
    );
};

export default PageLoading;
