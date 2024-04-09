import userReducer from "../store/userReducer";
import {
  ADD_USER,
  FETCH_USERS_FAILURE,
  START_LOADING,
  FETCH_USERS_SUCCESS,
} from "../utils/types";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

describe("userReducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle START_LOADING action", () => {
    const action = { type: START_LOADING };
    const expectedState = { ...initialState, loading: true };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_USERS_SUCCESS action", () => {
    const users = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    const action = { type: FETCH_USERS_SUCCESS, payload: users };
    const expectedState = { ...initialState, loading: false, users };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_USERS_FAILURE action", () => {
    const error = "Failed to fetch users";
    const action = { type: FETCH_USERS_FAILURE, payload: error };
    const expectedState = { ...initialState, loading: false, error };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ADD_USER action", () => {
    const newUser = { id: 3, name: "Alice" };
    const action = { type: ADD_USER, payload: newUser };
    const expectedState = {
      ...initialState,
      loading: false,
      users: [...initialState.users, newUser],
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
