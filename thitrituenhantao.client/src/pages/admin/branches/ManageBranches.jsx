import React, { useEffect, useState } from 'react';
import {
    Box, Button, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper,
    Grid, Tooltip, MenuItem, InputAdornment, Pagination
} from '@mui/material';
import { Add, Edit, Delete, Refresh, Search } from '@mui/icons-material';
import axios from 'axios';

const ManageBranches = () => {
    const [branches, setBranches] = useState([]);
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [displayedBranches, setDisplayedBranches] = useState([]);

    const [open, setOpen] = useState(false);
    const [editBranch, setEditBranch] = useState(null);
    const [form, setForm] = useState({
        tenChiNhanh: '', soNha: '', xa: '', huyen: '', tinh: ''
    });

    const [searchText, setSearchText] = useState('');
    const [selectedBranchId, setSelectedBranchId] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const fetchBranches = async () => {
        const res = await axios.get('https://localhost:7083/api/Company/structure');
        setBranches(res.data);
        setFilteredBranches(res.data);
        setPage(1);
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    useEffect(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        setDisplayedBranches(filteredBranches.slice(start, end));
    }, [filteredBranches, page]);

    const handleOpen = (branch = null) => {
        setEditBranch(branch);
        if (branch) {
            setForm({
                tenChiNhanh: branch.tenChiNhanh || '',
                soNha: branch.soNha || '',
                xa: branch.xa || '',
                huyen: branch.huyen || '',
                tinh: branch.tinh || '',
            });
        } else {
            setForm({ tenChiNhanh: '', soNha: '', xa: '', huyen: '', tinh: '' });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditBranch(null);
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (editBranch?.id) {
            await axios.put(`https://localhost:7083/api/Company/chinhanh/${editBranch.id}`, form);
        } else {
            await axios.post('https://localhost:7083/api/Company/chinhanh', form);
        }
        handleClose();
        fetchBranches();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa chi nhánh này?")) {
            try {
                await axios.delete(`https://localhost:7083/api/Company/chinhanh/${id}`);
                fetchBranches();
            } catch (error) {
                alert(error.response?.data || "Lỗi khi xóa chi nhánh");
            }
        }
    };

    const handleSearch = () => {
        let result = [...branches];

        if (selectedBranchId) {
            result = result.filter(b => b.id === parseInt(selectedBranchId));
        }

        if (searchText.trim()) {
            result = result.filter(b =>
                b.tenChiNhanh.toLowerCase().includes(searchText.trim().toLowerCase())
            );
        }

        setFilteredBranches(result);
        setPage(1);
    };

    const handleResetSearch = () => {
        setSearchText('');
        setSelectedBranchId('');
        setFilteredBranches(branches);
        setPage(1);
    };

    return (
        <Box p={4}>
            <Typography variant="h5" fontWeight={600} mb={3}>Quản lý Chi nhánh</Typography>

            {/* Tìm kiếm */}
            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Tìm theo tên"
                        fullWidth
                        value={searchText}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchText(value);

                            if (value.trim() === '') {
                                handleResetSearch(); // nếu ô tìm trống thì reset danh sách
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Search /></InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        select
                        fullWidth
                        label="Chọn chi nhánh"
                        value={selectedBranchId}
                        onChange={(e) => setSelectedBranchId(e.target.value)}
                    >
                        <MenuItem value="">-- Tất cả --</MenuItem>
                        {branches.map(branch => (
                            <MenuItem key={branch.id} value={branch.id}>
                                {branch.tenChiNhanh}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={4} display="flex" alignItems="center">
                    <Button variant="contained" onClick={handleSearch} sx={{ mr: 1 }}>Tìm kiếm</Button>
                    <Button variant="outlined" onClick={handleResetSearch}>Xóa lọc</Button>
                </Grid>
            </Grid>

            {/* Thao tác */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
                    Thêm chi nhánh
                </Button>
                <Button variant="outlined" startIcon={<Refresh />} onClick={fetchBranches}>
                    Làm mới
                </Button>
            </Box>

            {/* Danh sách */}
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell><strong>Tên chi nhánh</strong></TableCell>
                            <TableCell><strong>Địa chỉ</strong></TableCell>
                            <TableCell align="center"><strong>Thao tác</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedBranches.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">Không tìm thấy chi nhánh nào.</TableCell>
                            </TableRow>
                        ) : (
                            displayedBranches.map((b, i) => (
                                <TableRow key={b.id} sx={{ backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                                    <TableCell>{b.tenChiNhanh}</TableCell>
                                    <TableCell>{[b.soNha, b.xa, b.huyen, b.tinh].filter(Boolean).join(', ')}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Sửa">
                                            <Button size="small" onClick={() => handleOpen(b)}>
                                                <Edit fontSize="small" />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Xóa">
                                            <Button size="small" color="error" onClick={() => handleDelete(b.id)}>
                                                <Delete fontSize="small" />
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Phân trang */}
            <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                    count={Math.ceil(filteredBranches.length / rowsPerPage)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                />
            </Box>

            {/* Form thêm/sửa */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{editBranch ? 'Sửa chi nhánh' : 'Thêm chi nhánh mới'}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Tên chi nhánh" name="tenChiNhanh" fullWidth value={form.tenChiNhanh} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Số nhà" name="soNha" fullWidth value={form.soNha} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Xã" name="xa" fullWidth value={form.xa} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Huyện" name="huyen" fullWidth value={form.huyen} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Tỉnh" name="tinh" fullWidth value={form.tinh} onChange={handleChange} />
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

export default ManageBranches;