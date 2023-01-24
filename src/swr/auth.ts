import {
  fetchAccessToken,
  fetchRefreshToken,
  TokenResponse,
} from '../libs/api';
import useSWR from 'swr';
import { accessToken, refreshToken } from '../libs/cookie';

// アクセストークンを更新する
const fetcher = async () => {
  if (refreshToken.get() === '') {
    throw new Error('リフレッシュトークンがない');
  }
  const tokenResponse = await fetchAccessToken();
  console.debug(`トークン取得:${JSON.stringify(tokenResponse)}`);
  accessToken.set(tokenResponse.access_token);
  refreshToken.set(tokenResponse.refresh_token);
  return tokenResponse;
};

export const useAuth = () => {
  const { data, mutate, error, isLoading } = useSWR<
    TokenResponse | undefined,
    Error
  >('/api/token', fetcher);

  const login = async (name: string, password: string) => {
    const tokenResponse = await fetchRefreshToken(name, password);
    console.debug(`ログイン成功:${JSON.stringify(tokenResponse)}`);
    refreshToken.set(tokenResponse.refresh_token);
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
