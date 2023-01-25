import { Link } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { useAuth } from '../swr/auth';

const useInput = (initialValue: string) => {
  const [value, set] = useState(initialValue);
  return {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement>) => set(e.target.value),
  };
};

const Top = () => {
  const { login } = useAuth();
  const name = useInput('');
  const password = useInput('');

  const submit = async () => {
    await login(name.value, password.value);
  };

  return (
    <main>
      <h1>トップページ</h1>
      <div>
        <h2>ログインフォーム</h2>
        <input
          value={name.value}
          onChange={name.onChange}
          placeholder="ユーザー名"
          name="name"
          required
        />
        <input
          type="password"
          value={password.value}
          onChange={password.onChange}
          placeholder="パスワード"
          name="password"
          required
        />
        <button onClick={submit}>ログイン</button>
      </div>

      <Link to={'/home'}>ログインしてないと入れないページ</Link>
    </main>
  );
};

export default Top;
