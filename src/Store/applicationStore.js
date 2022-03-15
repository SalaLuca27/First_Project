import { useDispatch } from "react-redux";
import { loginSlice } from "./login/reducer";
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer:{
        login: loginSlice.reducer
    },
});


export const useAppDispatch = () => useDispatch()