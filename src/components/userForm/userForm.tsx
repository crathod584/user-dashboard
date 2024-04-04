// UserForm.tsx
import React, { useState } from "react";
import { TextField, Select, MenuItem, Button } from "@mui/material";
import { User } from "../../utils/types";
const locations = [
  "ABU DHABI",
  "AMSTERDAM",
  "AUSTIN",
  "BARCELONA",
  "BENGALURU",
  "BRASÍLIA",
  "BRUSSELS",
  "BUENOS AIRES",
];

interface UserFormProps {
  onSubmit: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [newUser, setNewUser] = useState<User>({
    id: "",
    name: "",
    hobby: "",
    creationDate: "",
    location: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>,
  ) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name as string]: value as string });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(newUser);
    setNewUser({ id: "", name: "", hobby: "", creationDate: "", location: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={newUser.name}
        onChange={handleInputChange}
        required
      />
      <TextField
        name="hobby"
        label="Hobby"
        value={newUser.hobby}
        onChange={handleInputChange}
        required
      />
      <Select
        label="Select Location"
        name="location"
        value={newUser.location}
        onChange={handleInputChange}
        required
      >
        {locations.map((location) => (
          <MenuItem key={location} value={location}>
            {location}
          </MenuItem>
        ))}
      </Select>
      <Button type="submit" variant="contained" color="primary">
        Add User
      </Button>
    </form>
  );
};

export default UserForm;
