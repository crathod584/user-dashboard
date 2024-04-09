import axios from "axios";
import * as userActions from "../store/userAction";
import {
  User,
  ADD_USER,
  DELETE_USER,
  FETCH_USERS_FAILURE,
  START_LOADING,
  FETCH_USERS_SUCCESS,
} from "../utils/types";

jest.mock("axios");

describe("userActions", () => {
  let mockDispatch: jest.Func;
  let mockUsers: User[];

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockUsers = [
      {
        id: "1",
        name: "Alice",
        hobby: "hobby-1",
        createdAt: "20-01-2020",
        location: "BENGALURU",
      },
      {
        id: "2",
        name: "Bob",
        hobby: "hobby-1",
        createdAt: "20-01-2020",
        location: "BENGALURU",
      },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchUsers dispatches success on successful response", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUsers });

    await userActions.fetchUsers()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: START_LOADING });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: FETCH_USERS_SUCCESS,
      payload: mockUsers,
    });
  });

  test("fetchUsers dispatches failure on error", async () => {
    const mockError = new Error("Network error");
    (axios.get as jest.Mock).mockRejectedValueOnce(mockError);

    await userActions.fetchUsers()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: START_LOADING });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: FETCH_USERS_FAILURE,
      payload: mockError.message,
    });
  });

  test("addUser dispatches success on successful creation", async () => {
    const newUser: User = {
      id: "3",
      name: "Charlie",
      hobby: "hobby-1",
      createdAt: "20-01-2020",
      location: "BENGALURU",
    };
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: newUser });

    await userActions.addUser(newUser)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: START_LOADING });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: ADD_USER,
      payload: newUser,
    });
  });

  test("addUser dispatches failure on error", async () => {
    const mockError = new Error("Validation error");
    (axios.post as jest.Mock).mockRejectedValueOnce(mockError);

    await userActions.addUser({} as User)(mockDispatch); // Pass invalid user data

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: START_LOADING });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: FETCH_USERS_FAILURE,
      payload: mockError.message,
    });
  });

  test("deleteUser dispatches success on successful deletion", async () => {
    const userId = "1";
    (axios.delete as jest.Mock).mockResolvedValueOnce({});

    await userActions.deleteUser(userId)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: START_LOADING });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: DELETE_USER,
      payload: userId,
    });
  });

  test("deleteUser dispatches failure on error", async () => {
    const userId = "4"; // Non-existent user
    const mockError = new Error("Not found");
    (axios.delete as jest.Mock).mockRejectedValueOnce(mockError);

    await userActions.deleteUser(userId)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: START_LOADING });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: FETCH_USERS_FAILURE,
      payload: mockError.message,
    });
  });
});
