import { useUser } from '../swr/user';

const Home = () => {
  const { user, isLoading } = useUser();
  return (
    <main>こんにちは！{isLoading ? '[読み込み中]' : user?.name}さん！</main>
  );
};

export default Home;
