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
    return await this.todos.updateOne({ _id: id }, todoData);
  }

  public async deleteById(id: string): Promise<any> {
    return await this.todos.deleteOne({ _id: id });
  }

  public async deleteAll(): Promise<any> {
    return await this.todos.deleteMany({});
  }
}

export default TodoService;
