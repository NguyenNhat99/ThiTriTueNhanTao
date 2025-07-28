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
const DetailAccount = lazy(() => import("./pages/admin/employee/DetailAccount"));
const AccessDenied = lazy(() => import("./pages/auth/AccessDeniedPage/AccessDeniedPage"));


const HomePage = lazy(() => import("./pages/user/homepage"));

const AdminLayout = lazy(() => import("./layouts/adminlayout"));
const CompanyStructure = lazy(() => import("./pages/admin/structure/CompanyStructure"));
const ManageBranches = lazy(() => import("./pages/admin/branches/ManageBranches"));
const ManageDepartments = lazy(() => import("./pages/admin/departments/ManageDepartments"));

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
        layout: AdminLayout,
        roles: ["Admin", "NhanVien"],
    },
    {
        path: ROUTERS.ADMIN.ADDEMPLOYEE,
        component: <AddEmployee />,
        layout: AdminLayout,
        roles: ["Admin"],
    },
    {
        path: ROUTERS.ADMIN.EMPLOYEE,
        component: <ListEmployee />,
        layout: AdminLayout,
        roles: ["Admin"]
    },
    {
        path: ROUTERS.ADMIN.PROFILE,
        component: <Profile />,
        layout: AdminLayout,
        roles: ["Admin", "NhanVien"]
    },
    {
        path: ROUTERS.ADMIN.DETAILACCOUNT,
        component: <DetailAccount />,
        layout: AdminLayout,
        roles: ["Admin"]
    },
    {
        path: ROUTERS.ADMIN.STRUCTURE,
        component: <CompanyStructure />,
        layout: AdminLayout,
        roles: ["Admin"]
    },
    {
        path: ROUTERS.ADMIN.BRANCHES,
        component: <ManageBranches />,
        layout: AdminLayout,
        roles: ["Admin"]
    },
    {
        path: ROUTERS.ADMIN.DEPARTMENTS,
        component: <ManageDepartments />,
        layout: AdminLayout,
        roles: ["Admin"]
    }
    ,
    {
        path: ROUTERS.AUTH.NOTAUTH,
        component: <AccessDenied />
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
        //<Suspense fallback={<Loading />}>
        //</Suspense>
        renderUserRouter() 
    );
};
export default RouterCustom;
