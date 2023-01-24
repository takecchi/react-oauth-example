const accessToken = {
  set: (value: string) => localStorage.setItem('access_token', value),
  get: () => localStorage.getItem('access_token') ?? '',
};

const refreshToken = {
  set: (value: string) => localStorage.setItem('refresh_token', value),
  get: () => localStorage.getItem('refresh_token') ?? '',
};

export { accessToken, refreshToken };
