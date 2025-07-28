import React, { useEffect, useState, useCallback, Suspense } from 'react';
import {
    Box, Typography, Paper, Chip, Button, Stack, CircularProgress,
    TextField, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, MenuItem, Pagination
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import authService from '../../../service/authService';

const Visibility = React.lazy(() => import('@mui/icons-material/Visibility'));
const Delete = React.lazy(() => import('@mui/icons-material/Delete'));

const renderStatus = (status) => {
    const colorMap = {
        'Đang hoạt động': 'success',
        'Tạm nghỉ': 'warning',
        'Nghỉ việc': 'error',
    };
    return (
        <Chip
            label={status}
            color={colorMap[status] || 'default'}
            size="small"
            variant="outlined"
        />
    );
};

export default function EmployeeManagementPage() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const handleAddEmployee = useCallback(() => {
        navigate('/admin/them-nhan-vien');
    }, [navigate]);

    const handleDetail = useCallback((row) => {
        navigate(`/admin/quan-ly-nhan-vien/chi-tiet-nhan-vien/${row.email}`);
    }, [navigate]);

    const handleDelete = useCallback(async (row) => {
        if (!window.confirm(`Bạn có chắc muốn xóa nhân viên "${row.fullName}" không?`)) return;
        try {
            await authService.deleteAccount(row.email);
            const updated = employees.filter((emp) => emp.email !== row.email);
            setEmployees(updated);
            applyFilter(updated, searchText, statusFilter);
        } catch (error) {
            console.error('Lỗi khi xóa nhân viên:', error);
            alert('Không thể xóa nhân viên.');
        }
    }, [employees, searchText, statusFilter]);

    const applyFilter = (list, text, status) => {
        let result = [...list];
        if (text) {
            result = result.filter(emp =>
                emp.fullName.toLowerCase().includes(text.toLowerCase())
            );
        }
        if (status) {
            result = result.filter(emp => emp.status === status);
        }
        setFilteredEmployees(result);
        setPage(1);
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await authService.getAccounts();
                const mapped = data.map((acc, index) => ({
                    id: index + 1,
                    fullName: acc.hoTen,
                    email: acc.email,
                    phone: acc.soDt,
                    position: acc.role === "QuanLy" ? "Quản lý" : acc.role === "admin" ? "Quản trị" : "Nhân viên",
                    status: acc.trangThai,
                    startDate: new Date(acc.ngayBatDauLam).toLocaleDateString('vi-VN'),
                }));
                setEmployees(mapped);
                setFilteredEmployees(mapped);
            } catch (err) {
                console.error('Lỗi lấy danh sách nhân viên:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
        applyFilter(employees, text, statusFilter);
    };

    const handleStatusChange = (e) => {
        const status = e.target.value;
        setStatusFilter(status);
        applyFilter(employees, searchText, status);
    };

    const paginatedEmployees = filteredEmployees.slice((page - 1) * pageSize, page * pageSize);

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 2 }}>
            <Box sx={{ width: '100%', maxWidth: '1280px' }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Quản lý nhân viên
                </Typography>

                {/* Bộ lọc và nút thêm */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
                        <TextField
                            label="Tìm theo tên"
                            size="small"
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                        <TextField
                            label="Trạng thái"
                            size="small"
                            select
                            value={statusFilter}
                            onChange={handleStatusChange}
                            sx={{ minWidth: 150 }}
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
                            <MenuItem value="Tạm nghỉ">Tạm nghỉ</MenuItem>
                            <MenuItem value="Nghỉ việc">Nghỉ việc</MenuItem>
                        </TextField>
                    </Stack>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleAddEmployee}
                        sx={{ borderRadius: 2 }}
                    >
                        Thêm nhân viên
                    </Button>
                </Box>

                <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                    {loading ? (
                        <Stack alignItems="center" py={4}>
                            <CircularProgress />
                        </Stack>
                    ) : (
                        <>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
                                        <TableRow>
                                            <TableCell>Họ và tên</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>SĐT</TableCell>
                                            <TableCell>Chức vụ</TableCell>
                                            <TableCell>Trạng thái</TableCell>
                                            <TableCell>Ngày bắt đầu</TableCell>
                                            <TableCell align="center">Lệnh</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedEmployees.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.fullName}</TableCell>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{row.phone}</TableCell>
                                                <TableCell>{row.position}</TableCell>
                                                <TableCell>{renderStatus(row.status)}</TableCell>
                                                <TableCell>{row.startDate}</TableCell>
                                                <TableCell align="center">
                                                    <Suspense fallback={<span />}>
                                                        <Stack direction="row" spacing={1} justifyContent="center">
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                size="small"
                                                                startIcon={<Visibility />}
                                                                onClick={() => handleDetail(row)}
                                                            >
                                                                Chi tiết
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                color="error"
                                                                size="small"
                                                                startIcon={<Delete />}
                                                                onClick={() => handleDelete(row)}
                                                            >
                                                                Xóa
                                                            </Button>
                                                        </Stack>
                                                    </Suspense>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Phân trang */}
                            <Box mt={2} display="flex" justifyContent="center">
                                <Pagination
                                    count={Math.ceil(filteredEmployees.length / pageSize)}
                                    page={page}
                                    onChange={(e, value) => setPage(value)}
                                    color="primary"
                                />
                            </Box>
                        </>
                    )}
                </Paper>
            </Box>
        </Box>
    );
}
