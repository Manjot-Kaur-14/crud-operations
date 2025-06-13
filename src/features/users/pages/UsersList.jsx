import React, { useState, useEffect } from 'react';
import { useUsers } from '../hooks/useUsers';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const UsersList = () => {
  const { data, isLoading } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    if (data) setLocalData(data);
  }, [data]);

  const usersPerPage = 5;

  const filtered = localData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedUsers = filtered.slice((page - 1) * usersPerPage, page * usersPerPage);

  const handleSave = (formData) => {
    if (editingUser) {
      setLocalData((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u))
      );
    } else {
      const newUser = { ...formData, id: Date.now() };
      setLocalData((prev) => [newUser, ...prev]);
    }

    setShowForm(false);
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    setLocalData((prev) => prev.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
        <Input
          placeholder="Search users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        <Button
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
        >
          Add User
        </Button>
      </div>

      {showForm && (
        <UserForm
          defaultValues={editingUser || { name: '', email: '' }}
          onSubmit={handleSave}
          closeForm={() => setShowForm(false)}
        />
      )}

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <CardContent className="p-0">
            <UserTable users={paginatedUsers} onEdit={handleEdit} onDelete={handleDelete} />
          </CardContent>

          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              disabled={page * usersPerPage >= filtered.length}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default UsersList;
