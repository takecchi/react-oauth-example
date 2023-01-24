import { accessToken, refreshToken } from './cookie';

const REFRESH_TOKEN = 'refresh_token';
const ACCESS_TOKEN = 'access_token';

/**
 * レスポンス想定
 */
export type TokenResponse = {
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

/**
 * API通信を想定
 * @param ms
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomSleep = async () => {
  await sleep(Math.floor(Math.random() * 1000));
};

/**
 * ログイン処理のかわり
 * @param name
 * @param password
 */
const fetchRefreshToken = async (
  name?: string,
  password?: string
): Promise<TokenResponse> => {
  console.debug('ログイン処理開始');
  await randomSleep();
  if (name !== undefined && password !== undefined) {
    console.debug('ログイン完了');
    return {
      expires_in: 300,
      access_token: ACCESS_TOKEN,
      refresh_token: REFRESH_TOKEN,
    };
  } else {
    throw new Error('ログイン失敗');
  }
};

const fetchAccessToken = async (): Promise<TokenResponse> => {
  await randomSleep();
  if (refreshToken.get() === 'refresh_token') {
    return {
      expires_in: 300,
      access_token: ACCESS_TOKEN,
      refresh_token: REFRESH_TOKEN,
    };
  } else {
    throw new Error('アクセストークンの取得に失敗しました。');
  }
};

/**
 * ユーザー名取得
 */
const fetchUserName = async (): Promise<string> => {
  await randomSleep();
  if (accessToken.get() === ACCESS_TOKEN) {
    return '田中太郎';
  } else {
    throw new Error('通信に失敗しました。');
  }
};

export { fetchRefreshToken, fetchAccessToken, fetchUserName };
