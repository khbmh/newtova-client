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

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="add-item"
          element={
            <PrivateRoutes>
              <AddItem />
            </PrivateRoutes>
          }
        />
        <Route path="all-items" element={<AllItems />} />
        <Route
          path="my"
          element={
            <PrivateRoutes>
              <MyLayout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Profile />} />
          <Route path="added-items" element={<MyAdded />} />
          <Route path="liked-items" element={<MyLiked />} />
        </Route>
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route
          path="login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AppRoutes;
