import React from "react";
import { Box, Typography, Button } from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useNavigate } from "react-router-dom";

const AccessDeniedPage = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate("/"); // hoặc bất kỳ route nào bạn muốn
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f9f9f9"
            textAlign="center"
            px={2}
        >
            <WarningAmberIcon color="warning" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
                Không có quyền truy cập
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
                Bạn không có quyền truy cập vào trang này.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleBackHome}>
                Quay lại trang chủ
            </Button>
        </Box>
    );
};

export default AccessDeniedPage;
