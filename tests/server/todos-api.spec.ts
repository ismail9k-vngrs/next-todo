import request from 'supertest';
import App from '@server/app';
import TodoRoutes from '@server/routes/todo.route';

describe('Todos apo', () => {
  const app = new App([new TodoRoutes()]).getServer();

  it('Get todos', () => {
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
