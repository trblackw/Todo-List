//Practical JS
var todoList = {
    todos: [],
    addTodo: function(todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false
      });
    },
    changeTodo: function(position, todoText) {
      this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
      this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
      var todo = this.todos[position];
      todo.completed = !todo.completed;
    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        //Get number of completed todos
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++
            }
        }); 
      this.todos.forEach(function(todo) {
        //case 1: if everything's true make everything false
        if (completedTodos === totalTodos) {
            todo.completed = false;
        } else {
        //case 2: otherwise make everything true
            todo.completed = true;
        }
      });
    }
};


var handlers = {
    addTodo: function() {
       var addTodoTextInput = document.getElementById('addTodoTextInput');
       todoList.addTodo(addTodoTextInput.value);
       addTodoTextInput.value = "";
       view.displayTodos();
},
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = "";
        changeTodoTextInput.value = "";
        view.displayTodos();
},
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
},
    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = "";
        view.displayTodos();
},
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
}
};
//"view" because this is what users see
var view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = "";

        todoList.todos.forEach(function(todo, position) {
            var todoLi = document.createElement('li');
            var todoTextWithCompletion = '';

            if (todo.completed === true) {
            todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
            todoTextWithCompletion = '( ) ' + todo.todoText;
            }

            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
    }, this);
    },

    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent='Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) {
        console.log(event.target.parentNode.id);

        var elementClicked = event.target;

        if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        }
    });
    }
};

view.setUpEventListeners();
