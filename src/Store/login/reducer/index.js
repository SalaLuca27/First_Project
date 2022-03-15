import {createSlice} from '@reduxjs/toolkit';
import { setLogin } from '../actions/setLogin';

const initialState = {access : ""};

export const loginSlice = createSlice({
    initialState,
    name: 'login',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setLogin, (state, {payload}) => {
            state.access = payload
        })
    }
})