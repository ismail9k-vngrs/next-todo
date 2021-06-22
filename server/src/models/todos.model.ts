import { model, Schema, Document } from 'mongoose';
import { Todo } from '../interfaces/todo.interface';

const userSchema: Schema = new Schema({
  items: {
    type: [{ message: String }],
    required: true,
  },
});

const userModel = model<Todo & Document>('User', userSchema);

export default userModel;
