import { Route } from "react-router-dom";
import { AppDataProvider } from "../context/client/AppDataContext"; 
import ClientLayout from "../layouts/ClientLayout";
import Dashboard from "../pages/client/Dashboard";

const ClientRoutes = (
  <>
  <Route path="/" element={<AppDataProvider>
          <ClientLayout />
        </AppDataProvider>}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
  </Route>
  </>
);

export default ClientRoutes;