import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';

import Home from './pages';
import AddNew from './pages/AddNew';
import Category from './pages/Category';
import Comparison from './pages/Comparison';
import Item from './pages/Item';
import User from './pages/User';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="yeni-ekle" element={<AddNew />} />
        <Route path="kategori/:slug" element={<Category />} />
        <Route path="uye/:id" element={<User />} />
        <Route path="karsilasma/:slug" element={<Comparison />} />
        <Route path=":slug" element={<Item />} />
      </Routes>
      <ToastContainer />
    </Layout>
  );
}

export default App;
