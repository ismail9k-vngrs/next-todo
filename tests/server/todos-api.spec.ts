import mongoose from 'mongoose';
import request from 'supertest';
import dbHandler from '../utils/db-handler';
import App from '@server/app';
import TodoRoutes from '@server/routes/todo.route';
import TodoService from '@server/services/todo.service';

describe('Todos apo', () => {
  let app: any;
  let todoService: any;
  let todoRoutes: any;

  /**
   * Connect to a new in-memory database before running any tests.
   */
  beforeAll(async () => {
    await dbHandler.connect();
    todoRoutes = new TodoRoutes();
    app = new App([todoRoutes]).getServer();
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

  describe('GET /todos', () => {
    it('returns 404', () => {
      return request(app).get(`${todoRoutes.path}`).expect(404);
    });

    it('returns list of todos', async () => {
      // Seed some data
      await todoService.add({ message: 'Clean my car', completed: false });
      await todoService.add({ message: 'Go to work', completed: false });

      return request(app)
        .get(`${todoRoutes.path}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                _id: expect.any(String),
                message: expect.any(String),
                completed: expect.any(Boolean),
              }),
            ])
          );
        });
    });
  });

  describe('POST /todos', () => {
    it('create new todo', async () => {
      const todoData = { message: 'Clean my car', completed: false };
      request(app)
        .post(`${todoRoutes.path}`)
        .send(todoData)
        .expect(201)
        .then((response) => {
          expect(response.body).toMatchObject({
            _id: expect.any(String),
            ...todoData,
          });
        });
    });
  });
});