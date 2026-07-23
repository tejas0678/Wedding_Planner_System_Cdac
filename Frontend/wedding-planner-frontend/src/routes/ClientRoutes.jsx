import { Route } from "react-router-dom";
/*import ClientLayout from "./layouts/ClientLayout";*/
import ClientLayout from "../layouts/ClientLayout";
const ClientRoutes = (
  <>
  <Route path="/" element={<ClientLayout />}>
  </Route>
  
  </>
);

export default ClientRoutes;