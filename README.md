# Instruções de Uso

1. **Clone o Repositório**:

   ```bash
   git clone https://github.com/Mlluiz39/Teste-Vaga-Desenvolvedor-Front-End

## Abrir o Arquivo HTML / projeto

Navegue até o diretório do projeto e abra o arquivo `index.html` em um navegador.
Ou acesse a URL `https://cnpj-website-test.netlify.app/`

## Utilização

1. **Insira um CNPJ válido** no campo de pesquisa.
2. **Clique no botão "Consultar"** para obter as informações da empresa.
3. As **informações da empresa e dos sócios** serão exibidas abaixo.
4. Você pode **editar os campos diretamente** e enviar os dados conforme necessário.
5. **Clique no botão "Voltar"** para retornar à tela de pesquisa.

## Funcionalidades

1. **Consulta pelo CNPJ**:
   - O usuário insere o CNPJ no campo apropriado e clica no botão de pesquisa.
   - A aplicação consulta a API da BrasilAPI e exibe as informações da empresa e dos sócios.

2. **Exibição dos Dados**:
   - Informações da empresa são exibidas em um formato de cartão.
   - Dados dos sócios são exibidos em cartões separados.

3. **Salvo no localStorage**
   - Informações salvas no local storage do navegador.
   - Recuperação dos dados via local storage.

4. **Navegação**:
   - Após a pesquisa, a aplicação oculta a seção de pesquisa e exibe a seção de resultados.
   - O usuário pode voltar para a página de pesquisa clicando no botão "Voltar", que também limpa o campo de CNPJ e as informações exibidas.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap (para estilização, opcional)
- [BrasilAPI](https://brasilapi.com.br) para consulta de CNPJ

## Contribuição

Se você deseja contribuir para este projeto, sinta-se à vontade para abrir uma *pull request* ou relatar problemas na seção de *issues* do repositório.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
