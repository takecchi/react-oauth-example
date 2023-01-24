import css from './header.module.css';
import { useAuth } from '../swr/auth';

const Header = () => {
  const { isLoading, loggedOut } = useAuth();
  return (
    <header className={css.header}>
      <div>
        ログイン状態:
        {isLoading
          ? '読み込み中...'
          : loggedOut
          ? 'ログアウト'
          : 'ログイン済み'}
      </div>
    </header>
  );
};
export default Header;
