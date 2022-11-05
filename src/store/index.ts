import { LocaleSetting } from '@/types/config';
import { configureStore, createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
//引入 createStore,用于创建 redux 中的 store对象
import { applyMiddleware, Action } from "redux";
import thunk, { ThunkAction } from "redux-thunk";

import localeReducer from "./locale"

// const store = createStore(countReducer)
//const store = createStore(rootReducers, applyMiddleware(thunk))
export const store = configureStore({
    reducer: {
        localeReducer: localeReducer,
    }
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>



