# Consulta CNPJ com BrasilAPI

Este projeto consiste em uma aplicação web simples para consultar informações de empresas pelo CNPJ utilizando a API da [BrasilAPI](https://brasilapi.com.br). A aplicação é composta por uma página de pesquisa que renderiza o resultados, onde os dados da empresa e dos sócios são exibidos.

## Estrutura do Projeto

- **index.html**: Página principal onde o usuário pode inserir o CNPJ para consulta.
- **script.js**: Arquivo JavaScript contendo a lógica da aplicação para buscar dados da API e exibir informações.
- **styles.css**: Arquivo CSS para estilizar a aplicação (opcional, não incluído neste exemplo).

## Funcionalidades

1. **Consulta pelo CNPJ**:
   - O usuário insere o CNPJ no campo apropriado e clica no botão de pesquisa.
   - A aplicação consulta a API da BrasilAPI e exibe as informações da empresa e dos sócios.

2. **Exibição dos Dados**:
   - Informações da empresa são exibidas em um formato de cartão.
   - Dados dos sócios são exibidos em cartões separados.

3. **Navegação**:
   - Após a pesquisa, a aplicação oculta a seção de pesquisa e exibe a seção de resultados.
   - O usuário pode voltar para a página de pesquisa clicando no botão "Voltar", que também limpa o campo de CNPJ e as informações exibidas.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap (para estilização, opcional)
- [BrasilAPI](https://brasilapi.com.br) para consulta de CNPJ

## Como Usar

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/mlluiz39/Teste-Vaga-Desenvolvedor-Front-End

2. **Abra o Arquivo HTML**:
   ```bash
   Abra o arquivo index.html no seu navegador, pode usar a extensão do VScode live server

3. **Faça uma consulta**:
  ```bash
   Insira um CNPJ válido no campo de entrada e clique no botão "Pesquisar".
   Os resultados serão exibidos na mesma página.

4. **Volte para Pesquisa**:
  ```bash
   Clique no botão "Voltar" para retornar à página de pesquisa e limpar os dados exibidos,
   e está finalizado o projeto
