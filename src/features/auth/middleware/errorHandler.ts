import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { resetStateAction } from "../actions/resetState";
import toast from 'react-hot-toast';

export const unauthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      dispatch(resetStateAction());
    }

    return next(action);
  };

  export const forbiddenMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 403) {
      toast.error(action.payload.data.message)
    }

    return next(action);
  };

  export const badRequest: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 400) {
      toast.error(action.payload.data.message)
    }

    return next(action);
  };