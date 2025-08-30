import axios from 'axios';
import { AuthFormData, LoginFormData, AuthResponse, User } from '../types/auth';

// Configure axios base URL
const API_BASE_URL = 'http://10.0.2.2:3001'; // For Android emulator
// const API_BASE_URL = 'http://localhost:3001'; // For iOS simulator

const authService = {
  // Register new user
  async register(userData: AuthFormData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  },

  // Login user
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  },

  // Get user profile
  async getProfile(accessToken: string): Promise<{ success: boolean; data: { user: User } }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to get profile');
    }
  },

  // Logout user
  async logout(refreshToken: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/logout`, { refreshToken });
      return response.data;
    } catch (error: any) {
      throw new Error('Logout failed');
    }
  },

  // Refresh access token
  async refreshToken(refreshToken: string): Promise<{ success: boolean; data: { accessToken: string } }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh-token`, { refreshToken });
      return response.data;
    } catch (error: any) {
      throw new Error('Token refresh failed');
    }
  },

  // Health check
  async healthCheck(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data;
    } catch (error: any) {
      throw new Error('Service unavailable');
    }
  },
};

export default authService;
