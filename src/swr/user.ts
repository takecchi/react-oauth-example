import useSWR from 'swr';
import { fetchUser, UserResponse } from '../libs/api';

export const useUser = () => {
  const { data, mutate, error, isLoading } = useSWR<
    UserResponse | undefined,
    Error
  >('/api/profile', fetchUser);

  return {
    user: data,
    isLoading,
    mutate,
    error,
  };
};
