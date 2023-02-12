import mongoose, { Schema, Document } from 'mongoose';
import UserEntity from '../../../../Components/User/Entities/UserEntity';

export interface IUserModel extends Document, UserEntity {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  address?: string;
  
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  phone: { type: String, required: false },
  address: { type: String, required: false }
});

export default mongoose.model<IUserModel>('User', UserSchema);
