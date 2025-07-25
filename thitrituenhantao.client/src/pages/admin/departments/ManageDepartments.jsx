import React, { useEffect, useState } from 'react';
import {
    Box, Button, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper,
    Grid, Tooltip, InputAdornment, MenuItem, Select, FormControl, InputLabel, Pagination
} from '@mui/material';
import { Add, Edit, Delete, Refresh, Search } from '@mui/icons-material';
import axios from 'axios';

const ManageDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [branches, setBranches] = useState([]);
    const [open, setOpen] = useState(false);
    const [editDept, setEditDept] = useState(null);
    const [form, setForm] = useState({
        tenPhongBan: '',
        moTa: '',
        chiNhanhId: ''
    });
    const [searchText, setSearchText] = useState('');
    const [selectedBranchId, setSelectedBranchId] = useState('');
    const [selectedDeptId, setSelectedDeptId] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const fetchDepartments = async () => {
        const res = await axios.get('https://localhost:7083/api/Company/structure');
        let allDepartments = [];
        const allBranches = res.data;
        setBranches(allBranches);

        allBranches.forEach(branch => {
            branch.phongBans.forEach(pb => {
                allDepartments.push({
                    ...pb,
                    chiNhanhId: branch.id,
                    tenChiNhanh: branch.tenChiNhanh
                });
            });
        });

        setDepartments(allDepartments);
        setFilteredDepartments(allDepartments);
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleOpen = (dept = null) => {
        setEditDept(dept);
        if (dept) {
            setForm({
                tenPhongBan: dept.tenPhongBan || '',
                moTa: dept.moTa || '',
                chiNhanhId: dept.chiNhanhId || ''
            });
        } else {
            setForm({ tenPhongBan: '', moTa: '', chiNhanhId: '' });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditDept(null);
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (editDept?.id) {
            await axios.put(`https://localhost:7083/api/Company/phongban/${editDept.id}`, form);
        } else {
            await axios.post('https://localhost:7083/api/Company/phongban', form);
        }
        handleClose();
        fetchDepartments();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa phòng ban này?")) {
            try {
                await axios.delete(`https://localhost:7083/api/Company/phongban/${id}`);
                fetchDepartments();
            } catch (error) {
                alert(error.response?.data || "Lỗi khi xóa phòng ban");
            }
        }
    };

    const handleSearch = () => {
        let result = [...departments];

        if (selectedBranchId) {
            result = result.filter(d => d.chiNhanhId === parseInt(selectedBranchId));
        }

        if (selectedDeptId) {
            result = result.filter(d => d.id === parseInt(selectedDeptId));
        }

        if (searchText.trim()) {
            result = result.filter(d =>
                d.tenPhongBan.toLowerCase().includes(searchText.trim().toLowerCase())
            );
        }

        setFilteredDepartments(result);
        setPage(1);
    };

    const handleResetSearch = () => {
        setSearchText('');
        setSelectedBranchId('');
        setSelectedDeptId('');
        setFilteredDepartments(departments);
        setPage(1);
    };

    const paginatedDepartments = filteredDepartments.slice((page - 1) * pageSize, page * pageSize);

    return (
        <Box p={4}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>Quản lý Phòng ban</Typography>
                <Box>
                    <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()} sx={{ mr: 1 }}>
                        Thêm phòng ban
                    </Button>
                    <Button variant="outlined" startIcon={<Refresh />} onClick={fetchDepartments}>
                        Làm mới
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Tìm theo tên phòng ban"
                        fullWidth
                        value={searchText}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchText(value);
                            if (value.trim() === '') handleResetSearch();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearch();
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Search /></InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Chọn chi nhánh</InputLabel>
                        <Select
                            value={selectedBranchId}
                            label="Chọn chi nhánh"
                            onChange={(e) => {
                                setSelectedBranchId(e.target.value);
                                if (!e.target.value) handleResetSearch();
                            }}
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            {branches.map(b => (
                                <MenuItem key={b.id} value={b.id}>{b.tenChiNhanh}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Chọn phòng ban</InputLabel>
                        <Select
                            value={selectedDeptId}
                            label="Chọn phòng ban"
                            onChange={(e) => {
                                setSelectedDeptId(e.target.value);
                                if (!e.target.value) handleResetSearch();
                            }}
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            {departments.map(d => (
                                <MenuItem key={d.id} value={d.id}>{d.tenPhongBan}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleSearch} sx={{ mr: 1 }}>Tìm kiếm</Button>
                    <Button variant="outlined" onClick={handleResetSearch}>Đặt lại</Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell><strong>Tên phòng ban</strong></TableCell>
                            <TableCell><strong>Mô tả</strong></TableCell>
                            <TableCell><strong>Chi nhánh</strong></TableCell>
                            <TableCell align="center"><strong>Thao tác</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedDepartments.map((d, i) => (
                            <TableRow key={d.id} sx={{ backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                                <TableCell>{d.tenPhongBan}</TableCell>
                                <TableCell>{d.moTa}</TableCell>
                                <TableCell>{d.tenChiNhanh}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Sửa">
                                        <Button size="small" onClick={() => handleOpen(d)}><Edit fontSize="small" /></Button>
                                    </Tooltip>
                                    <Tooltip title="Xóa">
                                        <Button size="small" color="error" onClick={() => handleDelete(d.id)}>
                                            <Delete fontSize="small" />
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                    count={Math.ceil(filteredDepartments.length / pageSize)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                />
            </Box>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{editDept ? 'Sửa phòng ban' : 'Thêm phòng ban mới'}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Tên phòng ban"
                                name="tenPhongBan"
                                fullWidth
                                value={form.tenPhongBan}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mô tả"
                                name="moTa"
                                fullWidth
                                multiline
                                value={form.moTa}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Chi nhánh</InputLabel>
                                <Select
                                    name="chiNhanhId"
                                    value={form.chiNhanhId}
                                    onChange={handleChange}
                                    label="Chi nhánh"
                                >
                                    {branches.map(b => (
                                        <MenuItem key={b.id} value={b.id}>{b.tenChiNhanh}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleSubmit} variant="contained">Lưu</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ManageDepartments;