import type { Todo } from '~types/todo.interface';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'BATCH';
type RequestOptions = {
  body?: any;
};

class ApiClient {
  private baseUrl = process.env.VUE_APP_API_BASE_URL;
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  getTodos(): Promise<Todo[]> {
    return this.__fetch<Todo[]>('GET', '/todos');
  }

  createTodo(todoData: Partial<Todo>): Promise<Todo> {
    return this.__fetch<Todo>('POST', '/todos', { body: todoData });
  }

  updateTodo(id: string, todoData: Partial<any>): Promise<Todo> {
    return this.__fetch<Todo>('PUT', `/todos/${id}`, { body: todoData });
  }

  removeTodo(id: string): Promise<any> {
    return this.__fetch<Todo>('DELETE', `/todos/${id}`);
  }

  removeAllTodos(): Promise<any> {
    return this.__fetch<Todo>('DELETE', `/todos/all`);
  }

  private async __fetch<T>(
    method: RequestMethod,
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const requestUrl = `${this.baseUrl}${path}`;
    if (options.body) {
      options.body = JSON.stringify(options.body);
    }

    return fetch(requestUrl, {
      method: method,
      headers: this.headers,
      ...options,
    }).then(async (res) => {
      const jsonRes = await res.json();
      if (res.ok) {
        return jsonRes;
      }
      throw {
        statusCode: res.status,
        path,
        ...jsonRes,
      };
    });
  }
}

export default ApiClient;
