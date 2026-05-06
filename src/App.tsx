import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TechPath from './pages/TechPath';
import Events from './pages/Events';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/techpath" element={<TechPath />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
}