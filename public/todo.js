
    angular.module('todoApp', [])
      .controller('TodoListController', function() {
		var dex = 2;
        var todoList = this;

        todoList.todos = [
          {names:'Sally 	1433 Elm Street 555-534-2345', done:false},
          {names:'Bob 	1240 Pennsylvania Street 555-435-4547', done:false}
		];

		todoList.names = [
          {names:'Sally', address:'438 djfhui street', phone:'555-555-5555', done:false, selected:false, index:0},
          {names:'Bob', address:'932 werewr avenue', phone:'473-234-2398', done:false, selected:true, index:1}
		];
     
		todoList.addEntry = function() {
		  todoList.names.push({names:todoList.todoText, address:todoList.add, phone:todoList.phone, done:false, selected:false, index:dex++});
		  todoList.todoText = '';
		  todoList.add = '';
		  todoList.phone = '';
		};
	 
		todoList.deleteEntry = function() {
		  angular.forEach(todoList.names, function(todo) {
			if(todo.selected) todoList.names.splice(todo.index, 1);
		});
		};

		todoList.remaining = function() {
		  var count = 0;
		  angular.forEach(todoList.todos, function(todo) {
		    count += todo.done ? 0 : 1;
		  });
		  return count;
		};
	 
		todoList.archive = function() {
		  var oldTodos = todoList.todos;
		  todoList.todos = [];
		  todoList.names = [];
		  angular.forEach(oldTodos, function(todo) {
		    if (!todo.done) todoList.todos.push(todo);
		  });
		};

	  });

