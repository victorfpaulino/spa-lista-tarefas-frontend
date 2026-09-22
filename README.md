# SPA de Lista de Tarefas — Frontend

Este projeto consiste no frontend de uma aplicação web de lista de tarefas, desenvolvida com HTML, CSS e JavaScript puro. A aplicação permite cadastrar, visualizar, editar e excluir tarefas por meio de uma interface simples e intuitiva.

O frontend se comunica com uma API REST desenvolvida em Python com Flask, responsável pelo gerenciamento e armazenamento das tarefas em um banco de dados SQLite.

## Requisitos para execução

Para executar o frontend localmente, é necessário ter:

* Um navegador web atualizado, como Google Chrome, Mozilla Firefox ou Microsoft Edge.
* Os arquivos do frontend disponíveis no computador.
* Python instalado e disponível no terminal para iniciar o servidor HTTP local.
* O backend da aplicação configurado e em execução, para permitir o carregamento e o gerenciamento das tarefas.

O frontend foi desenvolvido utilizando apenas HTML, CSS e JavaScript puro, não sendo necessária a instalação de bibliotecas ou pacotes adicionais para o desenvolvimento da interface.

**Importante:** o frontend utiliza uma API REST desenvolvida com Flask. Para que as funcionalidades de cadastro, visualização, edição e exclusão de tarefas funcionem corretamente, o servidor do backend deve estar em execução.

## Instalação e execução

Siga as instruções abaixo para executar o frontend da aplicação em seu computador.

### 1. Obter os arquivos do projeto

Faça o download dos arquivos do repositório do frontend e extraia o conteúdo para uma pasta em seu computador.

Mantenha a estrutura original de pastas e arquivos do projeto.

### 2. Instalar as dependências

O frontend foi desenvolvido utilizando HTML, CSS e JavaScript puro, sem bibliotecas ou frameworks externos.

Portanto, não é necessário instalar pacotes adicionais para o desenvolvimento do frontend.

Para executar o servidor HTTP local utilizando o procedimento descrito abaixo, é necessário ter o Python instalado e disponível no terminal.

### 3. Iniciar o backend

Antes de utilizar as funcionalidades da aplicação, certifique-se de que o backend Flask esteja configurado e em execução.

O frontend utiliza o seguinte endereço para se comunicar com a API:

`http://127.0.0.1:5000/tarefas`

Consulte o README do repositório do backend para obter as instruções de instalação e inicialização da API.

### 4. Iniciar o frontend

Abra um terminal na pasta `frontend` e execute o seguinte comando:

```bash
py -m http.server 5500
```

Esse comando inicia um servidor HTTP local na porta 5500.

Após iniciar o servidor, abra o navegador e acesse:

http://127.0.0.1:5500/

A interface da aplicação será carregada no navegador.

### 5. Utilizar a aplicação

Com os servidores do frontend e do backend em execução, será possível cadastrar, visualizar, editar e excluir tarefas por meio da interface.

**Importante:** caso o backend esteja desligado ou indisponível, a interface do frontend continuará acessível, mas não será possível carregar ou gerenciar as tarefas até que a comunicação com a API seja restabelecida.

## Estrutura de pastas

O frontend está organizado da seguinte forma:

```text
frontend/
├── imagens/
│   └── fundo.png
├── index.html
├── script.js
├── style.css
└── README.md
```

### Descrição dos arquivos

* **index.html:** contém a estrutura HTML da aplicação, incluindo o formulário de cadastro e edição de tarefas e a área de exibição das tarefas cadastradas.
* **style.css:** define a aparência visual da aplicação, incluindo cores, espaçamentos, botões, cards e imagem de fundo.
* **script.js:** implementa a lógica do frontend, incluindo o gerenciamento das tarefas, a atualização da interface e a comunicação com a API REST por meio de requisições HTTP.
* **imagens/fundo.png:** imagem utilizada como plano de fundo da aplicação.
* **README.md:** documentação do frontend, contendo a descrição do projeto e as instruções necessárias para sua instalação e execução.

## Funcionalidades

A aplicação oferece as seguintes funcionalidades:

* **Cadastrar tarefas:** permite adicionar novas tarefas informando um nome e uma descrição.
* **Visualizar tarefas:** apresenta as tarefas cadastradas em cards, exibindo o nome e a descrição de cada uma.
* **Editar tarefas:** permite selecionar uma tarefa existente, alterar suas informações e salvar as modificações.
* **Excluir tarefas:** permite remover uma tarefa mediante confirmação do usuário.
* **Validação de campos:** impede o envio do formulário quando o nome ou a descrição da tarefa estão vazios.
* **Mensagens de feedback:** apresenta mensagens de sucesso ou erro durante as operações realizadas na aplicação.
* **Integração com a API REST:** utiliza requisições HTTP para consultar, cadastrar, atualizar e excluir tarefas por meio do backend Flask.

## Tecnologias utilizadas

O frontend da aplicação foi desenvolvido utilizando as seguintes tecnologias:

* **HTML5:** responsável pela estrutura da página, incluindo o formulário de cadastro e edição e a área de visualização das tarefas.
* **CSS3:** utilizado para a estilização da interface, incluindo cores, espaçamentos, botões, cards e imagem de fundo.
* **JavaScript:** responsável pela lógica da aplicação, manipulação dos elementos HTML e comunicação com a API REST por meio de requisições HTTP utilizando a função `fetch()`.

O projeto utiliza JavaScript puro, sem frameworks ou bibliotecas externas para o desenvolvimento do frontend.
