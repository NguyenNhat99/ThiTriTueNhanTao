import React, { useContext, useState, lazy } from "react";
import { Container, Paper, Typography, Tabs, Tab, Box } from "@mui/material";
import AuthContext from "../../../context/AuthContext";
import CustomizedSnackbars from "../../../components/Snackbar/Alert";
const InformationPage = lazy(() => import("./Information"));
const ChangePasswordPage = lazy(() => import("./ChangePassword"));

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [tabIndex, setTabIndex] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, content: "", status: "" });

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleSnackbar = (data) => {
        setSnackbar(data);
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <CustomizedSnackbars
                open={snackbar.open}
                status={snackbar.status}
                content={snackbar.content}
                onClose={handleCloseSnackbar}
            />
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Trang cá nhân
                </Typography>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="profile tabs" sx={{ mb: 3 }}>
                    <Tab label="Thông tin cá nhân" />
                    <Tab label="Đổi mật khẩu" />
                </Tabs>

                <Box>
                    {tabIndex === 0 && <InformationPage user={user} onSnackbar={handleSnackbar} />}
                    {tabIndex === 1 && <ChangePasswordPage onSnackbar={handleSnackbar} />}
                </Box>
            </Paper>
            </Container>
        </Box>
    );
};

export default ProfilePage;
