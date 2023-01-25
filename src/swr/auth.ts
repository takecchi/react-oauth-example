import useSWR from 'swr';
import { accessToken, refreshToken } from '../libs/cookie';
import {
  fetchAccessToken,
  fetchRefreshToken,
  TokenResponse,
} from '../libs/api';

export const useAuth = () => {
  const { data, mutate, error, isLoading } = useSWR<
    TokenResponse | undefined,
    Error
  >('/oauth/token', fetchAccessToken);

  const login = async (name: string, password: string) => {
    await fetchRefreshToken(name, password);
    await mutate();
  };

  const logout = async () => {
    accessToken.set('');
    refreshToken.set('');
    await mutate();
    console.debug('ログアウト成功');
  };

  return {
    accessToken: data?.access_token,
    isLoading,
    mutate,
    loggedOut: error !== undefined,
    error,
    login,
    logout,
  };
};
