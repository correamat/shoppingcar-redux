import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    isAuthenticate: true
};

export const login = createAction('LOGIN');
export const logout = createAction('LOGOUT');

export default createReducer(INITIAL_STATE, {
    [login.type]: (state, action) => ({ ...state, isAuthenticate: true}),
    [logout.type]: (state, action) => ({ ...state, isAuthenticate: false })
})