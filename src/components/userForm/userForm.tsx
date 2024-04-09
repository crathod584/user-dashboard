import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { TextField, Select, MenuItem, Button, InputLabel } from "@mui/material";
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
    createdAt: "",
    location: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name as string]: value as string });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name as string]: value as string });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(newUser);
    setNewUser({ id: "", name: "", hobby: "", createdAt: "", location: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel htmlFor="name">Name</InputLabel>
      <TextField
        id="name"
        name="name"
        value={newUser.name}
        onChange={handleInputChange}
        required
      />
      <InputLabel htmlFor="hobby">Hobby</InputLabel>
      <TextField
        id="hobby"
        name="hobby"
        value={newUser.hobby}
        onChange={handleInputChange}
        required
      />
      <Select
        id="location"
        name="location"
        value={newUser.location}
        onChange={handleSelectChange}
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
