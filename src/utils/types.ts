export interface User {
  id: string;
  name: string;
  hobby: string;
  createdAt: string;
  location: string;
}

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER_LOCATION = "UPDATE_USER_LOCATION";
export const START_LOADING = "START_LOADING";
