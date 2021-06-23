import mongoose from 'mongoose';
import request from 'supertest';
import dbHandler from '../utils/db-handler';
import App from '@server/app';
import TodoRoutes from '@server/routes/todo.route';
import TodoService from '@server/services/todo.service';

describe('Todos apo', () => {
  let app: any;
  let todoService: any;

  /**
   * Connect to a new in-memory database before running any tests.
   */
  beforeAll(async () => {
    await dbHandler.connect();
    app = new App([new TodoRoutes()]).getServer();
    todoService = new TodoService();
  });
  /**
   * Clear all test data after every test.
   */
  afterEach(async () => await dbHandler.clearDatabase());

  /**
   * Remove and close the db and server.
   */
  afterAll(async () => await dbHandler.closeDatabase());

  it('GET /todos --> returns 404', () => {
    return request(app).get('/todos').expect('Content-Type', /json/).expect(404);
  });

  it('GET /todos --> returns list of todos', async () => {
    await todoService.addTodo({ message: 'Clean my car' });
    await todoService.addTodo({ message: 'Go to work' });

    return request(app)
      .get('/todos')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.anything(),
              message: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });
});
