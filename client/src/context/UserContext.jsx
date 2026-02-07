import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authService } from "../services";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await authService.checkAuth(backendUrl);
      if (response.success) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      const response = await authService.logout(backendUrl);

      toast.success(response.message);
      setUser(null);
      navigate("/");
    } catch (error) {
      setUser(null);
      toast.error(error.message);
      navigate("/");
    }
  }, [backendUrl, navigate]);

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    backendUrl,
    logout,
    user,
    setUser,
    loading,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
