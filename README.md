# StoryCraft – Interface para Geração de Histórias de Usuário com ChatGPT

**StoryCraft Client** é a interface web do projeto StoryCraft, desenvolvida em React, que permite ao usuário interagir com o sistema de geração de histórias de usuário baseadas em IA (ChatGPT). Com ela, é possível criar projetos, responder a perguntas orientadas e visualizar as histórias geradas com base nas respostas.

**Infelizmente, o projeto não está funcionando no momento, devido a problemas com a API do ChatGPT** (Os créditos acabaram).

## Acesso Online

Acesse a aplicação em: [StoryCraft](https://pi-storycraft.onrender.com/)

## Funcionalidades

- Interface intuitiva para criação e gerenciamento de projetos
- Formulário para coleta de requisitos do usuário
- Visualização e edição de histórias de usuário geradas com ChatGPT
- Integração com a API do backend do PI StoryCraft
- Autenticação com JWT

## Tecnologias Utilizadas

- React.js
- JavaScript (ES6+)
- HTML5 e CSS3
- Axios
- React Router
- Bootstrap / Estilização customizada

## Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/pi-storycraft-client.git
   cd pi-storycraft-client
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` com a URL do backend:

```env
REACT_APP_API_URL=http://localhost:3000
```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

Acesse no navegador: [http://localhost:3000](http://localhost:3000)

## Scripts Disponíveis

| Comando         | Descrição                               |
|----------------|-------------------------------------------|
| `npm start`    | Inicia o frontend em modo desenvolvimento |
| `npm run build`| Gera a versão para produção               |

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Colaboradores

- **Back-end:** [Luiz Lopes](https://github.com/luizlopesbr)  
- **Front-end:** [Kauan Ribeiro](https://github.com/KauanRibeiroGondim)  
- **UX/UI:** [Emmanuel Soares](https://www.linkedin.com/in/emmanuelss/)  

#### Projeto para apoiar times ágeis na criação eficiente de histórias de usuário com auxílio da IA
