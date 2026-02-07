import axios from "axios";

export const authService = {
  async register(userData, termsAccepted, backendUrl) {
    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/register`,
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          termsAccepted: termsAccepted,
        },
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    }
  },

  async login(email, password, backendUrl) {
    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Login failed. Please try again.");
      }
    }
  },

  async logout(backendUrl) {
    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Logout failed. Please try again.");
      }
    }
  },

  async checkAuth(backendUrl) {
    try {
      const res = await axios.get(
        `${backendUrl}/api/auth/check`,
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Authentication check failed. Please try again.");
      }
    }
  },
};
