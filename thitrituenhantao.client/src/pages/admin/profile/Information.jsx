import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    Grid,
    Typography,
} from "@mui/material";
import authService from "../../../service/authService";

const InformationPage = ({ user, onSnackbar }) => {
    const [infoData, setInfoData] = useState({
        email: "",
        soDt: "",
        hoTen: "",
        gioiTinh: true,
        cccd: "",
        ngayCap: "",
        noiCap: "",
        soNha: "",
        xa: "",
        huyen: "",
        tinh: "",
        heSoLuong: 0,
        trangThai: "",
        trinhDo: "",
        ngayBatDauLam: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setInfoData({
                email: user.email || "",
                soDt: user.soDt || "",
                hoTen: user.hoTen || "",
                gioiTinh: user.gioiTinh ?? true,
                cccd: user.cccd || "",
                ngayCap: user.ngayCap?.substring(0, 10) || "",
                noiCap: user.noiCap || "",
                soNha: user.soNha || "",
                xa: user.xa || "",
                huyen: user.huyen || "",
                tinh: user.tinh || "",
                heSoLuong: user.heSoLuong || 0,
                trangThai: user.trangThai || "",
                trinhDo: user.trinhDo || "",
                ngayBatDauLam: user.ngayBatDauLam?.substring(0, 10) || "",
                role: user.role || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfoData((prev) => ({
            ...prev,
            [name]: name === "gioiTinh" ? value === "true" : value,
        }));
    };

    const handleUpdate = async () => {
        setLoading(true);
        const result = await authService.updateInformation(infoData);
        if (result) {
            onSnackbar({ open: true, status: "success", content: "Cập nhật thông tin thành công" });
        } else {
            onSnackbar({ open: true, status: "error", content: "Cập nhật thất bại" });
        }
        setLoading(false);
    };

    return (
        <Box component="form" noValidate autoComplete="off" p={2}>
            <Typography variant="h6" gutterBottom>Thông tin cá nhân</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>Email</Typography>
                    <TextField name="email" value={infoData.email} fullWidth disabled placeholder="Email" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>Số điện thoại</Typography>
                    <TextField name="soDt" value={infoData.soDt} onChange={handleChange} fullWidth placeholder="Số điện thoại" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>Họ tên</Typography>
                    <TextField name="hoTen" value={infoData.hoTen} onChange={handleChange} fullWidth placeholder="Họ tên" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>Giới tính</Typography>
                    <FormControl fullWidth>
                        <Select name="gioiTinh" value={infoData.gioiTinh.toString()} onChange={handleChange}>
                            <MenuItem value="true">Nam</MenuItem>
                            <MenuItem value="false">Nữ</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>CCCD</Typography>
                    <TextField name="cccd" value={infoData.cccd} onChange={handleChange} fullWidth placeholder="CCCD" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>Ngày cấp</Typography>
                    <TextField
                        name="ngayCap"
                        type="date"
                        value={infoData.ngayCap}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        placeholder="Ngày cấp"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>Nơi cấp</Typography>
                    <TextField name="noiCap" value={infoData.noiCap} onChange={handleChange} fullWidth placeholder="Nơi cấp" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>Số nhà</Typography>
                    <TextField name="soNha" value={infoData.soNha} onChange={handleChange} fullWidth placeholder="Số nhà" />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography variant="body2" mb={0.5}>Xã</Typography>
                    <TextField name="xa" value={infoData.xa} onChange={handleChange} fullWidth placeholder="Xã" />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography variant="body2" mb={0.5}>Huyện</Typography>
                    <TextField name="huyen" value={infoData.huyen} onChange={handleChange} fullWidth placeholder="Huyện" />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography variant="body2" mb={0.5}>Tỉnh</Typography>
                    <TextField name="tinh" value={infoData.tinh} onChange={handleChange} fullWidth placeholder="Tỉnh" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>Hệ số lương</Typography>
                    <TextField
                        name="heSoLuong"
                        type="number"
                        inputProps={{ step: "0.01", min: "0" }}
                        value={infoData.heSoLuong}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Hệ số lương"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>Trình độ</Typography>
                    <TextField name="trinhDo" value={infoData.trinhDo} onChange={handleChange} fullWidth placeholder="Trình độ" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>Trạng thái</Typography>
                    <TextField name="trangThai" value={infoData.trangThai} onChange={handleChange} fullWidth placeholder="Trạng thái" disabled />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>Ngày bắt đầu làm</Typography>
                    <TextField
                        name="ngayBatDauLam"
                        type="date"
                        value={infoData.ngayBatDauLam}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        placeholder="Ngày bắt đầu làm"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5}>Vai trò</Typography>
                    <TextField name="role" value={infoData.role === "admin" ? "Quản trị" : infoData.role === "QuanLy" ? "Quản lý" : "Nhân viên"} onChange={handleChange} fullWidth placeholder="Vai trò" disabled />
                </Grid>
            </Grid>

            <Box mt={3}>
                <Button variant="contained" onClick={handleUpdate} disabled={loading}>
                    {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
                </Button>
            </Box>
        </Box>
    );
};

export default InformationPage;
