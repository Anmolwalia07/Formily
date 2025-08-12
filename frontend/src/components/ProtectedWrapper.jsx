import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import Loading from "./Loading";
import { useNavigate } from "react-router";

export default function ProtectedWrapper({ children }) {
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setIsLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_Server}/api/user/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
          setIsLoading(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
        setIsLoading(false);
      });
  }, [token, navigate, setUser]);

  if (isLoading) return <Loading />;

  return <>{children}</>;
}
