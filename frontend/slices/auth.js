import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  register_success: false
}

const auth = createSlice({
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
        state.user = payload.user
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

} = auth.actions

// selector used to access state from components instead of connect
export const authSelector = (state) => state //check this?
// export const authSelector = (state) => state.user //check this?

// const selectSelf = (state) => state
// const safeSelector = createDraftSafeSelector(
//     selectSelf,
//     (state) => state.value
// )

export default auth.reducer

// async thunk actions
export function load_user() {
  return async (dispatch) => {
    try {
        const response = await fetch('/api/account/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
  
        const data = await response.json();
  
        if (response.status === 200) {
            dispatch(loadUserSuccess(data))
        } else {
            dispatch(loadUserFail())
        }
    } catch(error) {
        dispatch(loadUserFail())
    }
  }
    
};

export function checkAuthStatus() {
    return async (dispatch) => {
        try {
            const response = await fetch('/api/account/verify', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            })
    
            if (response.status === 200) {
                dispatch(authenticatedSuccess())
                dispatch(load_user())
            } else {
                dispatch(authenticatedFail())
            }
        } catch (error) {
            dispatch(authenticatedFail())
        }

    }
}

export function requestRefresh() {
    return async (dispatch) => {
        try {
            const response = await fetch('/api/account/refresh', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            })

            if (response.status === 200) {
                dispatch(refreshSuccess())
                dispatch(checkAuthStatus())
            } else {
                dispatch(refreshFail())
            }
        } catch (error) {
            dispatch(refreshFail())
        }
    }
}

export function register(publicAddress, password, re_password) {
    return async (dispatch) => {

        const body = JSON.stringify({
            publicAddress,
            password,
            re_password
        })

        dispatch(setAuthLoading())

        try {
            const response = await fetch('/api/account/register',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            })

            if (response.status === 201) {
                dispatch(registerSuccess())
            } else {
                dispatch(registerFail())
            }
        } catch (error) {
            dispatch(registerFail())
        }
        dispatch(removeAuthLoading())

    }
}

export function resetRegister() {
    return async (dispatch) => {
        dispatch(resetRegisterSuccess())
    }
}

export function login(publicAddress, password) {
    return async (dispatch) => {
        const body = JSON.stringify({
            publicAddress,
            password
        })

        dispatch(setAuthLoading())

        try {
            const response = await fetch('/api/account/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })
            if (response.status === 200) {
                dispatch(loginSuccess())
                dispatch(load_user())
            } else {
                dispatch(loginFail())
            }
        } catch (error) {
            dispatch(loginFail())
        }

        dispatch(removeAuthLoading())
    }
}

export function logout(params) {
    return async (dispatch) => {
        try {
            const response = await fetch('/api/account/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                }
            })
            if (response.status === 200) {
                dispatch(logoutSuccess())
            } else {
                dispatch(logoutFail())
            }
        } catch (error) {
            dispatch(logoutFail())
        }
    }
}
