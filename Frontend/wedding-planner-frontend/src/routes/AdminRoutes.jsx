import { Route } from "react-router-dom";

import Layout from "../layouts/admin/Layout";
import ManageClients from "../pages/admin/ManageClients";
import Dashboard from "../pages/admin/Dashboard";
import ManagePlanners from "../pages/admin/ManagePlanners";
import ManagePackages from "../pages/admin/ManagePackages";
import MonitorPayments from "../pages/admin/MonitorPayments";
import FeedbackReports from "../pages/admin/FeedbackReports";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AdminRoutes = (
  <>
    {/* Admin Layout */}
    <Route 
      path="/admin" 
      element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="clients" element={<ManageClients />} />
      <Route path="planners" element={<ManagePlanners />} />
      <Route path="packages" element={<ManagePackages />} />
      <Route path="payments" element={<MonitorPayments />} />
      <Route path="reports" element={<FeedbackReports />} />
    </Route>
  </>
);

export default AdminRoutes;