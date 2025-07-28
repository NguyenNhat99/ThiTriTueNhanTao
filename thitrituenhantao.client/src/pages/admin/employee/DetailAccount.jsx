import React, { useEffect, useRef, useState } from "react";
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
import dayjs from "dayjs";

const AccountDetailPage = () => {
    const { email } = useParams();
    const navigate = useNavigate();

    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [newImages, setNewImages] = useState([]);

    const hoTenRef = useRef();
    const gioiTinhRef = useRef();
    const soDtRef = useRef();
    const trinhDoRef = useRef();
    const ngayCapRef = useRef();
    const noiCapRef = useRef();
    const soNhaRef = useRef();
    const xaRef = useRef();
    const huyenRef = useRef();
    const tinhRef = useRef();
    const heSoLuongRef = useRef();
    const trangThaiRef = useRef();
    const ngayBatDauLamRef = useRef();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
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

    const handleImageChange = (e) => {
        setNewImages(Array.from(e.target.files));
    };

    const handleSubmit = async () => {
        setUpdating(true);
        try {
            const form = new FormData();
            form.append("Email", email);
            form.append("HoTen", hoTenRef.current.value);
            form.append("GioiTinh", gioiTinhRef.current.value === "Nam");
            form.append("SoDt", soDtRef.current.value);
            form.append("TrinhDo", trinhDoRef.current.value);
            form.append("NgayCap", ngayCapRef.current.value);
            form.append("NoiCap", noiCapRef.current.value);
            form.append("SoNha", soNhaRef.current.value);
            form.append("Xa", xaRef.current.value);
            form.append("Huyen", huyenRef.current.value);
            form.append("Tinh", tinhRef.current.value);
            form.append("HeSoLuong", heSoLuongRef.current.value);
            form.append("TrangThai", trangThaiRef.current.value);
            form.append("NgayBatDauLam", ngayBatDauLamRef.current.value);

            if (newImages.length > 0) {
                newImages.forEach((file) => {
                    console.log(file)
                    form.append("images", file);
                });
            }
            const success = await authService.updateEmployeeInformation(form);
            if (success) {
                alert("Cập nhật thành công!");
                setEditMode(false);
                setNewImages([]);
                const updated = await authService.getAccountDetail(email);
                setAccount(updated);
            } else {
                alert("Cập nhật thất bại.");
            }
        } catch (err) {
            alert("Lỗi khi cập nhật.");
        } finally {
            setUpdating(false);
        }
    };

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
                        Chi tiết tài khoản nhân viên: {account.email}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <Avatar
                                src={
                                    newImages.length > 0
                                        ? URL.createObjectURL(newImages[0])
                                        : account.images?.[0]
                                            ? `https://localhost:7083/assets/employeeimg/${account.images[0]}`
                                            : ""
                                }
                                sx={{ width: 130, height: 130, mx: "auto" }}
                            />
                            <Typography align="center" mt={1}>
                                {account.role}
                            </Typography>

                            {editMode && (
                                <Box mt={2}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                    />
                                </Box>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Họ và tên"
                                        inputRef={hoTenRef}
                                        defaultValue={account.hoTen}
                                        InputProps={{ readOnly: !editMode }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        value={account.email}
                                        InputProps={{ readOnly: true }}
                                    />
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
                                    <TextField
                                        fullWidth
                                        label="Giới tính"
                                        inputRef={gioiTinhRef}
                                        defaultValue={account.gioiTinh ? "Nam" : "Nữ"}
                                        InputProps={{ readOnly: !editMode }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="SĐT"
                                        inputRef={soDtRef}
                                        defaultValue={account.soDt}
                                        InputProps={{ readOnly: !editMode }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Trình độ"
                                        inputRef={trinhDoRef}
                                        defaultValue={account.trinhDo}
                                        InputProps={{ readOnly: !editMode }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Ngày cấp CCCD"
                                        inputRef={ngayCapRef}
                                        defaultValue={dayjs(account.ngayCap).format("YYYY-MM-DD")}
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{ readOnly: !editMode }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Nơi cấp CCCD"
                                        inputRef={noiCapRef}
                                        defaultValue={account.noiCap}
                                        InputProps={{ readOnly: !editMode }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Hệ số lương"
                                        inputRef={heSoLuongRef}
                                        defaultValue={account.heSoLuong}
                                        InputProps={{ readOnly: !editMode }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Trạng thái"
                                        inputRef={trangThaiRef}
                                        defaultValue={account.trangThai}
                                        InputProps={{ readOnly: !editMode }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Ngày bắt đầu làm"
                                        inputRef={ngayBatDauLamRef}
                                        defaultValue={dayjs(account.ngayBatDauLam).format("YYYY-MM-DD")}
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{ readOnly: !editMode }}
                                    />
                                </Grid>
                                {/* Hidden refs for address */}
                                <input hidden ref={soNhaRef} defaultValue={account.soNha} />
                                <input hidden ref={xaRef} defaultValue={account.xa} />
                                <input hidden ref={huyenRef} defaultValue={account.huyen} />
                                <input hidden ref={tinhRef} defaultValue={account.tinh} />
                            </Grid>
                        </Grid>

                        {account.images?.length > 1 && !editMode && (
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

                        {editMode ? (
                            <>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleSubmit}
                                    disabled={updating}
                                >
                                    {updating ? "Đang lưu..." : "Lưu"}
                                </Button>
                                <Button variant="outlined" onClick={() => setEditMode(false)}>
                                    Hủy
                                </Button>
                            </>
                        ) : (
                            <Button variant="contained" color="warning" onClick={() => setEditMode(true)}>
                                Cập nhật thông tin
                            </Button>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AccountDetailPage;
