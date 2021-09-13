const bodyContent = document.querySelector('body');
const headerTag = document.createElement('header');
bodyContent.appendChild(headerTag);

const h1Tag = document.createElement('h1');
bodyContent.children[1].appendChild(h1Tag);
h1Tag.innerText = 'Minha Lista de Tarefas!';
