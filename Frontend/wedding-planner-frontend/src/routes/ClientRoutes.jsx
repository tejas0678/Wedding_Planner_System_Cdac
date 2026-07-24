import { Route, Navigate } from "react-router-dom";
import { AppDataProvider } from "../context/client/AppDataContext"; 
import ClientLayout from "../layouts/ClientLayout";
import Dashboard from "../pages/client/Dashboard";
import Planners from "../pages/client/Planners";
import Bookings from "../pages/client/Bookings";
import Packages from "../pages/client/Packages";

const ClientRoutes = (
  <>
  <Route path="/" element={<Navigate to="/client" replace />} />
  <Route path="/client" element={<AppDataProvider>
          <ClientLayout />
        </AppDataProvider>}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    {/* Planner routes */}
    <Route path="planners" element={<Planners />} />
    <Route path="bookings" element={<Bookings />} />
    <Route path="packages" element={<Packages />} />
  </Route>
  </>
);

export default ClientRoutes;