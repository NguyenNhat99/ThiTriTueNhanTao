import React, { useState, useCallback } from "react";
import { Box, Button, TextField } from "@mui/material";
import authService from "../../../service/authService";

const ChangePasswordPage = ({ onSnackbar }) => {
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            onSnackbar({ open: true, status: "error", content: "Mật khẩu mới không khớp" });
            return;
        }

        try {
            setLoading(true);

            const success = await authService.updatePassword(
                form.currentPassword,
                form.newPassword
            );

            if (success) {
                onSnackbar({ open: true, status: "success", content: "Đổi mật khẩu thành công" });
                setForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } else {
                onSnackbar({ open: true, status: "error", content: "Đổi mật khẩu thất bại" });
            }
        } catch (err) {
            onSnackbar({ open: true, status: "error", content: "Đã xảy ra lỗi. Vui lòng thử lại sau!" });
        } finally {
            setLoading(false);
        }
    }, [form, onSnackbar]);

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                placeholder="Mật khẩu hiện tại"
                name="currentPassword"
                type="password"
                fullWidth
                margin="normal"
                value={form.currentPassword}
                onChange={handleChange}
                disabled={loading}
                required
            />
            <TextField
                placeholder="Mật khẩu mới"
                name="newPassword"
                type="password"
                fullWidth
                margin="normal"
                value={form.newPassword}
                onChange={handleChange}
                disabled={loading}
                required
            />
            <TextField
                placeholder="Xác nhận mật khẩu mới"
                name="confirmPassword"
                type="password"
                fullWidth
                margin="normal"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                required
            />
            <Box mt={2}>
                <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    disabled={loading}
                >
                    {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                </Button>
            </Box>
        </Box>
    );
};

export default ChangePasswordPage;
