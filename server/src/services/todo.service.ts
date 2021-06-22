import HttpException from '../exceptions/HttpException';
import { Todo } from '../interfaces/todo.interface';
import todoModel from '../models/todos.model';
import { isEmpty } from '../utils/util';

class TodoService {
  public todos = todoModel;

  public async findTodoById(id: string): Promise<Todo> {
    if (isEmpty(id)) throw new HttpException(400, 'Not valid todo id');

    const findTodo: Todo = await this.todos.findOne({ _id: id });
    if (!findTodo) throw new HttpException(409, 'not found');

    return findTodo;
  }
}

export default TodoService;
