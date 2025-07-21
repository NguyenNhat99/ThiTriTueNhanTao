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
import { useNavigate } from 'react-router-dom';
import authService from '../../../service/authService';

function renderStatus(status) {
    const colors = {
        'Đang làm': 'success',
        'Nghỉ việc': 'default',
    };
    return <Chip label={status} color={colors[status]} size="small" />;
}

export default function EmployeeManagementPage() {
    const navigate = useNavigate();
    const [employees, setEmployees] = React.useState([]);

    const handleAddEmployee = () => {
        navigate('/admin/them-nhan-vien');
    };

    const handleDetail = (row) => {
        navigate(`/admin/chi-tiet-nhan-vien/${row.email}`);
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
            width: 50,
            renderCell: (params) => (
                <Avatar sx={{ width: 32, height: 32 }}>
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
            minWidth: 100,
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
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleDetail(params.row)}
                    >
                        Chi tiết
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
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
                    position: acc.role,
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
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: '1300px', overflowX: 'auto' }}>
                <Typography variant="h4" gutterBottom>
                    Quản lý nhân viên
                </Typography>

                <Stack direction="row" justifyContent="flex-end" mb={2}>
                    <Button variant="contained" color="primary" onClick={handleAddEmployee}>
                        Thêm nhân viên
                    </Button>
                </Stack>

                <Paper elevation={3} sx={{ p: 2 }}>
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
                        }}
                    />
                </Paper>
            </Box>
        </Box>
    );
}
