import { Router } from 'express';
import TodoController from '../controllers/todo.controller';
import Route from '../interfaces/routes.interface';

class TodoRoute implements Route {
  public path = '/todo';
  public router = Router();
  public toDoController = new TodoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.toDoController.get);
  }
}

export default TodoRoute;
