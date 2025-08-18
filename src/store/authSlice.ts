import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import type { LoginCredentials, RegisterData, User } from '../services/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// ========== Async Thunks ==========

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const res = await authService.login(credentials);
      localStorage.setItem('accessToken', res.accessToken);
      if (res.refreshToken) {
        localStorage.setItem('refreshToken', res.refreshToken);
      }
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Login failed');
    }
  }
);

// Register
export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, thunkAPI) => {
    try {
      const res = await authService.register(data);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Registration failed');
    }
  }
);

// Get current user using stored token
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const res = await authService.getCurrentUser();
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Unauthorized');
    }
  }
);

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

// ========== Slice ==========

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: { payload: User }) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
