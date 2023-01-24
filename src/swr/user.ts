import useSWR from 'swr';
import { accessToken } from '../libs/cookie';
import { fetchUserName } from '../libs/api';

const fetcher = async () => {
  if (accessToken.get() === '') {
    throw new Error('アクセストークンがない');
  }
  const name = await fetchUserName();
  console.debug(`アカウント名取得:${name}`);
  return name;
};

export const useUser = () => {
  const { data, mutate, error, isLoading } = useSWR<string | undefined, Error>(
    '/api/profile',
    fetcher
  );

  return {
    name: data,
    isLoading,
    mutate,
    error,
  };
};
