import { model, Schema, Document } from 'mongoose';
import { Todo } from '~types/todo.interface';

const todoSchema: Schema = new Schema({
  message: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
});

const todoModel = model<Todo & Document>('Todo', todoSchema);

export default todoModel;
