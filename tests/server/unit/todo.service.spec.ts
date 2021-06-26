import mongoose from 'mongoose';
import dbHandler from '@server/databases';
import TodoService from '@server/services/todo.service';

describe('todo.service', () => {
  let todoService: any;
  const todosData = [
    { message: 'Clean my car', completed: false },
    { message: 'Buy milk', completed: false },
  ];

  /**
   * Connect to a new in-memory database before running any tests.
   */
  beforeAll(async () => {
    await dbHandler.connect();
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

  describe('.find()', () => {
    it('Throw 404 when there is no docs', async () => {
      const error = await todoService.find().catch((e: Error) => e);
      expect(error.message).toBe('not found');
      expect(error.status).toBe(404);
    });
    it('Return stored docs', async () => {
      await Promise.all(todosData.map((todo) => todoService.todos.create(todo)));

      const results = await todoService.find();
      expect(results.length).toBe(2);
      results.forEach((res: any, indx: number) => {
        expect(res).toMatchObject(todosData[indx]);
      });
    });
  });

  describe('.add()', () => {
    it('Adds new todos', async () => {
      const results = await todoService.add(todosData[0]);
      expect(results).toMatchObject(todosData[0]);
    });
  });

  describe('.updateById()', () => {
    it('Updates stored items', async () => {
      const id = new mongoose.Types.ObjectId().toHexString();
      await todoService.todos.create({ _id: id, ...todosData[0] });
      await todoService.updateById(id, { completed: true });
      const results = await todoService.todos.findById(id).exec();

      expect(results).toMatchObject({ ...todosData[0], completed: true });
    });
  });
});
