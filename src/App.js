import { Route, Routes } from 'react-router-dom';

import Countries from './components/Countries';

import './styles/App.css';

function App() {
  return (
    <div className="app-body">
      <Routes>
        <Route path="/" element={<Countries />} />
      </Routes>
    </div>
  );
}

export default App;
