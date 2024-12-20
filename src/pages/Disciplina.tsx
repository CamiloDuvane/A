import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Plus } from 'lucide-react';

export default function Disciplina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disciplina, setDisciplina] = useState<any>(null);
  const [questoes, setQuestoes] = useState<any[]>([]);
  const [novaPergunta, setNovaPergunta] = useState('');
  const [novaResposta, setNovaResposta] = useState('');

  useEffect(() => {
    if (id) {
      loadDisciplina();
      loadQuestoes();
    }
  }, [id]);

  async function loadDisciplina() {
    const { data, error } = await supabase
      .from('disciplinas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      alert('Erro ao carregar disciplina');
      return;
    }

    setDisciplina(data);
  }

  async function loadQuestoes() {
    const { data, error } = await supabase
      .from('questoes')
      .select('*')
      .eq('disciplina_id', id);

    if (error) {
      alert('Erro ao carregar questões');
      return;
    }

    setQuestoes(data);
  }

  async function handleAddQuestao(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from('questoes')
      .insert([{
        disciplina_id: id,
        pergunta: novaPergunta,
        resposta_correta: novaResposta
      }]);

    if (error) {
      alert('Erro ao adicionar questão');
      return;
    }

    setNovaPergunta('');
    setNovaResposta('');
    loadQuestoes();
  }

  if (!disciplina) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex items-center">
            <button
              onClick={() => navigate('/')}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">
              {disciplina.nome}
            </h1>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Adicionar Nova Questão
              </h2>

              <form onSubmit={handleAddQuestao} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pergunta
                  </label>
                  <input
                    type="text"
                    value={novaPergunta}
                    onChange={(e) => setNovaPergunta(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Resposta
                  </label>
                  <input
                    type="text"
                    value={novaResposta}
                    onChange={(e) => setNovaResposta(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Questão
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Questões Existentes
            </h2>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {questoes.map((questao) => (
                  <li key={questao.id} className="px-4 py-4 sm:px-6">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-600">
                        Pergunta:
                      </div>
                      <div className="text-sm text-gray-900">
                        {questao.pergunta}
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        Resposta:
                      </div>
                      <div className="text-sm text-gray-900">
                 {questao.resposta_correta}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}