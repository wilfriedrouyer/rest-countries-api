import { Route, Routes } from 'react-router-dom';

import Countries from './components/Countries';
import Country from './components/Country';
import Header from './components/Header';

import './styles/App.css';

function App() {
  return (
    <div className="app-body">
      <Header />
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/country/:id" key={':id'} element={<Country />} />
      </Routes>
    </div>
  );
}

export default App;
