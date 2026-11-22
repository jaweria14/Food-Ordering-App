
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from "./Layout";
import Home from "./pages/Home";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./Auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/MangeResturantPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";





export default function AppRoutes(){
    return(
        <>
        <BrowserRouter>
   <Routes>
<Route
path="/"
element={
<Layout showHero>
<Home />
</Layout>
}
/>

  <Route
    path="/menu"
    element={
      <Layout>
        <span>Menu</span>
      </Layout>
    }
    
  />

   <Route
    path="/detail/:restaurantId"
    element={
      <Layout>
        <DetailPage />
      </Layout>
    }
    
  />

 <Route element={<ProtectedRoute/>}>
    
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
            <Route
          path="/manage-resturant"
          element={
            <Layout>
              <ManageRestaurantPage/>
            </Layout>
          }
        />
           <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
     
      </Route>
      

</Routes>
    </BrowserRouter>
        </>
    )
}