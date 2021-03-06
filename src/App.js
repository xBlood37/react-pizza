import React from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Cart } from './pages';
import { fetchPizzas } from './redux/action/pizzas';

function App() {
  const dispath = useDispatch();

  React.useEffect(() => {
    // перенести в редух и подключить редух tnpm runhunk
    // следить за фильтрацией и сортировкой
    // сделать имитацию загрузки пицц
    dispath(fetchPizzas());
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
