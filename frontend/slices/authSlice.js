import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  register_success: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerSuccess: (state) => {
      state.register_success = true
    },
    registerFail: (state) => {
      // state.loading = false
    },
    resetRegisterSuccess: (state) => {
      state.register_success = false
    },
    loginSuccess: (state) => {
      state.isAuthenticated = true
    },
    loginFail: (state) => {
      state.isAuthenticated = false
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false,
      state.user = null
    },
    logoutFail: (state) => {

    },
    loadUserSuccess: (state, { payload }) => {

    },
    loadUserFail: (state) => {
      state.user = null
    },
    authenticatedSuccess: (state) => {
      state.isAuthenticated = true
    },
    authenticatedFail: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
    refreshSuccess: (state) => {

    },
    refreshFail: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
    setAuthLoading: (state) => {
      state.loading = true
    },
    removeAuthLoading: (state) => {
      state.loading = false
    }

  }
})

// actions generated from slice
export const {
  registerSuccess,
  registerFail,
  resetRegisterSuccess,
  loginSuccess,
  loginFail,
  logoutSuccess,
  logoutFail,
  loadUserSuccess,
  loadUserFail,
  authenticatedSuccess,
  authenticatedFail,
  refreshSuccess,
  refreshFail,
  setAuthLoading,
  removeAuthLoading

} = authSlice.actions

// selector used to access state from components instead of connect
export const authSelector = (state) => state.user

// asycn thunk action

export const load_user = () => async dispatch => {
  try {
      const res = await fetch('/api/account/user', {
          method: 'GET',
          headers: {
              'Accept': 'application/json'
          }
      });

      const data = await res.json();

      if (res.status === 200) {
          dispatch({
              type: LOAD_USER_SUCCESS,
              payload: data
          });
      } else {
          dispatch({
              type: LOAD_USER_FAIL
          });
      }
  } catch(err) {
      dispatch({
          type: LOAD_USER_FAIL
      });
  }
};

export const check_auth_status = () => async dispatch => {
  try {
      const res = await fetch('/api/account/verify', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
          }
      });

      if (res.status === 200) {
          dispatch({
              type: AUTHENTICATED_SUCCESS
          });
          dispatch(load_user());
      } else {
          dispatch({
              type: AUTHENTICATED_FAIL
          });
      }
  } catch(err) {
      dispatch({
          type: AUTHENTICATED_FAIL
      });
  }
};

export const request_refresh = () => async dispatch => {
  try {
      const res = await fetch('/api/account/refresh', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
          }
      });

      if (res.status === 200) {
          dispatch({
              type: REFRESH_SUCCESS
          });
          dispatch(check_auth_status());
      } else {
          dispatch({
              type: REFRESH_FAIL
          });
      }
  } catch(err) {
      dispatch({
          type: REFRESH_FAIL
      });
  }
};

export const register = (
  publicAddress,
  password,
  re_password
) => async dispatch => {
  const body = JSON.stringify({
      publicAddress,
      password,
      re_password
  });

  dispatch({
      type: SET_AUTH_LOADING
  });

  try {
      const res = await fetch('/api/account/register', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: body
      });

      if (res.status === 201) {
          dispatch({
              type: REGISTER_SUCCESS
          });
      } else {
          dispatch({
              type: REGISTER_FAIL
          });
      }
  } catch(err) {
      dispatch({
          type: REGISTER_FAIL
      });
  }

  dispatch({
      type: REMOVE_AUTH_LOADING
  });
};

export const reset_register_success = () => dispatch => {
  dispatch({
      type: RESET_REGISTER_SUCCESS
  });
};

export const login = (username, password) => async dispatch => {
  const body = JSON.stringify({
      username,
      password
  });

  dispatch({
      type: SET_AUTH_LOADING
  });

  try {
      const res = await fetch('/api/account/login', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: body
      });

      if (res.status === 200) {
          dispatch({
              type: LOGIN_SUCCESS
          });
          dispatch(load_user());
      } else {
          dispatch({
              type: LOGIN_FAIL
          });
      }
  } catch(err) {
      dispatch({
          type: LOGIN_FAIL
      });
  }

  dispatch({
      type: REMOVE_AUTH_LOADING
  });
};

export const logout = () => async dispatch => {
  try {
      const res = await fetch('/api/account/logout', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
          }
      });

      if (res.status === 200) {
          dispatch({
              type: LOGOUT_SUCCESS
          });
      } else {
          dispatch({
              type: LOGOUT_FAIL
          });
      }
  } catch(err) {
      dispatch({
          type: LOGOUT_FAIL
      });
  }
};
