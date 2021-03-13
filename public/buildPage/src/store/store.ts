import { AnyAction, applyMiddleware, createStore, Store } from "redux";
import thunkMiddleWare, { ThunkMiddleware } from "redux-thunk";
import buildPageReducer, { dataState } from "../reducer/buildPageReducer";

const thunk: ThunkMiddleware<dataState, AnyAction> = thunkMiddleWare;
const store = createStore(buildPageReducer, applyMiddleware(thunk));

export default store;
