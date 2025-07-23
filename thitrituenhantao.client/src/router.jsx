import { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router";
import { ROUTERS } from "./utils/router";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Loading from './components/loading/loading';
const SignInPage = lazy(() => import("./pages/auth/signin/SignIn"));

const Dashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));
const Profile = lazy(() => import("./pages/admin/profile/profile"));
const AddEmployee = lazy(() => import("./pages/admin/employee/AddEmployee"));
const ListEmployee = lazy(() => import("./pages/admin/employee/ListEmployee"));
const HomePage = lazy(() => import("./pages/user/homepage"));

const AdminLayout = lazy(() => import("./layouts/adminlayout"));

const ROUTES_CONFIG = [
    {
        path: ROUTERS.USER.HOME,
        component: <HomePage />,
    },
    {
        path: ROUTERS.AUTH.LOGIN,
        component: <SignInPage />
    },
    {
        path: ROUTERS.ADMIN.DASHBOARD,
        component: <Dashboard />,
        layout: AdminLayout
    },
    {
        path: ROUTERS.ADMIN.ADDEMPLOYEE,
        component: <AddEmployee />,
        layout: AdminLayout
    },
    {
        path: ROUTERS.ADMIN.EMPLOYEE,
        component: <ListEmployee />,
        layout: AdminLayout
    },
    {
        path: ROUTERS.ADMIN.DASHBOARD,
        component: <Dashboard />,
        layout: AdminLayout
    },
    {
        path: ROUTERS.ADMIN.PROFILE,
        component: <Profile />,
        layout: AdminLayout
    }
    //,
    //{
    //    path: ROUTERS.ADMIN.DASHBOARD,
    //    component: <Dashboard />,
    //    layout: adminlayout,
    //    roles: ["Admin", "Staff"],
    //}
];


const renderUserRouter = () => {
    return (
        <Routes>
            {ROUTES_CONFIG.map(({ path, component, layout: Layout, roles }, index) => {
                let element = component;

                if (roles) {
                    element = <ProtectedRoute allowedRoles={roles}>{element}</ProtectedRoute>;
                }

                if (Layout) {
                    element = <Layout>{element}</Layout>;
                }

                return <Route key={index} path={path} element={element} />;
            })}
        </Routes>
    );
};

const RouterCustom = () => {
    return (
        <Suspense fallback={<Loading />}>
            {renderUserRouter()}
        </Suspense>
    );
};
export default RouterCustom;
