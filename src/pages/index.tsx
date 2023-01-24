import { Link } from 'react-router-dom';

const Top = () => {
  return (
    <main>
      <h1>トップページ</h1>
      <Link to={'/home'}>ログインしてないと入れないページ</Link>
    </main>
  );
};

export default Top;
