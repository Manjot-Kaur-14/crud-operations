import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const UserForm = ({ onSubmit, defaultValues = {}, closeForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues); // update form if defaultValues change (for edit)
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border rounded-2xl bg-gray-50 space-y-4 shadow-sm"
    >
      <div>
        <Label className="mb-1">Name</Label>
        <Input
          {...register('name', { required: 'Name is required' })}
          placeholder="Enter full name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label className="mb-1">Email</Label>
        <Input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/, message: 'Invalid email address' },
          })}
          placeholder="Enter email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="flex space-x-2">
        <Button type="submit">Save</Button>
        <Button type="button" variant="secondary" onClick={closeForm}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
