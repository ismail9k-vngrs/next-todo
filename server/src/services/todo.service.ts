import HttpException from '../exceptions/HttpException';
import { Todo } from '~types/todo.interface';
import todoModel from '../models/todos.model';

class TodoService {
  public todos = todoModel;

  public async find(): Promise<Todo[]> {
    const todos: Todo[] = await this.todos.find();
    if (!todos?.length) throw new HttpException(404, 'not found');

    return todos;
  }

  public async add(todoData: Todo): Promise<Todo> {
    const todo: Todo = await this.todos.create(todoData);
    return todo;
  }

  public async updateById(id: string, todoData: Todo): Promise<any> {
    const todo = await this.todos.updateOne({ _id: id }, todoData);
    return todo;
  }
}

export default TodoService;
