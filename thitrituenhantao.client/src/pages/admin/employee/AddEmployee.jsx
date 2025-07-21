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
import axios from "axios";
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
        .sort(() => 0.5 - Math.random()) // shuffle
        .join("");

    return password;
};

const AddEmployeeForm = () => {
    const navigate = useNavigate();
    const [previewImages, setPreviewImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({
        open: false,
        severity: "success",
        message: ""
    });
    const handleGeneratePassword = () => {
        const newPassword = generatePassword();
        if (matKhauRef.current) {
            matKhauRef.current.value = newPassword;
        }
    };

    const [ngayBatDauLam, setNgayBatDauLam] = useState(""); // ✅ dùng useState

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

    const [images, setImages] = useState([]);

    const handleImagesChange = useCallback((e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setImages(files);
            const previews = files.map(file => URL.createObjectURL(file));
            setPreviewImages(previews);
        }
    }, []);

    const handleCloseNotification = useCallback(() => {
        setNotification(prev => ({ ...prev, open: false }));
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!hoTenRef.current?.value.trim()) newErrors.hoTen = "Vui lòng nhập họ tên";
        if (!emailRef.current?.value.trim()) newErrors.email = "Vui lòng nhập email";
        if (!matKhauRef.current?.value.trim()) newErrors.matKhau = "Vui lòng nhập mật khẩu";
        if (!soDtRef.current?.value.trim()) newErrors.soDt = "Vui lòng nhập số điện thoại";
        if (gioiTinhRef.current?.value === "") newErrors.gioiTinh = "Vui lòng chọn giới tính";
        if (!heSoLuongRef.current?.value.trim()) newErrors.heSoLuong = "Vui lòng nhập hệ số lương";
        if (!cccdRef.current?.value.trim()) newErrors.cccd = "Vui lòng nhập CCCD";
        if (!ngayCapRef.current?.value.trim()) newErrors.ngayCap = "Vui lòng nhập ngày cấp";
        if (!noiCapRef.current?.value.trim()) newErrors.noiCap = "Vui lòng nhập nơi cấp";
        if (!tinhRef.current?.value.trim()) newErrors.tinh = "Vui lòng nhập tỉnh";
        if (!huyenRef.current?.value.trim()) newErrors.huyen = "Vui lòng nhập huyện";
        if (!xaRef.current?.value.trim()) newErrors.xa = "Vui lòng nhập xã";
        if (!soNhaRef.current?.value.trim()) newErrors.soNha = "Vui lòng nhập số nhà";
        if (trangThaiRef.current?.value === "") newErrors.trangThai = "Vui lòng chọn trạng thái";
        if (!trinhDoRef.current?.value.trim()) newErrors.trinhDo = "Vui lòng nhập trình độ";
        if (!ngayBatDauLam.trim()) newErrors.ngayBatDauLam = "Vui lòng chọn ngày bắt đầu làm";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

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
        formData.append("NgayBatDauLam", ngayBatDauLam); // ✅ dùng state
        images.forEach(file => formData.append("images", file));

        try {
            const response = await axios.post("https://localhost:7083/api/accounts/auth/singup", formData);
            setNotification({
                open: true,
                severity: "success",
                message: response.data.message || "Thêm nhân viên thành công"
            });
        } catch (error) {
            console.error("Lỗi khi gọi API đăng ký:", error);
            setNotification({
                open: true,
                severity: "error",
                message: error.response?.data?.message || "Thêm nhân viên thất bại"
            });
        }
    };

    const handleCancel = () => navigate("/admin/quan-ly-nhan-vien");

    return (
        <Box >
            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    sx={{ width: "100%" }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>

            <Typography variant="h4" sx={{ mb: '5px' }}>Thêm nhân viên</Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField placeholder="Họ tên" fullWidth inputRef={hoTenRef} variant="outlined" required />
                <TextField placeholder="Email (your@email.com)" fullWidth sx={{ mt: '10px' }} inputRef={emailRef} variant="outlined" required />
                <TextField
                    placeholder="Mật khẩu"
                    type="text"
                    fullWidth
                    sx={{ mt: '10px' }}
                    inputRef={matKhauRef}
                    variant="outlined"
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleGeneratePassword} title="Tạo mật khẩu ngẫu nhiên">
                                    <RefreshIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3, rowGap: 2, mt: '10px' }}>
                    <TextField placeholder="Số điện thoại" inputRef={soDtRef} variant="outlined" required sx={{ flex: 1, minWidth: "250px" }} />
                    <FormControl required sx={{ flex: 1, minWidth: "250px" }}>
                        <InputLabel id="gioitinh-label">Giới tính</InputLabel>
                        <Select labelId="gioitinh-label" defaultValue="chọn" inputRef={gioiTinhRef} label="Giới tính">
                            <MenuItem value="chọn">Chọn</MenuItem>
                            <MenuItem value={true}>Nam</MenuItem>
                            <MenuItem value={false}>Nữ</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField placeholder="Hệ số lương" inputRef={heSoLuongRef} variant="outlined" required sx={{ flex: 1, minWidth: "250px" }} />
                </Box>


                {/* CCCD - Ngày cấp - Nơi cấp */}
                <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3, rowGap: 2, mt: '10px' }}>
                    <TextField placeholder="Số CCCD" inputRef={cccdRef} variant="outlined" required sx={{ flex: 1, minWidth: "250px" }} />
                    <TextField placeholder="Ngày cấp" inputRef={ngayCapRef} variant="outlined" required sx={{ flex: 1, minWidth: "250px" }} />
                    <TextField placeholder="Nơi cấp" inputRef={noiCapRef} variant="outlined" required sx={{ flex: 1, minWidth: "250px" }} />
                </Box>

                {/* Tỉnh - Huyện - Xã - Số nhà */}
                <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3, rowGap: 2, mt: '10px' }}>
                    <TextField placeholder="Tỉnh" inputRef={tinhRef} variant="outlined" required sx={{ flex: 1, minWidth: "250px" }} />
                    <TextField placeholder="Huyện" inputRef={huyenRef} variant="outlined" required sx={{ flex: 1, minWidth: "250px" }} />
                    <TextField placeholder="Xã" inputRef={xaRef} variant="outlined" required sx={{ flex: 1, minWidth: "250px" }} />
                    <TextField placeholder="Số nhà" inputRef={soNhaRef} variant="outlined" required sx={{ flex: 1, minWidth: "250px" }} />
                </Box>

                {/* Trình độ - Ngày bắt đầu làm - Trạng thái */}
                <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3, rowGap: 2, mt: '10px' }}>
                    <TextField placeholder="Trình độ" inputRef={trinhDoRef} variant="outlined" required sx={{ flex: 1, minWidth: "250px" }} />
                    <TextField
                        label="Ngày bắt đầu làm"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={ngayBatDauLam}
                        onChange={(e) => setNgayBatDauLam(e.target.value)}
                        required
                        variant="outlined"
                        sx={{ flex: 1, minWidth: "250px" }}
                    />
                    <FormControl required sx={{ flex: 1, minWidth: "250px" }}>
                        <InputLabel id="trangthai-label">Trạng thái</InputLabel>
                        <Select labelId="trangthai-label" defaultValue="Đang hoạt động" inputRef={trangThaiRef} label="Trạng thái">
                            <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
                            <MenuItem value="Tạm nghỉ">Tạm nghỉ</MenuItem>
                            <MenuItem value="Đã nghỉ việc">Đã nghỉ việc</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Upload ảnh */}
                <Box sx={{ gap: 2 }}>
                    <Button
                        variant="contained"
                        component="label"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Tải ảnh nhân viên
                        <input
                            type="file"
                            multiple
                            hidden
                            accept="image/*"
                            onChange={handleImagesChange}
                        />
                    </Button>

                    {previewImages.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">Ảnh xem trước:</Typography>
                            {previewImages.map((urlImg, index) => (
                                <img
                                    key={index}
                                    src={urlImg}
                                    alt="preview"
                                    style={{
                                        width: "20%",
                                        maxHeight: 250,
                                        objectFit: "cover",
                                        borderRadius: 8,
                                        marginRight: 10,
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Button */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Thêm nhân viên
                    </Button>
                    <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleCancel}>
                        Hủy
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AddEmployeeForm;
