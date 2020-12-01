

const createToDo = (title, form, list) => {
  const todoContainer = document.createElement('div');
  const todoRow = document.createElement('div');
  const todoHeader = document.createElement('h1');
  const wrapperForm = document.createElement('div');
  const wrapperList = document.createElement('div');

  todoContainer.classList.add('container');
  todoRow.classList.add('row');
  todoHeader.classList.add('text-center', 'mb-5');
  wrapperForm.classList.add('col-6');
  wrapperList.classList.add('col-6');

  todoHeader.textContent = title;

  wrapperForm.append(form);
  wrapperList.append(list);
  todoRow.append(wrapperForm, wrapperList);
  todoContainer.append(todoHeader, todoRow);
  return todoContainer;
};


const createFormToDo = () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const textArea = document.createElement('textarea');
  const btnSubmit = document.createElement('button');

  input.placeholder = 'Наименование';
  textArea.placeholder = 'Описание';

  btnSubmit.textContent = 'Добавить';
  btnSubmit.type = 'submit';

  form.classList.add('form-group');
  input.classList.add('form-control', 'mb-3');
  textArea.classList.add('form-control', 'mb-3');
  btnSubmit.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block');

  form.append(input, textArea, btnSubmit);
  return {input, textArea, btnSubmit, form};
};


const createListToDo = () => {
  const listTodo = document.createElement('ul');
  listTodo.classList.add('list-group');
  return listTodo;
};

const createItemTodo = (id, titleItem) => {
  const itemToDo = document.createElement('li');
  const btnItem = document.createElement('button');

  itemToDo.classList.add('list-group-item', 'p-0', 'mb-3', 'border-0');
  btnItem.classList.add('btn', 'btn-light', 'btn-block', 'border-info', 'rounded-pill');
  btnItem.textContent = titleItem;
  btnItem.id = id;
  itemToDo.append(btnItem);

  return itemToDo;
};

const addTodoItem = (todoData, listTodo, nameTodo, descriptionTodo) => {
  const id = `todo${(+new Date()).toString(16)}`;
  const itemTodo = createItemTodo(id, nameTodo);

  todoData.push({id, nameTodo, descriptionTodo});

  listTodo.append(itemTodo);
  console.log(todoData);
};

const createModal = () => {
  const modalElem = document.createElement('div');
  const modalDialog = document.createElement('div');
  const modalContent = document.createElement('div');
  const modalHeader = document.createElement('div');
  const modalBody = document.createElement('div');
  const modalFooter = document.createElement('div');
  const itemTitle = document.createElement('h2');
  const itemDescription = document.createElement('p');
  const btnClose = document.createElement('button');
  const btnReady = document.createElement('button');
  const btnDelete = document.createElement('button');

  modalElem.classList.add('modal');
  modalDialog.classList.add('modal-dialog');
  modalContent.classList.add('modal-content');
  modalHeader.classList.add('modal-header');
  modalBody.classList.add('modal-body');
  modalFooter.classList.add('modal-footer');
  itemTitle.classList.add('modal-title');
  btnClose.classList.add('close', 'btn-modal');
  btnReady.classList.add('btn', 'btn-success', 'btn-modal');
  btnDelete.classList.add('btn', 'btn-danger', 'btn-delete', 'btn-modal');
 
  btnClose.innerHTML = '&times;';
  btnReady.textContent = 'Выполнено';
  btnDelete.textContent = 'Удалить';

  modalDialog.append(modalContent);
  modalContent.append(modalHeader, modalBody, modalFooter);
  modalHeader.append(itemTitle, btnClose);
  modalBody.append(itemDescription);
  modalFooter.append(btnReady, btnDelete);

  modalElem.append(modalDialog);

  const closeModal = event => {
    const target = event.target;

    if (target.classList.contains('btn-modal') || target === modalElem) {
      modalElem.classList.remove('d-block');
    }

  };

  modalElem.addEventListener('click', closeModal);
  
  const showModal = (titleToDo, descriptionTodo) => {
    modalElem.classList.add('d-block');
    itemTitle.textContent = titleToDo;
    itemDescription.textContent = descriptionTodo;
  };

  return {modalElem, btnReady, btnDelete, showModal}
};

const initToDo = (selector, titleToDo) => {
  const todoData = [];

  const wrapper = document.querySelector(selector);
  const formTodo = createFormToDo();
  const listTodo = createListToDo();
  const modal = createModal();
  const todoApp = createToDo(titleToDo, formTodo.form, listTodo);

  document.body.append(modal.modalElem);
  wrapper.append(todoApp);

  formTodo.form.addEventListener('submit', event => {
    event.preventDefault();

    formTodo.input.classList.remove('is-invalid');
    formTodo.textArea.classList.remove('is-invalid');
    
    if (formTodo.input.value.trim() && formTodo.textArea.value) {      
      addTodoItem(todoData, listTodo, formTodo.input.value, formTodo.textArea.value);
      formTodo.form.reset();
    } else {
      if (!formTodo.input.value) {
        formTodo.input.classList.add('is-invalid');
      }
      if (!formTodo.textArea.value) {
        formTodo.textArea.classList.add('is-invalid');
      }
    }
  });

};

initToDo('.app', 'Список дел');