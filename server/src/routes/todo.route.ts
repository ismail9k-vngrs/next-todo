import { Router } from 'express';
import TodoController from '../controllers/todo.controller';
import Route from '../interfaces/routes.interface';

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
  }
}

export default TodoRoute;
