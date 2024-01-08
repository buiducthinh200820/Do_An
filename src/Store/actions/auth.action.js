import { createAction } from "@reduxjs/toolkit";

export const createUser = createAction("CREATE_USER");
export const fetchUser = createAction("FETCH_USER");
export const login = createAction("LOGIN");
export const loginSuccess = createAction("LOGIN_SUCCESS");
export const loginFail = createAction("LOGIN_FAIL");
export const getCurrentUser = createAction("GET_CURRENT_USER");
export const updateUser = createAction("UPDATE_USER");
export const logout = createAction("LOGOUT_USER");

export const getProfile = createAction("GET_PROFILE");
export const follow = createAction("FOLLOW");
export const unFollow = createAction("UN_FOLLOW");
