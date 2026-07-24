import { Route } from "react-router-dom";
import { PlannerDashboard } from "../pages/planner/PlannerDashboard";
import { PlannerProfile } from "../pages/planner/PlannerProfile";
import { PlannerServices } from "../pages/planner/PlannerServices";
import { PlannerGallery } from "../pages/planner/PlannerGallery";
import { PlannerBookings } from "../pages/planner/PlannerBookings";
import { PlannerTasks } from "../pages/planner/PlannerTasks";
import { PlannerPayments } from "../pages/planner/PlannerPayments";
import { PlannerReviews } from "../pages/planner/PlannerReviews";

const PlannerRoutes = (
  <>
    <Route path="/planner-dashboard" element={<PlannerDashboard />} />
    <Route path="/planner-profile" element={<PlannerProfile />} />
    <Route path="/planner-services" element={<PlannerServices />} />
    <Route path="/planner-gallery" element={<PlannerGallery />} />
    <Route path="/planner-bookings" element={<PlannerBookings />} />
    <Route path="/planner-tasks" element={<PlannerTasks />} />
    <Route path="/planner-payments" element={<PlannerPayments />} />
    <Route path="/planner-reviews" element={<PlannerReviews />} />
  </>
);

export default PlannerRoutes;