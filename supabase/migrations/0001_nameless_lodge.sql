/*
  # Schema inicial do sistema de gestão escolar

  1. Novas Tabelas
    - `profiles`
      - Armazena informações dos usuários
      - Vinculado à tabela auth.users
    - `alunos`
      - Armazena informações dos alunos
    - `disciplinas`
      - Lista de disciplinas disponíveis
    - `questoes`
      - Questões por disciplina
    - `respostas`
      - Respostas dos alunos

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas de acesso baseadas no usuário autenticado
*/

-- Profiles (informações dos usuários)
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  nome text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ler seus próprios dados"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seus próprios dados"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Alunos
CREATE TABLE alunos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text NOT NULL,
  telefone text,
  endereco text,
  nivel_academico text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE alunos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ler alunos que criaram"
  ON alunos
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Usuários podem criar alunos"
  ON alunos
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Usuários podem atualizar alunos que criaram"
  ON alunos
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

-- Disciplinas
CREATE TABLE disciplinas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE disciplinas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ler disciplinas"
  ON disciplinas
  FOR SELECT
  TO authenticated
  USING (true);

-- Inserir disciplinas padrão
INSERT INTO disciplinas (nome) VALUES
  ('Português'),
  ('Matemática'),
  ('História'),
  ('Biologia'),
  ('Química'),
  ('Contabilidade'),
  ('Gestão');

-- Questões
CREATE TABLE questoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  disciplina_id uuid REFERENCES disciplinas(id),
  pergunta text NOT NULL,
  resposta_correta text NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE questoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ler questões"
  ON questoes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar questões"
  ON questoes
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Respostas dos alunos
CREATE TABLE respostas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id uuid REFERENCES alunos(id),
  questao_id uuid REFERENCES questoes(id),
  resposta text NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE respostas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ler respostas que criaram"
  ON respostas
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Usuários podem criar respostas"
  ON respostas
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());