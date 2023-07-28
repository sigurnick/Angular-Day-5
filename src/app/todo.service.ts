import { Injectable } from '@angular/core';
import { Todo } from './interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url: string = 'http://localhost:3000/todos';
  todosCompleted: Todo[] = [];
  todosUncompleted: Todo[] = [];

  constructor() {}

  //prende tutti i todos dal database
  getTodos(): Promise<Todo[]> {
    return fetch(this.url).then((res) => res.json());
  }

  //crea nuovo todo
  createTodo(todo: Partial<Todo>): Promise<Todo> {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }).then((res) => res.json());
  }

  //cambia il todo completato/noncompletato
  editCompliteStatus(todo: Todo) {
    if (todo.completed === true) {
      todo.completed = false;
    } else {
      todo.completed = true;
    }

    return fetch(this.url + '/' + todo.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }).then((res) => {});
  }

  //cancella todo
  deleteTodo(todo: Todo) {

    return fetch(this.url + '/' + todo.id, {
      method: 'DELETE',
      body: JSON.stringify(todo),
    }).then((res) => {});
  }
}
