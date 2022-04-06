export let Server = {

  loadTodoItems: async (owner)=> {
    const response = await fetch('http://localhost:3000/api/todos');
    let data = await response.json();
    if(data.length > 0) {
      data = await data.filter(item => item.owner == owner)
    }
    return data
  },

  createTodoItem: async (name, owner) => {
    const response = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        owner: owner
      })
    });
  },

  markTodoAsDone: async (id) => {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: true })
    });
  },

  deleteTodoItem: async (id) => {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE',
    });
  }
}
