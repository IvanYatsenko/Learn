import { Local } from "./local-model.js";
import { Server } from "./server-model.js";

(function () {

  function createButtonToggleStorage(storageValue) {
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('btn', 'btn-primary');
    toggleButton.textContent = 'To Server storage'
    if(storageValue) {
      toggleButton.textContent = 'To Local storage'
    }
    return toggleButton;
  }

  function createAppTitle(title) {
    const apptitle = document.createElement('h2');
    apptitle.innerText = title;
    return apptitle;
  }

  function createtodoItemForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Task name';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary', 'disabled');
    button.textContent = 'Add task';

    input.addEventListener('input', function () {
      if (input.value) {
        button.classList.remove('disabled');
      }
      else {
        button.classList.add('disabled');
      }
    })

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button
    };
  }

  function createTodoList() {
    const list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(name, done = false) {
    const item = document.createElement('li');
    const buttonGroup = document.createElement('div');
    const doneButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;
    item.name = name;
    item.done = done;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Done';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Delete';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    if (done) {
      item.classList.toggle('list-group-item-success')
    }

    return {
      item,
      doneButton,
      deleteButton
    };
  }

  async function createTodoApp(container, title) {

    let serverStorageIsEnable = Local.storageData(title)
    let localItems = serverStorageIsEnable ? await Server.loadTodoItems(title) : Local.loadData(title);

    const buttonToggleServer = createButtonToggleStorage(serverStorageIsEnable);
    const todoAppTitle = createAppTitle(title);
    const todoItemForm = createtodoItemForm();
    const todolist = createTodoList();

    container.append(buttonToggleServer);
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todolist);

    buttonToggleServer.addEventListener('click', ()=> {
      Local.storageDataToggle(title)
      document.location.reload()
    })

    if (localItems === null) {
      localItems = [];
    }

    if (localItems.length > 0) {
      for (const iterator of localItems) {
        const todoItem = createTodoItem(iterator.name, iterator.done);
        todoItem.doneButton.addEventListener('click',async function () {
          todoItem.item.classList.toggle('list-group-item-success');
          localItems.find(x => x.name == todoItem.item.name).done = todoItem.item.classList.contains('list-group-item-success');
          if(serverStorageIsEnable) {
            await Server.markTodoAsDone(iterator.id)
          }
        });

        todoItem.deleteButton.addEventListener('click',async function () {
          if (confirm('Are you sure?')) {
            localItems.splice(localItems.indexOf(x => x.name == todoItem.item.name), 1);
            todoItem.item.remove();
            serverStorageIsEnable ? await Server.deleteTodoItem(iterator.id) : Local.saveData(title, localItems);
          }
        });

        todolist.append(todoItem.item);
      }
    }

    todoItemForm.form.addEventListener('submit',async function (e) {
      e.preventDefault();
      if (!todoItemForm.input.value) {
        return;
      }

      const todoItem = createTodoItem(todoItemForm.input.value);
      if(serverStorageIsEnable) {
        await Server.createTodoItem(todoItemForm.input.value, title)
      } else {
        localItems.push({ name: todoItemForm.input.value, done: false });
        Local.saveData(title, localItems);
      }

      todoItem.doneButton.addEventListener('click', function () {

        todoItem.item.classList.toggle('list-group-item-success');
        localItems.find(x => x.name == todoItem.item.name).done = todoItem.item.classList.contains('list-group-item-success');
        Local.saveData(title, localItems);
      });

      todoItem.deleteButton.addEventListener('click', function () {
        if (confirm('Are you sure?')) {
          localItems.splice(localItems.indexOf(x => x.name == todoItem.item.name), 1);
          todoItem.item.remove();
          Local.saveData(title, localItems);
        }
      })

      todolist.append(todoItem.item);
      todoItemForm.input.value = '';
      todoItemForm.button.classList.add('disabled')
    });
  }

  window.createTodoApp = createTodoApp;
})();
