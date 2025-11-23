# Registro de Atividades dos Agentes

Este documento é compartilhado entre todos os agentes.
Cada agente DEVE registrar:

1. Nome do agente
2. Tarefas realizadas
3. Arquivos modificados
4. Justificativa para qualquer mudança
5. Dicas e contexto para o próximo agente

---

## Agente Inicial (Setup)

Nome do agente: Agente Inicial — GitHub Copilot

Data: 2025-11-23

Tarefas realizadas:
- Criação do arquivo `AGENT_LOG.md` (este arquivo).
- Criação do arquivo `AGENT_RULES.md` (regras obrigatórias para agentes).
- Criação da pasta de trabalho isolada `/.agent_workspace`.
- Criação do arquivo `/.agent_workspace/README.md` explicando regras do espaço.

Arquivos adicionados:
- `AGENT_RULES.md`
- `.agent_workspace/README.md`

Arquivos modificados: nenhum (somente adições).

Justificativa para mudanças:
- Estabelecer um mecanismo mínimo de comunicação entre agentes, regras e um espaço isolado de trabalho. Nenhum arquivo de frontend, lógica ou configuração foi alterado.

Registro de variáveis de ambiente (registro apenas — NÃO USAR AINDA):
- `DATABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

Identificador de projeto registrado: `hkkgfebdhevcdurpcdgu`

Chaves que NÃO DEVEM SER USADAS por agentes futuros (proibidas nesta fase):
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

Observações de segurança e privacidade:
- Nenhuma chave foi colocada neste repositório. Nunca registre segredos em arquivos acompanhados pelo Git. Use vaults/secret managers ou variáveis de ambiente seguras fora do código.

---

Dicas para o próximo agente:
- Sempre criar uma issue ou registrar no `AGENT_LOG.md` antes de alterar qualquer arquitetura ou arquivos centrais.
- Antes de alterar código de frontend, execute os testes (ou peça permissão para rodá-los) e comente no log quais testes você executou e os resultados.
- Se uma mudança de arquitetura for necessária, registre uma justificativa técnica detalhada neste log e abra uma issue para revisão humana.
- Use `/.agent_workspace` para rascunhos, runs locais, provas de conceito e arquivos temporários; não mova nada dessa pasta para produção sem revisão humana.

---

Status atual do repositório (resumo sintetizado):
- Projeto: Vite + React + TypeScript com Tailwind e integração com Supabase (detalhes em `AGENTS.md` e `SETUP.md`).
- Estrutura: `src/` contém componentes, hooks e integrações; `supabase/` contém migrations.
- Ações tomadas: nenhum código de aplicativo foi alterado — apenas documentação e pasta de trabalho adicionadas.

Se precisar que eu (ou outro agente) faça verificações adicionais (por exemplo, validar `package.json` ou rodar testes), registre a tarefa aqui e eu procedo conforme instruções.

---

## Agente 2 (Supabase Setup)

Nome do agente: Agente 2 — GitHub Copilot

Data: 2025-11-23

Tarefas realizadas:
- Criação do arquivo `lib/supabase/client.ts` como scaffold/placeholder para inicialização do cliente Supabase usando apenas `SUPABASE_SERVICE_KEY`.
- Validação documental das variáveis de ambiente necessárias e proíbidas (registro abaixo).
- Documento blueprint dos schemas `public` e `protected` adicionado neste log.

Arquivos adicionados:
- `lib/supabase/client.ts`

Arquivos modificados: nenhum (somente adições de documentação e scaffold).

Validação de variáveis de ambiente (registro):
- Variáveis permitidas e necessárias (devem ser usadas apenas pelo backend/serviços):
	- `DATABASE_URL`
	- `SUPABASE_SERVICE_KEY` (ou `SUPABASE_SERVICE_ROLE_KEY` opcional)
	- `VITE_SUPABASE_PROJECT_ID`

- Variáveis explicitamente proibidas neste estágio (não usar):
	- `VITE_SUPABASE_PUBLISHABLE_KEY`
	- `VITE_SUPABASE_URL`

Obs: Nenhuma dessas variáveis foi lida ou executada pelo Agente 2 — foram apenas registradas. Nunca colocar chaves em arquivos no repositório.

Blueprint de schemas (documental — sem criação/alteração de DB):

- `public` (padrão):
	- Finalidade: conteúdos públicos da aplicação (artworks, pages públicos, settings públicos).
	- Acesso esperado: leitura pública via URL de storage e políticas RLS que permitam leituras públicas quando aplicável.
	- Exemplo de tabelas (declarativo): `artworks`, `pages`, `settings`, `exhibitions` (descrições em `DATABASE.md`).

- `protected` (novo namespace lógico — NÃO CRIADO):
	- Finalidade: armazenar dados que exigem controles adicionais (rascunhos, dados administrativos, registros sensíveis).
	- Acesso esperado: acesso restrito via service role key e políticas RLS que permitam somente operações autenticadas/administrativas.
	- Notas: O uso do schema `protected` deve ser acompanhado de migrações e de políticas RLS detalhadas executadas por um operador humano.

Como os schemas serão acessados (proposta):
- Operações públicas (frontend): usar endpoints REST/JS client com chaves publicáveis **apenas** para leituras públicas (quando aplicável) — mas neste projeto inicial evitamos usar `VITE_SUPABASE_PUBLISHABLE_KEY` até que regras estejam definidas.
- Operações administrativas/privilegiadas: usar `SUPABASE_SERVICE_KEY` em código server-side (lambdas, edge functions, backend) com atenção à segurança.
- Políticas RLS: definir políticas no `protected` para permitir apenas roles administrativos; `public` deve expor apenas campos não sensíveis.

Riscos e mitigações:
- Risco: vazamento de chaves no repositório. Mitigação: registrar explicitamente que NÃO devemos commitar chaves; usar secret manager.
- Risco: alterações de schema não autorizadas. Mitigação: não executar migrações sem revisão humana (pré-requisito: abrir issue/PR).

Instruções claras para o Agente 3 (próximo):
- O projeto agora tem um scaffold de cliente Supabase em `lib/supabase/client.ts` que descreve as variáveis de ambiente e o fluxo esperado. O Agente 3 pode:
	1. Instalar `@supabase/supabase-js` se necessário.
	2. Implementar as conexões e queries reais em um módulo separado (por exemplo `lib/supabase/queries.ts`).
	3. Garantir que `SUPABASE_SERVICE_KEY` seja provisionado em ambiente seguro antes de executar o código.
	4. Criar migrações somente após abertura de issue/PR e aprovação humana — não rodar migrações automaticamente.

- Mensagem curta para o time:
	O projeto está preparado para integração com Supabase (scaffold pronto). O próximo agente pode começar a implementar queries e transformar o conteúdo do portfólio em conteúdo institucional preservando rotas e estilos. Não altere arquitetura sem registrar a justificativa no `AGENT_LOG.md`.

---

Status final do Agente 2: todas as tarefas solicitadas foram completadas sem tocar código de frontend, sem criar tabelas e sem rodar chamadas na instância Supabase.

