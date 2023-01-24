import { Route, Routes } from 'react-router-dom';
import Top from '../pages/index';

const Config = () => (
  <Routes>
    <Route path={'/'} element={<Top />} />
  </Routes>
);

export default Config;
