import React, { useEffect, useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import axios from "axios";
import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    Divider,
    Grid,
} from "@mui/material";

const CompanyStructure = () => {
    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7083/api/Company/structure")
            .then(res => {
                const data = res.data.map(cn => ({
                    title: cn.tenChiNhanh,
                    key: `cn-${cn.id}`,
                    data: cn,
                    children: cn.phongBans.map(pb => ({
                        title: pb.tenPhongBan,
                        key: `pb-${pb.id}`,
                        data: pb,
                        children: pb.nhoms.map(n => ({
                            title: n.tenNhom,
                            key: `n-${n.id}`,
                            data: n,
                        })),
                    }))
                }));
                setTreeData(data);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSelect = (selectedKeys, info) => {
        const node = info.node;
        if (node.key.startsWith('cn-')) {
            setSelectedBranch(node.data);
            setSelectedDepartment(null);
        } else if (node.key.startsWith('pb-')) {
            setSelectedDepartment(node.data);
            setSelectedBranch(null);
        } else {
            setSelectedBranch(null);
            setSelectedDepartment(null);
        }
    };

    return (
        <Box p={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" fontWeight={600} gutterBottom sx={{ fontSize: '1.5rem' }}>
                    Cấu trúc công ty
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                            <Paper variant="outlined" sx={{ p: 2, maxHeight: 500, overflowY: 'auto' }}>
                                <Tree
                                    treeData={treeData}
                                    defaultExpandAll
                                    onSelect={handleSelect}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <Paper variant="outlined" sx={{ p: 2, minHeight: 200 }}>
                                {selectedBranch ? (
                                    <>
                                        <Typography variant="h6" gutterBottom>
                                            Chi nhánh: {selectedBranch.tenChiNhanh}
                                        </Typography>
                                        <Typography><strong>Số nhà:</strong> {selectedBranch.soNha || '-'}</Typography>
                                        <Typography><strong>Xã:</strong> {selectedBranch.xa || '-'}</Typography>
                                        <Typography><strong>Huyện:</strong> {selectedBranch.huyen || '-'}</Typography>
                                        <Typography><strong>Tỉnh:</strong> {selectedBranch.tinh || '-'}</Typography>
                                        <Typography mt={2}><strong>Số phòng ban:</strong> {selectedBranch.phongBans?.length || 0}</Typography>
                                    </>
                                ) : selectedDepartment ? (
                                    <>
                                        <Typography variant="h6" gutterBottom>
                                            Phòng ban: {selectedDepartment.tenPhongBan}
                                        </Typography>
                                        <Typography><strong>Mô tả:</strong> {selectedDepartment.moTa || '-'}</Typography>
                                        <Typography mt={2}><strong>Số nhóm:</strong> {selectedDepartment.nhoms?.length || 0}</Typography>
                                    </>
                                ) : (
                                    <Typography color="text.secondary">
                                        Chọn một chi nhánh hoặc phòng ban để xem chi tiết
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default CompanyStructure;