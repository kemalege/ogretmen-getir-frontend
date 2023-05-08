import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authSlice from "../features/auth/authSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { unauthenticatedMiddleware } from "../features/auth/middleware/errorHandler"
import { RESET_STATE_ACTION_TYPE } from "../features/auth/actions/resetState"

const reducers = {[apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (
    state,
    action
   ) => {
    if (action.type === RESET_STATE_ACTION_TYPE) {
      state = {} as RootState;
    }
    return combinedReducer(state, action);
}


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat([
            unauthenticatedMiddleware, apiSlice.middleware
        ]),
    devTools: true
})



// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const  useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof combinedReducer>;