import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Toolbar,
  Typography,
  TextField,
} from '@mui/material';

interface User {
  id: string;
  name: string;
  hobby: string;
  creationDate: string;
  location: string;
}

const locations: string[] = [
  'ABU DHABI',
  'AMSTERDAM',
  'AUSTIN',
  'BARCELONA',
  'BENGALURU',
  'BRASÍLIA',
  'BRUSSELS',
  'BUENOS AIRES',
];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newUser, setNewUser] = useState<User>({ id: '', name: '', hobby: '', creationDate: '', location: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>('https://660160fd87c91a11641ab523.mockapi.io/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://660160fd87c91a11641ab523.mockapi.io/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleLocationChange = async (id: string, location: string) => {
    try {
      await axios.put(`https://660160fd87c91a11641ab523.mockapi.io/users/${id}`, { location });
      setUsers(users.map((user) => (user.id === id ? { ...user, location } : user)));
    } catch (error) {
      console.error('Error updating user location:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name as string]: value as string });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<User>('https://660160fd87c91a11641ab523.mockapi.io/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ id: '', name: '', hobby: '', creationDate: '', location: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <Toolbar>
        <Typography variant="h6">Number of Users per Location:</Typography>
        {locations.map((location) => (
          <Typography key={location}>{`${location}: ${
            users.filter((user) => user.location === location).length
          }`}</Typography>
        ))}
      </Toolbar>
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Hobby</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.hobby}</TableCell>
                  <TableCell>{user.creationDate}</TableCell>
                  <TableCell>
                    <Select
                      value={user.location}
                      onChange={(e) => handleLocationChange(user.id, e.target.value as string)}
                    >
                      {locations.map((location) => (
                        <MenuItem key={location} value={location}>
                          {location}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
