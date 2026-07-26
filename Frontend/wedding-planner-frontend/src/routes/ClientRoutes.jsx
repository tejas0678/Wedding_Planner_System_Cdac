import { Route, Navigate } from "react-router-dom";
import { AppDataProvider } from "../context/client/AppDataContext"; 
import ClientLayout from "../layouts/ClientLayout";
import Dashboard from "../pages/client/Dashboard";
import Planners from "../pages/client/Planners";
import Bookings from "../pages/client/Bookings";
import Packages from "../pages/client/Packages";
import Payments from "../pages/client/Payments";
import Suggestions from "../pages/client/Suggestions";
import Feedback from "../pages/client/Feedback";
import Profile from "../pages/client/Profile";

const ClientRoutes = (
  <>
  <Route path="/client" element={<Navigate to="/client" replace />} />
  <Route path="/client" element={<AppDataProvider>
          <ClientLayout />
        </AppDataProvider>}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="planners" element={<Planners />} />
    <Route path="bookings" element={<Bookings />} />
    <Route path="packages" element={<Packages />} />
    <Route path="payments" element={<Payments />} />
    <Route path="suggestions" element={<Suggestions />} />
    <Route path="feedback" element={<Feedback />} />
    <Route path="profile" element={<Profile />} />
  </Route>
  </>
);

export default ClientRoutes;