import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="border rounded-xl shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">ID</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" onClick={() => onEdit(user)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(user.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
