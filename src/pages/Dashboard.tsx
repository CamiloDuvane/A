import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Book, LogOut, UserPlus, Users } from 'lucide-react';

export default function Dashboard() {
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadDisciplinas();
  }, []);

  async function loadDisciplinas() {
    const { data, error } = await supabase
      .from('disciplinas')
      .select('*');
    
    if (error) {
      alert('Erro ao carregar disciplinas');
      return;
    }

    setDisciplinas(data);
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Book className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Sistema Escolar</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/alunos/novo"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Novo Aluno
              </Link>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Disciplinas</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {disciplinas.map((disciplina) => (
              <Link
                key={disciplina.id}
                to={`/disciplinas/${disciplina.id}`}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <Book className="w-8 h-8 text-blue-600" />
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Disciplina
                        </dt>
                        <dd className="text-lg font-semibold text-gray-900">
                          {disciplina.nome}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}