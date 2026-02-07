// hooks/useAuth.js
import { useState, useCallback } from "react";
import { authService } from "../services/index.js";
import { useAuthValidation } from "./useAuthValidation";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAuth = (initialMode = "login", onClose, onToggleMode) => {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const { backendUrl, setUser } = useUser();
  const navigate = useNavigate();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState("");

  const { errors, validateForm, clearError, clearAllErrors } =
    useAuthValidation();

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Clear error for this field when user starts typing
      if (errors[name]) {
        clearError(name);
      }

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [errors, clearError],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setGeneralError("");

      // Reset terms for signup
      if (!isLogin && !termsAccepted) {
        setGeneralError("Please accept the terms and conditions");
        return;
      }

      // Validate form
      if (!validateForm(formData, isLogin)) {
        return;
      }

      setFormLoading(true);

      try {
        if (isLogin) {
          // Handle login
          const response = await authService.login(
            formData.email,
            formData.password,
            backendUrl,
          );

          if (response.success) {
            setTimeout(() => {
              if (onClose) onClose();
              setUser(response.user);
              navigate("/dashboard");
              toast.success(response.message);
              setFormLoading(false);
            }, 1500);
          } else {
            // If login failed, stop loading immediately
            setFormLoading(false);
          }
        } else {
          // Handle registration
          const response = await authService.register(
            formData,
            termsAccepted,
            backendUrl,
          );

          if (response.success) {
            if (response.success) {
              setTimeout(() => {
                if (onClose) onClose();
                setUser(response.user);
                navigate("/dashboard");
                toast.success(response.message);
                setFormLoading(false);
              }, 1500);
            } else {
              // If sign up failed, stop loading immediately
              setFormLoading(false);
              toast.error(response.message);
            }
          }
        }
      } catch (error) {
        setGeneralError(error.message);
        setFormLoading(false);
      }
    },
    [formData, isLogin, termsAccepted, validateForm, clearAllErrors, onClose],
  );

  const handleGoogleAuth = useCallback(() => {
    console.log("Continue with Google");
    // implement this later
  }, []);

  const handleToggleMode = useCallback(() => {
    setIsLogin(!isLogin);
    setGeneralError("");
    clearAllErrors();
    setSuccessMessage("");

    // Clear password fields when toggling
    setFormData((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
      name: !isLogin ? "" : prev.name, // Clear name when switching to login
    }));

    if (onToggleMode) {
      onToggleMode();
    }
  }, [isLogin, clearAllErrors, onToggleMode]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(!showConfirmPassword);
  }, [showConfirmPassword]);

  return {
    // State
    isLogin,
    termsAccepted,
    formLoading,
    formData,
    showPassword,
    showConfirmPassword,
    errors,
    successMessage,
    generalError,

    // Actions
    setTermsAccepted,
    handleChange,
    handleSubmit,
    handleGoogleAuth,
    handleToggleMode,
    handleClose,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
};
