# .agent_workspace — Espaço de Trabalho de Agentes

Uso previsto:

- Esta pasta é um espaço isolado para que agentes deixem rascunhos, notas, POCs e arquivos temporários.
- Nada aqui deve ser movido para produção sem revisão humana e um registro claro em `AGENT_LOG.md`.

Regras rápidas:

- Arquivos permitidos: notas, `EXP_`-prefixed experiments, logs locais, prints, arquivos temporários.
- Arquivos proibidos: chaves/segredos, builds finais, assets que substituirão produção.
- Marque todo arquivo experimental com o prefixo `EXP_` e descreva seu propósito em um arquivo README interno.

Fluxo recomendado:

1. Crie `/.agent_workspace/EXP_<nome>` para o experimento.
2. Documente no `AGENT_LOG.md` que você iniciou o experimento, incluindo objetivo e arquivos criados.
3. Quando terminar, registre resultados no `AGENT_LOG.md`. Não promova diretamente para `src/` sem revisão.

Limpeza:

- Mantenha este diretório enxuto; remova artefatos antigos quando não forem mais necessários e registre a limpeza no log.

