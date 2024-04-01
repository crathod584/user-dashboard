// userActions.ts
import axios from 'axios';
import { Dispatch } from 'redux';
import { ADD_USER, DELETE_USER, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, UPDATE_USER_LOCATION, User } from '../utils/types';


export const fetchUsers = () => {
    return async (dispatch: Dispatch) => {
      dispatch({ type: FETCH_USERS_REQUEST });
      try {
        const response = await axios.get<User[]>('https://660160fd87c91a11641ab523.mockapi.io/users');
        dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
      } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
      }
    };
  };

export const addUser = (newUser: User) => {
  return { type: ADD_USER, payload: newUser };
};

export const deleteUser = (id: string) => {
  return { type: DELETE_USER, payload: id };
};

export const updateUserLocation = (id: string, location: string) => {
  return { type: UPDATE_USER_LOCATION, payload: { id, location } };
};
