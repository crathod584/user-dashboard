// UserTableRow.tsx
import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { TableRow, TableCell, Select, MenuItem, Button } from "@mui/material";
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

interface UserTableRowProps {
  user: User;
  onDelete: (id: string) => void;
  onLocationChange: (id: string, location: string) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onDelete,
  onLocationChange,
}) => {
  const handleLocationChange = (e: SelectChangeEvent<string>) => {
    onLocationChange(user.id, e.target.value as string);
  };

  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.hobby}</TableCell>
      <TableCell>{user.createdAt}</TableCell>
      <TableCell>
        <Select value={user.location} onChange={handleLocationChange}>
          {locations.map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
