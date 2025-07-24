import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Box,
    Divider,
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../../../service/authService";

const AccountDetailPage = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(account);
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                console.log(email);
                const data = await authService.getAccountDetail(email);
                setAccount(data);
            } catch (error) {
                alert(error.message || "Không thể lấy dữ liệu.");
                navigate("/admin/quan-ly-nhan-vien");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [email]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress />
            </Box>
        );
    }

    if (!account) return null;

    return (
        <Box>
            <Card sx={{ maxWidth: 1000, mx: "auto", mt: 5, p: 3, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Chi tiết tài khoản nhân viên
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <Avatar
                                src={account.images?.[0]}
                                sx={{ width: 130, height: 130, mx: "auto" }}
                            />
                            <Typography align="center" mt={1}>
                                {account.role}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Họ và tên" value={account.hoTen} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Email" value={account.email} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ"
                                        value={`${account.soNha}, ${account.xa}, ${account.huyen}, ${account.tinh}`}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="Giới tính" value={account.gioiTinh} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="SĐT" value={account.soDt} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="Trình độ" value={account.trinhDo} InputProps={{ readOnly: true }} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Ngày cấp CCCD"
                                        value={new Date(account.ngayCap).toLocaleDateString('vi-VN')}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Nơi cấp CCCD" value={account.noiCap} InputProps={{ readOnly: true }} />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="Hệ số lương" value={account.heSoLuong} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="Trạng thái" value={account.trangThai} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Ngày bắt đầu làm"
                                        value={new Date(account.ngayBatDauLam).toLocaleDateString('vi-VN')}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        {account.images?.length > 1 && (
                            <Grid item xs={12}>
                                <Typography mt={2}>Hình ảnh:</Typography>
                                <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                                    {account.images.map((img, idx) => (
                                        <Avatar
                                            key={idx}
                                            src={`https://localhost:7083/assets/employeeimg/${img}`}
                                            variant="rounded"
                                            sx={{ width: 100, height: 100 }}
                                        />
                                    ))}
                                </Box>
                            </Grid>
                        )}
                    </Grid>

                    <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="outlined" onClick={() => navigate(-1)}>
                            Quay lại
                        </Button>
                        <Button variant="contained" color="error">
                            Xóa nhân viên
                        </Button>
                        <Button variant="contained" color="secondary">
                            Phân quyền
                        </Button>
                        <Button variant="contained" color="warning">
                            Cập nhật thông tin
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AccountDetailPage;
