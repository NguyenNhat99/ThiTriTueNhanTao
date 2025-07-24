import React, { useState, useCallback, useRef } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Snackbar,
    Alert,
    InputAdornment,
    IconButton
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import authService from "../../../service/authService";

const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const number = "0123456789";
    const special = "!@#$%^&*()_+[]{}|;:,.<>?";
    const all = upper + lower + number + special;

    const getRandomChar = (set) => set[Math.floor(Math.random() * set.length)];

    const password = [
        getRandomChar(upper),
        getRandomChar(lower),
        getRandomChar(number),
        getRandomChar(special),
        ...Array.from({ length: 6 }, () => getRandomChar(all)),
    ]
        .sort(() => 0.5 - Math.random())
        .join("");

    return password;
};

const AddEmployeeForm = () => {
    const navigate = useNavigate();
    const [previewImages, setPreviewImages] = useState([]);
    const [images, setImages] = useState([]);
    const [ngayBatDauLam, setNgayBatDauLam] = useState("");
    const [notification, setNotification] = useState({ open: false, severity: "success", message: "" });

    const hoTenRef = useRef();
    const emailRef = useRef();
    const matKhauRef = useRef();
    const soDtRef = useRef();
    const gioiTinhRef = useRef();
    const heSoLuongRef = useRef();
    const cccdRef = useRef();
    const ngayCapRef = useRef();
    const noiCapRef = useRef();
    const tinhRef = useRef();
    const huyenRef = useRef();
    const xaRef = useRef();
    const soNhaRef = useRef();
    const trangThaiRef = useRef();
    const trinhDoRef = useRef();

    const handleImagesChange = useCallback((e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    }, []);

    const handleGeneratePassword = () => {
        const newPassword = generatePassword();
        if (matKhauRef.current) {
            matKhauRef.current.value = newPassword;
        }
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    const handleCancel = () => navigate("/admin/quan-ly-nhan-vien");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Email", emailRef.current.value);
        formData.append("MatKhau", matKhauRef.current.value);
        formData.append("SoDt", soDtRef.current.value);
        formData.append("HoTen", hoTenRef.current.value);
        formData.append("GioiTinh", gioiTinhRef.current.value);
        formData.append("CCCD", cccdRef.current.value);
        formData.append("NgayCap", ngayCapRef.current.value);
        formData.append("NoiCap", noiCapRef.current.value);
        formData.append("SoNha", soNhaRef.current.value);
        formData.append("Xa", xaRef.current.value);
        formData.append("Huyen", huyenRef.current.value);
        formData.append("Tinh", tinhRef.current.value);
        formData.append("HeSoLuong", heSoLuongRef.current.value);
        formData.append("TrangThai", trangThaiRef.current.value);
        formData.append("TrinhDo", trinhDoRef.current.value);
        formData.append("NgayBatDauLam", ngayBatDauLam);
        images.forEach(file => formData.append("images", file));

        try {
            const res = await authService.signUp(formData);
            setNotification({ open: true, severity: "success", message: res.message || "Thêm nhân viên thành công" });
        } catch (err) {
            setNotification({ open: true, severity: "error", message: err.message || "Thêm nhân viên thất bại" });
        }
    };

    return (
        <Box sx={{ px: 3 }}>
            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
                    {notification.message}
                </Alert>
            </Snackbar>

            <Typography variant="h4" sx={{ mb: 2 }}>Thêm nhân viên</Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField placeholder="Họ tên" fullWidth inputRef={hoTenRef} variant="outlined" required />
                <TextField placeholder="Email" fullWidth sx={{ mt: 2 }} inputRef={emailRef} variant="outlined" required />
                <TextField
                    placeholder="Mật khẩu"
                    type="text"
                    fullWidth
                    sx={{ mt: 2 }}
                    inputRef={matKhauRef}
                    variant="outlined"
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleGeneratePassword}>
                                    <RefreshIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                    <TextField placeholder="Số điện thoại" inputRef={soDtRef} sx={{ flex: 1 }} required />
                    <FormControl sx={{ flex: 1 }} required>
                        <InputLabel>Giới tính</InputLabel>
                        <Select defaultValue="true" inputRef={gioiTinhRef} placeholder="Giới tính">
                            <MenuItem value="true">Nam</MenuItem>
                            <MenuItem value="false">Nữ</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField placeholder="Hệ số lương" inputRef={heSoLuongRef} sx={{ flex: 1 }} required />
                </Box>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                    <TextField placeholder="CCCD" inputRef={cccdRef} sx={{ flex: 1 }} required />
                    <TextField placeholder="Ngày cấp" type="date" InputLabelProps={{ shrink: true }} inputRef={ngayCapRef} sx={{ flex: 1 }} required />
                    <TextField placeholder="Nơi cấp" inputRef={noiCapRef} sx={{ flex: 1 }} required />
                </Box>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                    <TextField placeholder="Tỉnh" inputRef={tinhRef} sx={{ flex: 1 }} required />
                    <TextField placeholder="Huyện" inputRef={huyenRef} sx={{ flex: 1 }} required />
                    <TextField placeholder="Xã" inputRef={xaRef} sx={{ flex: 1 }} required />
                    <TextField placeholder="Số nhà" inputRef={soNhaRef} sx={{ flex: 1 }} required />
                </Box>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                    <TextField placeholder="Trình độ" inputRef={trinhDoRef} sx={{ flex: 1 }} required />
                    <TextField
                        placeholder="Ngày bắt đầu làm"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={ngayBatDauLam}
                        onChange={(e) => setNgayBatDauLam(e.target.value)}
                        sx={{ flex: 1 }}
                        required
                    />
                    <FormControl sx={{ flex: 1 }} required>
                        <InputLabel>Trạng thái</InputLabel>
                        <Select defaultValue="Đang hoạt động" inputRef={trangThaiRef} placeholder="Trạng thái">
                            <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
                            <MenuItem value="Tạm nghỉ">Tạm nghỉ</MenuItem>
                            <MenuItem value="Đã nghỉ việc">Đã nghỉ việc</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" component="label" fullWidth>
                        Tải ảnh nhân viên
                        <input type="file" hidden multiple accept="image/*" onChange={handleImagesChange} />
                    </Button>
                    {previewImages.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">Ảnh xem trước:</Typography>
                            {previewImages.map((url, i) => (
                                <img key={i} src={url} alt={`preview-${i}`} style={{ width: "20%", marginRight: 8, borderRadius: 8 }} />
                            ))}
                        </Box>
                    )}
                </Box>

                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Thêm nhân viên
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleCancel}>
                        Hủy
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AddEmployeeForm;
