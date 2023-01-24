import { useUser } from '../swr/user';

const Home = () => {
  const { name, isLoading } = useUser();
  return <main>こんにちは！{isLoading ? '[読み込み中]' : name}さん！</main>;
};

export default Home;
