import { Route } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";

const AuthRoutes = (
  <>
    <Route
      path="/user-register"
      element={<UserRegister />}
    />
  </>
);

export default AuthRoutes;