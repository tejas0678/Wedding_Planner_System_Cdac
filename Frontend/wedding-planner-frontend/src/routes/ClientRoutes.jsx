import { Route, Navigate } from "react-router-dom";
import { AppDataProvider } from "../context/client/AppDataContext"; 
import ClientLayout from "../layouts/ClientLayout";
import Dashboard from "../pages/client/Dashboard";
import Planners from "../pages/client/Planners";
import Bookings from "../pages/client/Bookings";
import Packages from "../pages/client/Packages";
import Payments from "../pages/client/Payments";
import Feedback from "../pages/client/Feedback";

const ClientRoutes = (
  <>
  <Route path="/" element={<Navigate to="/client" replace />} />
  <Route path="/client" element={<AppDataProvider>
          <ClientLayout />
        </AppDataProvider>}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="planners" element={<Planners />} />
    <Route path="bookings" element={<Bookings />} />
    <Route path="packages" element={<Packages />} />
    <Route path="payments" element={<Payments />} />
    <Route path="feedback" element={<Feedback />} />
  </Route>
  </>
);

export default ClientRoutes;