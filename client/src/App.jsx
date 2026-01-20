import { Route, Routes } from "react-router";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/AdminView/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminProducts from "./pages/Admin/AdminProducts";
import ShoppingLayout from "./components/ShoppingView/ShoppingLayout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Home from "./pages/Shopping/Home";
import Accounts from "./pages/Shopping/Accounts";
import { Listing } from "./pages/Shopping/Listing";
import Checkout from "./pages/Shopping/Checkout";
import CheckAuth from "./components/Common/CheckAuth";
import UnAuth from "./pages/UnAuth/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "./store/auth-slice/authSlice";
import { Skeleton } from "@/components/ui/skeleton"

function App() {

  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkUserAuth())
  }, [dispatch])

  if (isLoading) {
    return <Skeleton className="h-screen w-full bg-black" />;
  }

  return (
    <div>
      <Routes>
        {/* Auth Layouts */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>

        {/* User Layouts */}
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>}>
          <Route path="home" element={<Home />}></Route>
          <Route path="accounts" element={<Accounts />}></Route>
          <Route path="listing" element={<Listing />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
        </Route>

        {/* Admin Layouts */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
          <Route path="products" element={<AdminProducts />}></Route>
        </Route>

        {/* All other routes */}
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/unauth-page" element={<UnAuth />}></Route>

      </Routes>
    </div>
  );
}

export default App;
