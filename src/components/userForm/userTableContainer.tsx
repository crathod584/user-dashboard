// UserTableContainer.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUserLocation,
} from "../../store/userAction";
import UserForm from "./userForm";
import UserList from "./userList";
import { User } from "../../utils/types";
import { Toolbar, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const locations: string[] = [
  "ABU DHABI",
  "AMSTERDAM",
  "AUSTIN",
  "BARCELONA",
  "BENGALURU",
  "BRASÍLIA",
  "BRUSSELS",
  "BUENOS AIRES",
];

const UserTableContainer: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const loading = useSelector((state: RootState) => state.user.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = (newUser: User) => {
    dispatch(addUser(newUser));
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleUpdateUserLocation = (id: string, location: string) => {
    dispatch(updateUserLocation(id, location));
  };

  return (
    <div>
      <Toolbar>
        <div>Number of Users per Location:</div>
        <div>
          {locations.map((location) => (
            <Typography color="#000" key={location}>{`${location}: ${
              users.filter((user) => user.location === location).length
            }`}</Typography>
          ))}
        </div>
        <UserForm onSubmit={handleAddUser} />
      </Toolbar>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <UserList
          users={users}
          onDelete={handleDeleteUser}
          onLocationChange={handleUpdateUserLocation}
        />
      )}
    </div>
  );
};

export default UserTableContainer;
