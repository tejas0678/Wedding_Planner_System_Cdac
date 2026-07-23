import { Routes } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";
import ClientRoutes from "./ClientRoutes";
import PlannerRoutes from "./PlannerRoutes";
import AdminRoutes from "./AdminRoutes";

const IndexRoutes = () => {
  return (
    <Routes>
      {AuthRoutes}
      {ClientRoutes}
      {PlannerRoutes}
      {AdminRoutes}
    </Routes>
  );
};

export default IndexRoutes;