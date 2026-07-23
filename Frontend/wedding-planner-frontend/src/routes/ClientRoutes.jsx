import { Route } from "react-router-dom";
import { AppDataProvider } from "../context/client/AppDataContext"; 
import ClientLayout from "../layouts/ClientLayout";
const ClientRoutes = (
  <>
  <Route path="/" element={<AppDataProvider>
          <ClientLayout />
        </AppDataProvider>}>
  </Route>
  
  </>
);

export default ClientRoutes;