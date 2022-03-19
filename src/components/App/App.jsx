import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Article from '../Article/Article';
import GameOfLife from '../GameOfLife/GameOfLife';
import Header from '../Header/Header';
import IndexPage from '../IndexPage/IndexPage';
import Sidebar from '../Sidebar/Sidebar';
import Table from '../Table/Table';
import styles from './App.module.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(true);
  const handleMenuChange = () => {
    setMenuOpen(prev => !prev);
  }
  return (
    <Router>
      <Header menuOpen={menuOpen} handleMenuChange={handleMenuChange}/>
      <div className={styles.wrapper}>
      <Sidebar menuOpen={menuOpen} handleMenuChange={handleMenuChange}/>
        <div className={styles.page}>
          <Routes>
            <Route index element={<IndexPage />} />
            <Route path='/article' element={<Article />} />
            <Route path='/article/:id' element={<Article />} />
            <Route path='/list' element={<Table />} />
            <Route path='/life' element={<GameOfLife />} />
          </Routes>
        </div>
      </div>
      
    </Router>
  );
}

export default App;
