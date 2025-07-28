import React, { lazy, Suspense } from 'react';
import {
    Avatar,
    Drawer as MuiDrawer,
    Box,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import { drawerClasses } from '@mui/material/Drawer';

const MenuContent = lazy(() => import('./MenuContent'));
const OptionsMenu = lazy(() => import('./OptionsMenu'));

const drawerWidth = 240;
export default function SideMenu() {
    return (
        <MuiDrawer
            variant="permanent"
            elevation={0}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                boxSizing: 'border-box',
                display: { xs: 'none', md: 'block' },
                [`& .${drawerClasses.paper}`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: (theme) => theme.palette.background.paper,
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    Quản lý nhân viên
                </Typography>
            </Box>

            <Divider />

            <Box
                sx={{
                    overflow: 'auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <MenuContent />
            </Box>

            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Avatar
                    alt="Riley Carter"
                    src="/static/images/avatar/7.jpg"
                    sx={{ width: 36, height: 36 }}
                    loading="lazy"
                />
                <Box sx={{ mr: 'auto' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                        test
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        test
                    </Typography>
                </Box>
                <Suspense fallback={null}>
                    <OptionsMenu />
                </Suspense>
            </Stack>
        </MuiDrawer>
    );
}
