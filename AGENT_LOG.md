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

