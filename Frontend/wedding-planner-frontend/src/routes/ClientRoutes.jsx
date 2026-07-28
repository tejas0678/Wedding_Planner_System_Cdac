import { Route } from "react-router-dom";
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
import ProtectedRoute from "../components/common/ProtectedRoute";

const ClientRoutes = (
  <>
    {/* Route for /client-dashboard */}
    <Route
      path="/client-dashboard"
      element={
        <ProtectedRoute allowedRoles={["USER", "CLIENT", "ADMIN"]}>
          <AppDataProvider>
            <ClientLayout />
          </AppDataProvider>
        </ProtectedRoute>
      }
    >
      <Route index element={<Dashboard />} />
    </Route>

    {/* Route for /client and sub-routes */}
    <Route
      path="/client"
      element={
        <ProtectedRoute allowedRoles={["USER", "CLIENT", "ADMIN"]}>
          <AppDataProvider>
            <ClientLayout />
          </AppDataProvider>
        </ProtectedRoute>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="planners" element={<Planners />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="packages" element={<Packages />} />
      <Route path="payments" element={<Payments />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  </>
);

export default ClientRoutes;