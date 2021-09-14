const bodyContent = document.querySelector('body');
const headerTag = document.createElement('header');
bodyContent.appendChild(headerTag);

const h1Tag = document.createElement('h1');
bodyContent.children[1].appendChild(h1Tag);
h1Tag.innerText = 'Minha Lista de Tarefas!';

const sectionInsertion = document.createElement('section');
bodyContent.appendChild(sectionInsertion);

const paragraphTag = document.createElement('p');
bodyContent.children[2].appendChild(paragraphTag);
paragraphTag.id = 'funcionamento';
paragraphTag.innerText = 'Clique duas vezes em um item para marcá-lo como completo';

const inputTag = document.createElement('input');
bodyContent.children[2].appendChild(inputTag);
inputTag.id = 'texto-tarefa';
inputTag.placeholder = 'Digite uma nova tarefa!';
inputTag.style.height = '20px';

const sectionList = document.createElement('section');
bodyContent.appendChild(sectionList);

const olTag = document.createElement('ol');
bodyContent.children[3].appendChild(olTag);
olTag.id = 'lista-tarefas';

const buttonTag = document.createElement('button');
bodyContent.children[2].appendChild(buttonTag);
buttonTag.id = 'criar-tarefa';
buttonTag.innerText = 'Adicionar nova tarefa';
buttonTag.style.marginLeft = '20px';

const sectionButtons = document.createElement('section');
bodyContent.appendChild(sectionButtons);

const buttonClearList = document.createElement('button');
bodyContent.children[4].appendChild(buttonClearList);
buttonClearList.id = 'apaga-tudo';
buttonClearList.innerText = 'Apagar lista de Tarefas';

const buttonClearComplete = document.createElement('button');
bodyContent.children[4].appendChild(buttonClearComplete);
buttonClearComplete.id = 'remover-finalizados';
buttonClearComplete.innerText = 'Remover tarefas finalizadas';
buttonClearComplete.style.marginLeft = '20px';

const buttonSaveTasks = document.createElement('button');
bodyContent.children[4].appendChild(buttonSaveTasks);
buttonSaveTasks.id = 'salvar-tarefas';
buttonSaveTasks.innerText = 'Salvar tarefas';
buttonSaveTasks.style.marginLeft = '20px';

function selectedTask(event) {
  const eventTargetSelect = event.target;
  const checkStyle = document.querySelectorAll('li');
  for (let i = 0; i < checkStyle.length; i += 1) {
    checkStyle[i].style.backgroundColor = '';
  }
  eventTargetSelect.style.backgroundColor = 'rgb(128, 128, 128)';
}

function completeTask(event) {
  const eventTargetComplete = event.target;
  if (eventTargetComplete.style.textDecoration === '') {
    eventTargetComplete.classList.add('completed');
    eventTargetComplete.style.textDecoration = 'line-through';
  } else {
    eventTargetComplete.classList.remove('completed');
    eventTargetComplete.style.textDecoration = '';
  }
}

function addClickList() {
  const addClick = document.querySelectorAll('#lista-tarefas li');
  for (let i = 0; i < addClick.length; i += 1) {
    addClick[i].addEventListener('click', selectedTask);
    addClick[i].addEventListener('dblclick', completeTask);
  }
}

function createNewTask() {
  const newTask = inputTag.value;
  const createList = document.querySelector('#lista-tarefas');
  const liTag = document.createElement('li');
  createList.appendChild(liTag);
  liTag.innerText = newTask;
  inputTag.value = '';
  addClickList();
}
document.getElementById('criar-tarefa').onclick = function add() { createNewTask(); };

function deleteList() {
  localStorage.clear();
  const checkListContent = document.querySelectorAll('li');
  for (let i = 0; i < checkListContent.length; i += 1) {
    checkListContent[i].parentNode.removeChild(checkListContent[i]);
  }
}
document.getElementById('apaga-tudo').onclick = function clear() { deleteList(); };

function removeTaskCompleteLocalStorage() {
  const items = localStorage.getItem('items');
  for (let i = 0; i < items; i += 1) {
    if (localStorage.getItem(`class${i}`) === 'completed') {
      localStorage.removeItem(`Task${i}`);
      localStorage.removeItem(`style${i}`);
      localStorage.removeItem(`class${i}`);
      localStorage.removeItem('items');
      const newList = document.querySelectorAll('li').length;
      localStorage.setItem('items', newList);
    }
  }
}

function removeTaskComplete() {
  const checkTaskComplete = document.querySelectorAll('.completed');
  for (let i = 0; i < checkTaskComplete.length; i += 1) {
    checkTaskComplete[i].parentNode.removeChild(checkTaskComplete[i]);
    removeTaskCompleteLocalStorage();
  }
}
const clearTaskComplete = document.getElementById('remover-finalizados');
clearTaskComplete.onclick = function clearComplete() { removeTaskComplete(); };

function saveTasks() {
  const saveList = document.querySelectorAll('li');
  for (let i = 0; i < saveList.length; i += 1) {
    const keyList = `Task${i}`;
    const styleText = `style${i}`;
    const classitem = `class${i}`;
    localStorage.setItem(keyList, saveList[i].innerText);
    localStorage.setItem(styleText, saveList[i].style.textDecoration);
    localStorage.setItem(classitem, saveList[i].classList.value);
    localStorage.setItem('items', saveList.length);
  }
}
document.getElementById('salvar-tarefas').onclick = function save() { saveTasks(); };

function pullSavedData() {
  const items = localStorage.getItem('items');
  if (localStorage.getItem('Task0') !== '') {
    for (let i = 0; i < items; i += 1) {
      const createList = document.querySelector('#lista-tarefas');
      const liTag = document.createElement('li');
      createList.appendChild(liTag);
      liTag.innerText = localStorage.getItem(`Task${i}`);
      liTag.style.textDecoration = localStorage.getItem(`style${i}`);
      liTag.className = localStorage.getItem(`class${i}`);
      addClickList();
    }
  }
}

window.onload = function loadPage() {
  pullSavedData();
};
