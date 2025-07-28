import React, { Suspense, lazy } from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppTheme from '../../theme/sharedtheme/AppTheme';

// Lazy load các component
const AppNavbar = lazy(() => import('../../components/dashboard/components/AppNavbar'));
const SideMenu = lazy(() => import('../../components/dashboard/components/SideMenu'));
const Header = lazy(() => import('../../components/dashboard/components/Header'));

export default function Dashboard({ children, props }) {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <Suspense fallback={null}>
                    <AppNavbar />
                </Suspense>
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            width: '98%',
                            maxWidth: '100%',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        {children}
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}
