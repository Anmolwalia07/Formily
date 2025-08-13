import  { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  }, [navigate]);

  return <div className="p-6">Logging you out...</div>;
}
