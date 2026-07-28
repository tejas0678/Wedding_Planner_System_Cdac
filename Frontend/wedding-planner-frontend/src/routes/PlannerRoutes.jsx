import { Route } from "react-router-dom";
import { PlannerDashboard } from "../pages/planner/PlannerDashboard";
import { PlannerProfile } from "../pages/planner/PlannerProfile";
import { PlannerServices } from "../pages/planner/PlannerServices";
import { PlannerGallery } from "../pages/planner/PlannerGallery";
import { PlannerBookings } from "../pages/planner/PlannerBookings";
import { PlannerTasks } from "../pages/planner/PlannerTasks";
import { PlannerPayments } from "../pages/planner/PlannerPayments";
import { PlannerReviews } from "../pages/planner/PlannerReviews";
import ProtectedRoute from "../components/common/ProtectedRoute";

const PlannerRoutes = (
  <>
    <Route path="/planner-dashboard" element={<ProtectedRoute allowedRoles={["PLANNER"]}><PlannerDashboard /></ProtectedRoute>} />
    <Route path="/planner-profile" element={<ProtectedRoute allowedRoles={["PLANNER"]}><PlannerProfile /></ProtectedRoute>} />
    <Route path="/planner-services" element={<ProtectedRoute allowedRoles={["PLANNER"]}><PlannerServices /></ProtectedRoute>} />
    <Route path="/planner-gallery" element={<ProtectedRoute allowedRoles={["PLANNER"]}><PlannerGallery /></ProtectedRoute>} />
    <Route path="/planner-bookings" element={<ProtectedRoute allowedRoles={["PLANNER"]}><PlannerBookings /></ProtectedRoute>} />
    <Route path="/planner-tasks" element={<ProtectedRoute allowedRoles={["PLANNER"]}><PlannerTasks /></ProtectedRoute>} />
    <Route path="/planner-payments" element={<ProtectedRoute allowedRoles={["PLANNER"]}><PlannerPayments /></ProtectedRoute>} />
    <Route path="/planner-reviews" element={<ProtectedRoute allowedRoles={["PLANNER"]}><PlannerReviews /></ProtectedRoute>} />
  </>
);

export default PlannerRoutes;