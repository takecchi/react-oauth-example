import { accessToken, refreshToken } from './cookie';

export type TokenResponse = {
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export type UserResponse = {
  name: string;
};

// アクセストークン更新
const fetchAccessToken = async (): Promise<TokenResponse> => {
  if (refreshToken.get() === '') {
    throw new Error('リフレッシュトークンがない');
  }
  const response = await fetch('/oauth/token', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refreshToken.get() }),
  }).then((res) => res);
  if (response.ok) {
    const json = await response.json();
    refreshToken.set(json.refresh_token);
    accessToken.set(json.access_token);
    return json;
  } else {
    throw new Error('アクセストークンの更新に失敗しました。');
  }
};

// ログイン処理
const fetchRefreshToken = async (
  username: string,
  password: string
): Promise<TokenResponse> => {
  const response = await fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ username: username, password: password }),
  }).then((res) => res);
  if (response.ok) {
    const json = await response.json();
    refreshToken.set(json.refresh_token);
    accessToken.set(json.access_token);
    return json;
  } else {
    throw new Error('ログインに失敗しました。');
  }
};

// ユーザー情報取得
const fetchUser = async (): Promise<UserResponse> => {
  const headers = {
    Authorization: `Bearer ${accessToken.get()}`,
  };
  const response = await fetch('/api/user', {
    method: 'GET',
    headers,
  }).then((res) => res);
  if (response.ok) {
    const json = await response.json();
    refreshToken.set(json.refresh_token);
    accessToken.set(json.access_token);
    return json;
  } else {
    throw new Error('ログインに失敗しました。');
  }
};
export { fetchAccessToken, fetchRefreshToken, fetchUser };
