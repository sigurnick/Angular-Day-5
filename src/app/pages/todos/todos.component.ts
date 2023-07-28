import { Todo } from './../../interfaces/todo';
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { TodoClass } from 'todo-class';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  todosCompleted: Todo[] = [];
  todosUncomplited: Todo[] = [];
  newTodo: Partial<Todo> = new TodoClass('', false);
  todoValue!: boolean;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().then((data) => {
      // tutti i todo
      this.todos = data;

      if (this.todos.length > 0) {
        this.todoValue = true;
      } else {
        this.todoValue = false;
      }

      console.log('Tutti i todo', this.todos);

      // todo non completati
      this.todosUncomplited = this.todos.filter(
        (todo) => todo.completed === false
      );
      console.log('Todo non completati', this.todosUncomplited);

      // todo completati
      this.todosCompleted = this.todos.filter(
        (todo) => todo.completed === true
      );
      console.log('Todo completati', this.todosCompleted);
    });
  }
  //crea nuovo todo -> manda dati a service
  createTodo() {
    this.todoService.createTodo(this.newTodo).then((res) => {
      window.location.reload();
    });
  }

  //cambia stasus menu -> manda dati a service
  changeStatus(todo: Todo) {
    this.todoService.editCompliteStatus(todo).then((res) => {
      window.location.reload();
    });
  }
}
