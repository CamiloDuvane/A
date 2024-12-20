import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AlunoForm from './pages/AlunoForm';
import Disciplina from './pages/Disciplina';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/alunos/novo" element={<PrivateRoute><AlunoForm /></PrivateRoute>} />
          <Route path="/alunos/:id" element={<PrivateRoute><AlunoForm /></PrivateRoute>} />
          <Route path="/disciplinas/:id" element={<PrivateRoute><Disciplina /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;