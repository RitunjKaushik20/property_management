import api from "../api/axios";

/**
 * Auth Service
 * All auth related API calls live here
 */
const authService = {
  // =====================
  // REGISTER
  // =====================
  register: async (userData) => {
    const { name, email, password } = userData;

    if (!name || !email || !password) {
      throw { message: "Name, email, and password are required." };
    }

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: error.message || "Registration failed",
      };
    }
  },

  // =====================
  // LOGIN
  // =====================
  login: async (credentials) => {
    const { email, password } = credentials;

    if (!email || !password) {
      throw { message: "Email and password are required." };
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: error.message || "Login failed",
      };
    }
  },

  // =====================
  // GET PROFILE
  // =====================
  getProfile: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: "Failed to fetch profile",
      };
    }
  },

  // =====================
  // UPDATE PROFILE
  // =====================
  updateProfile: async (userData) => {
    const { username, email } = userData;

    if (!username || !email) {
      throw { message: "Username and email are required." };
    }

    try {
      const response = await api.put("/auth/profile", {
        username,
        email,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: "Failed to update profile",
      };
    }
  },

  // =====================
  // CHANGE PASSWORD
  // =====================
  changePassword: async (passwordData) => {
    const { currentPassword, newPassword } = passwordData;

    if (!currentPassword || !newPassword) {
      throw { message: "Current and new password are required." };
    }

    try {
      const response = await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: "Failed to change password",
      };
    }
  },
};

export default authService;
