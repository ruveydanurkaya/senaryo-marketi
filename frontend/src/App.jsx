import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';
import AdminPanel from './pages/AdminPanel';
import WriterPanel from './pages/WriterPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/market" element={<Marketplace />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/writer" element={<WriterPanel />} />
      </Routes>
    </Router>
  );
}

export default App;