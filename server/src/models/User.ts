import mongoose, { Document, Schema, Model } from 'mongoose';

interface DocumentResult<T> {
  _doc: any;
}

interface IUser extends DocumentResult<IUser> {
  username: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;