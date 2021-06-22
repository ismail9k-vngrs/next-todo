import { model, Schema, Document } from 'mongoose';
import { Todo } from '../interfaces/todo.interface';

const todoSchema: Schema = new Schema({
  items: {
    type: [{ message: String }],
    required: true,
  },
});

const todoModel = model<Todo & Document>('Todo', todoSchema);

export default todoModel;
