import { Route, Routes } from 'react-router';
import AddItem from '../pages/AddItem';
import AllItems from '../pages/AllItems';
import Home from '../pages/Home';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import MyAdded from '../pages/MyAdded';
import MyLiked from '../pages/MyLiked';
import MainLayout from '../layout/MainLayout';
import MyLayout from '../layout/MyLayout';
import AuthLayout from '../layout/AuthLayout';
import Profile from '../pages/Profile';
import Error from '../pages/Error';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Moderator from '../layout/Moderator';
import ProductReviewQueue from '../pages/ProductReviewQueue';
import ReportedContents from '../pages/ReportedContents';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';
import ManageUsers from '../pages/ManageUsers';
import Statistics from '../pages/Statistics';
import ManageCoupons from '../pages/ManageCoupons';
import ModeratorRoutes from './ModeratorRoutes';
import AdminRoutes from './AdminRoutes';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="add-product"
          element={
            <PrivateRoutes>
              <AddItem />
            </PrivateRoutes>
          }
        />
        <Route path="all-products" element={<AllItems />} />
        <Route
          path="moderator"
          element={
            <ModeratorRoutes>
              <Moderator />
            </ModeratorRoutes>
          }
        >
          {/* <Route index element={<Profile />} /> */}
          <Route path="product-review" element={<ProductReviewQueue />} />
          <Route path="reported-contents" element={<ReportedContents />} />
        </Route>
        <Route
          path="admin"
          element={
            <AdminRoutes>
              <AdminDashboardLayout />
            </AdminRoutes>
          }
        >
          {/* <Route index element={<Profile />} /> */}
          <Route path="users" element={<ManageUsers />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="coupons" element={<ManageCoupons />} />
        </Route>
        <Route
          path="my"
          element={
            <PrivateRoutes>
              <MyLayout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Profile />} />
          <Route path="added-products" element={<MyAdded />} />
          <Route path="liked-items" element={<MyLiked />} />
        </Route>
      </Route>
      <Route
        path="auth"
        element={
          <PublicRoutes>
            <AuthLayout />
          </PublicRoutes>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AppRoutes;
