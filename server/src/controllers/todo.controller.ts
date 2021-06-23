import { NextFunction, Request, Response } from 'express';

class TodoController {
  public getAll = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.json([
        {
          _id: 123,
          message: 'lorem',
          completed: false,
        },
      ]);
    } catch (error) {
      next(error);
    }
  };
}

export default TodoController;
