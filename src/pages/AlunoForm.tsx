import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

export default function AlunoForm() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadAluno();
    }
  }, [id]);

  async function loadAluno() {
    const { data, error } = await supabase
      .from('alunos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      alert('Erro ao carregar aluno');
      return;
    }

    reset(data);
  }

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        const { error } = await supabase
          .from('alunos')
          .update(data)
          .eq('id', id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('alunos')
          .insert([data]);
        
        if (error) throw error;
      }

      navigate('/');
    } catch (error) {
      alert('Erro ao salvar aluno!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <button
                    onClick={() => navigate('/')}
                    className="mr-4 text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {id ? 'Editar Aluno' : 'Novo Aluno'}
                  </h2>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <input
                    type="text"
                    {...register('nome')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                </div>

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
                  <label className="block text-sm font-medium text-gray-700">Telefone</label>
                  <input
                    type="tel"
                    {...register('telefone')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Endereço</label>
                  <input
                    type="text"
                    {...register('endereco')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nível Acadêmico</label>
                  <select
                    {...register('nivel_academico')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  >
                    <option value="">Selecione...</option>
                    <option value="Fundamental">Ensino Fundamental</option>
                    <option value="Medio">Ensino Médio</option>
                    <option value="Superior">Ensino Superior</option>
                    <option value="Pos">Pós-graduação</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}