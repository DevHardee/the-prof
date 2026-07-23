import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import TechPath from './pages/TechPath';
import Events from './pages/Events';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/techpath" element={<TechPath />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}/>
      </Routes>
    </>
  );
}