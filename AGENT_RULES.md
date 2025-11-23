# Regras para Todos os Agentes

1. Nunca modificar a arquitetura de pastas a menos que seja absolutamente necessário.
2. Nunca refatorar sem justificativa técnica documentada (colocar justificativa no `AGENT_LOG.md`).
3. Nunca reescrever ou substituir blocos de código essenciais sem evidência clara de necessidade e aprovação humana.
4. Preservar todo estilo visual e lógica existente salvo correções pontuais e justificadas.
5. Registrar tudo no `AGENT_LOG.md` antes e depois de qualquer mudança significativa.
6. Sempre deixar uma dica concreta para o próximo agente continuar (passos, comandos, contexto).
7. Se tiver dúvida, prefira não modificar e registre a dúvida no log para revisão humana.
8. Proibições técnicas imediatas:
   - Não adicionar novas dependências sem aprovação humana.
   - Não inserir chaves ou segredos no repositório.

Procedimentos de emergência:
- Se uma alteração quebrar a build, pare e registre imediatamente em `AGENT_LOG.md` com passos para reproduzir o problema.

Recomendações operacionais:
- Use `/.agent_workspace` para experimentos e rascunhos; marque claramente qualquer arquivo experimental com o prefixo `EXP_`.
- Ao finalizar um rascunho útil, registre no `AGENT_LOG.md` e mova o artefato para revisão humana (issue/PR), não diretamente para produção.

Responsabilidade:
- Cada agente que fizer alterações tem responsabilidade de descrever o raciocínio, o impacto esperado e os testes realizados no `AGENT_LOG.md`.

