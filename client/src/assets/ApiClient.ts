import type { Todo } from '~types/todo.interface';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'BATCH';
type RequestOptions = {
  body?: any;
};

class ApiClient {
  private baseUrl = 'http://localhost:3000';
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