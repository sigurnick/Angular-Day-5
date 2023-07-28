import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
})
export class CompletedComponent implements OnInit {
  todosCompleted: Todo[] = [];
  todoValue!: boolean;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().then((data) => {
      this.todosCompleted = data.filter((todo) => todo.completed === true);
      console.log(this.todosCompleted);

      if (this.todosCompleted.length > 0) {
        this.todoValue = true;
      } else {
        this.todoValue = false;
      }
    });
  }

  //cancella task -> invia i dati al service
  deleteTask(todo: Todo) {
    this.todoService.deleteTodo(todo).then((res) => {
      window.location.reload();
    });
  }
}
