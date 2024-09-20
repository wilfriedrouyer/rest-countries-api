import { Route, Routes } from 'react-router-dom';

import Countries from './components/Countries';
import Country from './components/Country';
import Header from './components/Header';
import { useTheme } from './components/ThemeContext';

import './styles/App.css';

function App() {
  const { mode } = useTheme();

  return (
    <div className={`app-body ${mode}`}>
      <Header />
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/country/:id" key={':id'} element={<Country />} />
      </Routes>
    </div>
  );
}

export default App;
