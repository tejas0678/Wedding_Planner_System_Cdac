import { Route } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import Home from "../pages/home/Home";
import Login from './../pages/auth/Login';
import About from "../pages/home/About";
import Contact from "../pages/home/Contact";
import PlannerRegister from './../pages/auth/PlannerRegister';
import FindPlanners from "../pages/home/FindPlanners";
import PublicPackages from "../pages/home/PublicPackages";

import ForgotPassword from "../pages/auth/ForgotPassword";

const AuthRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/user-register" element={<UserRegister />} />
    <Route path="/planner-register" element={<PlannerRegister/>}/>
    <Route path="/login" element={<Login/>} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/find-planners" element={<FindPlanners />} />
    <Route path="/packages" element={<PublicPackages />} />
    <Route path="/planner/:plannerId/packages" element={<PublicPackages />} />
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact />}/>
  </>
);

export default AuthRoutes;