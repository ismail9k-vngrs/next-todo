import { Router } from 'express';
import TodoController from '../controllers/todo.controller';
import Route from '~types/routes.interface';

class TodoRoute implements Route {
  public path = '/todos';
  public router = Router();
  public todoController = new TodoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.todoController.findAll);
    this.router.post(`${this.path}`, this.todoController.createTodo);
    this.router.put(`${this.path}/:id`, this.todoController.updateTodo);
    this.router.delete(`${this.path}/all`, this.todoController.deleteAllTodos);
    this.router.delete(`${this.path}/:id`, this.todoController.deleteTodo);
  }
}

export default TodoRoute;
