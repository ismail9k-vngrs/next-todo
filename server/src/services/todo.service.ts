import HttpException from '../exceptions/HttpException';
import { Todo } from '../interfaces/todo.interface';
import todoModel from '../models/todos.model';

class TodoService {
  public todos = todoModel;

  public async findTodos(): Promise<Todo[]> {
    const todos: Todo[] = await this.todos.find();
    if (!todos?.length) throw new HttpException(404, 'not found');

    return todos;
  }

  public async addTodo(todoData: Todo): Promise<Todo> {
    const todo: Todo = await this.todos.create(todoData);
    return todo;
  }
}

export default TodoService;
