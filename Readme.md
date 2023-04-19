<h1 align="center">
    <img src="./img/logo-tdols-2.png">
</h1>

<h4 align="center"><strong>Seu App de Tarefas</strong></h4>

## 🚨 Sobre o Todols app 

O Todols app foi desenvolvido em um trabalho para o curso Certified Tech Developer, da Digital House. Esse trabalho tinha como objetivo, desenvolver um aplicativo de tarefas, onde os dados das tarefas tanto para fazer quanto completas pudessem permanecer salvas, assim como os dados dos usuários.

## 🤔 Como foi feito

Para podermos iserir novos usuários, logar com usuários existentes e salvar a lista de tarefa para cada usuário, a Digital House nos disponibilizou uma **API Fetch**, que se conecta diretamente com um sistema backend disponibilizado pela própria [Digital House](https://todo-api.ctd.academy/#/).

## Todols somente no localstorage

Como forma de apresentar uma segunda forma de se desenvolver o aplicativo de tarefas, foi criado o arquivo **main.js** que ao ser descomentado e ao comentar o **app.js** realiza o app somente no localstorage, com as mesmas funcionalidades(criar, excluir, reativar e editar tarefa), porém, sem criação de usuário e sem aproveitar da comunicação com o backend que a **API** nos proporciona.

## 🔨 Ferramentas/Linguagens

- HTML
- CSS
- JavaScript
- Fetch API

## 👍 Como contribuir

- #### **Clonando Repositório**

```bash
    $ git clone https://github.com/MatheusArtilles/checkpoint02_front_ii.git
```

Após clonar, próximo passo será rodar a página de login em seu navegador.

#### 🐋 **Modo Dockerfile**

Após Clonar o Repositório em sua pasta, digite os seguintes comandos.

```bash
    $ docker build -t app_todols .
```
<p align="center">e depois</p>

```bash
    $ docker run -d -p 80:80 app_todols
```
Após isso você poderá digitar em seu navegador: **localhost:80** ou somente **localhost**, e poderá ver o aplicativo sendo iniciado em seu navegador.
