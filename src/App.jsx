import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate, 
} from "react-router-dom";

import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productinfo/ProductInfo';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import AddProduct from './pages/admin/pages/AddProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './pages/allproducts/AllProducts';

function App() {
  return (
    //wrapping all components in parent (myState) component
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/allproducts" element={<Allproducts/>}/>
          {/* Below only for user so wrap by ProtectedRoute */}
          <Route path="/order" element={
            <ProtectedRoutes>
              <Order/>
            </ProtectedRoutes>
          } />
          <Route path="/cart" element={<Cart/>} />
          {/* Below Only for Admin so wrap by ProtectedRouteForAdmin */}
          <Route path="/dashboard" element={
            <ProtectedRoutesForAdmin>
              <Dashboard/>
            </ProtectedRoutesForAdmin>
          } />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/productinfo/:id" element={<ProductInfo/>} />
          {/* Below Only for Admin so wrap by ProtectedRouteForAdmin */}
          <Route path="/addproduct" element={
            <ProtectedRoutesForAdmin>
              <AddProduct/>
            </ProtectedRoutesForAdmin>
          } />
          {/* Below Only for Admin so wrap by ProtectedRouteForAdmin */}
          <Route path="/updateproduct" element={
            <ProtectedRoutesForAdmin>
              <UpdateProduct/>
            </ProtectedRoutesForAdmin>
          } />
          <Route path="/*" element={<NoPage/>} />
        </Routes>
      <ToastContainer/>
      </Router>
    </MyState>
  )
}

export default App

//user
export const ProtectedRoutes = ({children}) => {
  const user = localStorage.getItem('user')
  if(user) {
    return children //any children page
  } else {
    return <Navigate to={'/login'}/>
  }
}

//admin

const ProtectedRoutesForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'))

  if(admin.user.email === 'rahulsingh@gmail.com') {
    return children
  } else {
    return <Navigate to={'/login'}/>
  }

}