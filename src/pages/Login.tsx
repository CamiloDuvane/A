import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn } from 'lucide-react';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const { error } = await signIn(data);
      if (error) throw error;
      navigate('/');
    } catch (error) {
      alert('Erro ao fazer login!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center mb-8">
          <LogIn className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-700">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}