import * as React from 'react';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
} from '@mui/material';
import {
    HomeRounded,
    AnalyticsRounded,
    PeopleRounded,
    AssignmentRounded,
    SettingsRounded,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const menuGroups = [
    {
        items: [
            { text: 'Home', icon: <HomeRounded />, path: '/admin/dashboard' },
            { text: 'Cấu trúc công ty', icon: <AnalyticsRounded />, path: '/admin/cau-truc-cong-ty' },
            { text: 'Quản lý nhân viên', icon: <PeopleRounded />, path: '/admin/quan-ly-nhan-vien' },
            { text: 'Quản lý chi nhánh', icon: <AssignmentRounded />, path: '/admin/quan-ly-chi-nhanh' },
            { text: 'Quản lý phòng ban', icon: <AssignmentRounded />, path: '/admin/quan-ly-phong-ban' },
        ]
    },
    {
        items: [
            { text: 'Thông tin', icon: <SettingsRounded />, path: '/admin/thong-tin-ca-nhan' },
        ]
    }
];

export default function MenuContent() {
    const navigate = useNavigate();

    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            {menuGroups.map((group, groupIndex) => (
                <List dense key={groupIndex}>
                    {group.items.map(({ text, icon, path }) => (
                        <ListItem key={path} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => navigate(path)}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            ))}
        </Stack>
    );
}
