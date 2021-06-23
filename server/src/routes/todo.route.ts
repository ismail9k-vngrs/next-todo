import { Router } from 'express';
import TodoController from '../controllers/todo.controller';
import Route from '../interfaces/routes.interface';

class TodoRoute implements Route {
  public path = '/todos';
  public router = Router();
  public toDoController = new TodoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.toDoController.getAll);
  }
}

export default TodoRoute;
