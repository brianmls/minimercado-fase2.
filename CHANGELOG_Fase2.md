# CHANGELOG — Fase 2 (2025-09-09)

**Principais ajustes realizados em relação à Fase 1**
- Adição do **Bootstrap 5** para layout responsivo e carrossel na página inicial.
- Inclusão de **JavaScript** para:
  - Saudação conforme horário.
  - Listagem dinâmica de produtos com **busca**, **filtro por categoria** e **ordenação**.
  - Renderização da página de serviços.
  - **Validação** dos formulários (contato e cadastro) com Bootstrap.
  - **Agendamento** com restrição de datas (de amanhã até +30 dias) e resumo ao enviar.
  - Máscaras simples de **CPF** e **CEP**.
- Melhoria de **acessibilidade**:
  - Atributos `alt` descritivos nas imagens.
  - Estrutura semântica (landmarks `header`, `main`, `footer` e `aria-*`).
  - Contraste e foco visível, rótulos associados a inputs.
- Criação da página **cadastro.html** com formulário completo de cliente e **escolha de retirada/tele‑entrega** com **calendário (date/time)**.
- Organização do código em arquivos: `index.html`, `produtos.html`, `servicos.html`, `contato.html`, `cadastro.html`, `styles.css`, `app.js`.

**Observações**
- Imagens usam fontes públicas (Unsplash) com `alt` para audiodescrição.
- Publicação recomendada via **GitHub Pages** a partir do branch `main`.
