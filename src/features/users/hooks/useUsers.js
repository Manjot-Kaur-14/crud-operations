import { useQuery } from '@tanstack/react-query';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users'); // dummy JSON API
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
  });
};
