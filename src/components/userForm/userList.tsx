// UserList.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { User } from '../../utils/types';
import UserTableRow from './userTableRow';

interface UserListProps {
  users: User[];
  onDelete: (id: string) => void;
  onLocationChange: (id: string, location: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete, onLocationChange }) => {
  return (
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
          {users.map((user) => (
            <UserTableRow key={user.id} user={user} onDelete={onDelete} onLocationChange={onLocationChange} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
