import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Forms from "./pages/Forms";
import CreateForm from "./pages/CreateForm";
import Profile from "./pages/Profile";
import ProtectedWrapper from "./components/ProtectedWrapper";

export default function App() {
  return (
    <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route element={<ProtectedWrapper><Layout/></ProtectedWrapper>}>
        <Route path="/dashboard"element={<Dashboard/>}/>
        <Route path="/forms"element={<Forms/>}/>
        <Route path="/profile"element={<Profile/>}/>
        <Route path="/createform"element={<CreateForm/>}/>
      </Route>
    </Routes>
  )
}
