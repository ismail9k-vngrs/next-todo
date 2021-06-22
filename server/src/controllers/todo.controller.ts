import { NextFunction, Request, Response } from 'express';

class TodoController {
  public get = (req: Request, res: Response, next: NextFunction): void => {
    try {
      // TODO
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default TodoController;
