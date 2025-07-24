import * as React from 'react';
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Chip,
    Button,
    Stack,
} from '@mui/material';
import {
    DataGrid,
    GridToolbar,
} from '@mui/x-data-grid';
import { Add, Visibility, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import authService from '../../../service/authService';

const renderStatus = (status) => {
    const colorMap = {
        'Đang hoạt động': 'success',
        'Tạm nghỉ': 'warning',
        'Nghỉ việc': 'error',
    };

    const chipColor = colorMap[status] || 'default';

    // Optional: icon status
    // const iconMap = {
    //     'Đang hoạt động': <CheckCircle fontSize="small" />,
    //     'Tạm nghỉ': <PauseCircle fontSize="small" />,
    //     'Nghỉ việc': <Cancel fontSize="small" />,
    // };

    return (
        <Chip
            label={status}
            color={chipColor}
            size="small"
            variant="outlined"
        />
    );
};

export default function EmployeeManagementPage() {
    const navigate = useNavigate();
    const [employees, setEmployees] = React.useState([]);

    const handleAddEmployee = () => {
        navigate('/admin/them-nhan-vien');
    };

    const handleDetail = (row) => {
        navigate(`/admin/quan-ly-nhan-vien/chi-tiet-nhan-vien/${row.email}`);
    };

    const handleDelete = async (row) => {
        const confirm = window.confirm(`Bạn có chắc muốn xóa nhân viên "${row.fullName}" không?`);
        if (!confirm) return;

        try {
            await authService.deleteAccount(row.email);
            setEmployees((prev) => prev.filter((emp) => emp.email !== row.email));
        } catch (error) {
            console.error('Lỗi khi xóa nhân viên:', error);
            alert('Không thể xóa nhân viên.');
        }
    };

    const columns = [
        {
            field: 'avatar',
            headerName: '',
            width: 60,
            renderCell: (params) => (
                <Avatar sx={{ width: 36, height: 36, bgcolor: '#90caf9' }}>
                    {params.row.fullName?.charAt(0).toUpperCase()}
                </Avatar>
            ),
            sortable: false,
            filterable: false,
        },
        { field: 'fullName', headerName: 'Họ và tên', flex: 1.2, minWidth: 150 },
        { field: 'email', headerName: 'Email', flex: 1.3, minWidth: 200 },
        { field: 'phone', headerName: 'SĐT', flex: 0.8, minWidth: 120 },
        { field: 'position', headerName: 'Chức vụ', flex: 1, minWidth: 130 },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 0.8,
            minWidth: 120,
            renderCell: (params) => renderStatus(params.value),
        },
        { field: 'startDate', headerName: 'Ngày bắt đầu', flex: 1, minWidth: 120 },
        {
            field: 'actions',
            headerName: 'Lệnh',
            flex: 1,
            minWidth: 160,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => handleDetail(params.row)}
                    >
                        Chi tiết
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<Delete />}
                        onClick={() => handleDelete(params.row)}
                    >
                        Xóa
                    </Button>
                </Stack>
            ),
        },
    ];

    React.useEffect(() => {
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
            } catch (err) {
                console.error('Lỗi lấy danh sách nhân viên:', err);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 2 }}>
            <Box sx={{ width: '100%', maxWidth: '1280px' }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Quản lý nhân viên
                </Typography>

                <Stack direction="row" justifyContent="flex-end" mb={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleAddEmployee}
                        sx={{ borderRadius: 2 }}
                    >
                        Thêm nhân viên
                    </Button>
                </Stack>

                <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                    <DataGrid
                        autoHeight
                        rows={employees}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#e3f2fd',
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-toolbarContainer': {
                                justifyContent: 'flex-end',
                            },
                            borderRadius: 2,
                        }}
                    />
                </Paper>
            </Box>
        </Box>
    );
}
