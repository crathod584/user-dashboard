// userActions.ts
import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import {
  ADD_USER,
  DELETE_USER,
  FETCH_USERS_FAILURE,
  START_LOADING,
  FETCH_USERS_SUCCESS,
  UPDATE_USER_LOCATION,
  User,
} from "../utils/types";

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const response = await axios.get<User[]>(
        "https://660160fd87c91a11641ab523.mockapi.io/users",
      );
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: (error as AxiosError).message,
      });
    }
  };
};

export const addUser = (newUser: User) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const response = await axios.post(
        `https://660160fd87c91a11641ab523.mockapi.io/users`,
        newUser,
      );
      dispatch({ type: ADD_USER, payload: response.data });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: (error as AxiosError).message,
      });
    }
  };
};

export const deleteUser = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      await axios.delete(
        `https://660160fd87c91a11641ab523.mockapi.io/users/${id}`,
      );
      dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: (error as AxiosError).message,
      });
    }
  };
};

export const updateUserLocation = (id: string, location: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const response = await axios.put(
        `https://660160fd87c91a11641ab523.mockapi.io/users/${id}`,
        { location },
      );
      dispatch({ type: UPDATE_USER_LOCATION, payload: response.data });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: (error as AxiosError).message,
      });
    }
  };
};
