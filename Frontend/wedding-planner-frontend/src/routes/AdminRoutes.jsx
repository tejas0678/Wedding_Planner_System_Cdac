import { Route } from "react-router-dom";

import Layout from "../layouts/admin/Layout";
import ManageClients from "../pages/admin/ManageClients";
import Dashboard from "../pages/admin/Dashboard";
import ManagePlanners from "../pages/admin/ManagePlanners";
import ManageBookings from "../pages/admin/ManageBookings";


const AdminRoutes = (
  <>
    {/* Admin Layout */}
    <Route path="/admin" element={<Layout />}>

      {/* Dashboard */}
       <Route
        path="dashboard"
        element={<Dashboard />}
      />

      <Route
        path="clients"
        element={<ManageClients />}
      />
       <Route
        path="planners"
        element={<ManagePlanners />}
      />
       <Route
        path="bookings"
        element={<ManageBookings />}
      />
     
    </Route>
  </>
);

export default AdminRoutes;