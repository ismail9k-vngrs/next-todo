import { NextFunction, Request, Response } from 'express';
import TodoService from '@server/services/todo.service';
import { Todo } from '@server/interfaces/todo.interface';

class TodoController {
  private todoService = new TodoService();

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const foundTodos = await this.todoService.find();
      res.json(foundTodos);
    } catch (error) {
      next(error);
    }
  };

  public createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todoData: Todo = req.body;
      const createdTodo: Todo = await this.todoService.add(todoData);

      res.status(201).json(createdTodo);
    } catch (error) {
      next(error);
    }
  };
}

export default TodoController;
