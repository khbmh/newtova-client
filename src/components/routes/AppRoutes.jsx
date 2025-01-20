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
import SingleItem from '../pages/SingleItem';
import { singleItemLoader } from '../utils/singleItemLoader';
import UpdateItem from '../pages/UpdateItem';

const AppRoutes = [
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'add-product',
        element: (
          <PrivateRoutes>
            <AddItem />
          </PrivateRoutes>
        ),
      },
      {
        path: '/product/:id',
        element: (
          <PrivateRoutes>
            <SingleItem />
          </PrivateRoutes>
        ),
        loader: singleItemLoader, // Add the loader here
      },
      {
        path: '/update-product/:id',
        element: (
          <PrivateRoutes>
            <UpdateItem />
          </PrivateRoutes>
        ),
        loader: singleItemLoader, // Add the loader here
      },
      { path: 'all-products', element: <AllItems /> },
      {
        path: 'moderator',
        element: (
          <PrivateRoutes>
            <ModeratorRoutes>
              <Moderator />
            </ModeratorRoutes>
          </PrivateRoutes>
        ),
        children: [
          { path: 'product-review', element: <ProductReviewQueue /> },
          { path: 'reported-contents', element: <ReportedContents /> },
        ],
      },
      {
        path: 'admin',
        element: (
          <PrivateRoutes>
            <AdminRoutes>
              <AdminDashboardLayout />
            </AdminRoutes>
          </PrivateRoutes>
        ),
        children: [
          { path: 'users', element: <ManageUsers /> },
          { path: 'statistics', element: <Statistics /> },
          { path: 'coupons', element: <ManageCoupons /> },
        ],
      },
      {
        path: 'my',
        element: (
          <PrivateRoutes>
            <MyLayout />
          </PrivateRoutes>
        ),
        children: [
          { index: true, element: <Profile /> },
          { path: 'added-products', element: <MyAdded /> },
          { path: 'liked-items', element: <MyLiked /> },
        ],
      },
    ],
  },
  {
    path: 'auth',
    element: (
      <PublicRoutes>
        <AuthLayout />
      </PublicRoutes>
    ),
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  { path: '*', element: <Error /> },
];

export default AppRoutes;
