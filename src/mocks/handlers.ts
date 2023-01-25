import { rest } from 'msw';

const randomDelay = () => Math.floor(Math.random() * 1000);
const randomToken = () => Math.random().toString(36).slice(-8);

const mockAccessToken = {
  generate: () => {
    const token = randomToken();
    localStorage.setItem('mockAccessToken', token);
    return token;
  },
  get: () => localStorage.getItem('mockAccessToken') ?? '',
};

const mockRefreshToken = {
  generate: () => {
    const token = randomToken();
    localStorage.setItem('mockRefreshToken', token);
    return token;
  },
  get: () => localStorage.getItem('mockRefreshToken') ?? '',
};

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    const { username, password } = await req.json();
    const delay = randomDelay();
    if (username === 'test' && password === 'test') {
      return res(
        ctx.delay(delay),
        ctx.status(200),
        ctx.json({
          expires_in: 300,
          access_token: mockAccessToken.generate(),
          refresh_token: mockRefreshToken.generate(),
        })
      );
    } else {
      return res(
        ctx.delay(delay),
        ctx.status(400),
        ctx.json({
          message: 'ユーザーが存在しないか、パスワードが間違っています。',
        })
      );
    }
  }),
  rest.post('/oauth/token', async (req, res, ctx) => {
    const { refresh_token } = await req.json();
    const delay = randomDelay();
    if (refresh_token === mockRefreshToken.get()) {
      return res(
        ctx.delay(delay),
        ctx.status(200),
        ctx.json({
          expires_in: 300,
          access_token: mockAccessToken.generate(),
          refresh_token: mockRefreshToken.generate(),
        })
      );
    } else {
      return res(
        ctx.delay(delay),
        ctx.status(401),
        ctx.json({
          message: 'リフレッシュトークンが無効です。',
        })
      );
    }
  }),
  rest.get('/api/user', async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    const delay = randomDelay();
    if (authorization === `Bearer ${mockAccessToken.get()}`) {
      return res(
        ctx.delay(delay),
        ctx.status(200),
        ctx.json({
          name: 'テスト太郎',
        })
      );
    } else {
      return res(
        ctx.delay(delay),
        ctx.status(401),
        ctx.json({
          message: 'アクセストークンが無効です。',
        })
      );
    }
  }),
];
