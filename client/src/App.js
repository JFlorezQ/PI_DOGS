import './App.css';
import Create from './Views/Create/Create';
import Detail from './Views/Detail/Detail';
import Home from './Views/Home/Home';
import Landing from './Views/Landing/Landing';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;

