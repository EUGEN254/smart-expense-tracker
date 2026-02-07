import { useState, useCallback } from "react";

export const useAuthValidation = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  }, []);

  const validatePassword = useCallback((password, isLogin = false) => {
    if (!password) return "Password is required";

    if (!isLogin) {
      if (password.length < 8) return "Password must be at least 8 characters";
      if (!/[A-Z]/.test(password))
        return "Password must contain at least one uppercase letter";
      if (!/[a-z]/.test(password))
        return "Password must contain at least one lowercase letter";
      if (!/[0-9]/.test(password))
        return "Password must contain at least one number";
    }

    return "";
  }, []);

  const validateForm = useCallback(
    (formData, isLogin) => {
      const newErrors = {};

      // Validate email
      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;

      // Validate password
      const passwordError = validatePassword(formData.password, isLogin);
      if (passwordError) newErrors.password = passwordError;

      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [validateEmail, validatePassword],
  );
  
  const clearError = useCallback((field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateForm,
    clearError,
    clearAllErrors,
    setErrors,
  };
};
