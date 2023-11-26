import mongoose, { Document, Schema } from 'mongoose';

interface User {
    acctype: string;
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<User & Document>({
    acctype: String,
    name: String,
    email: String,
    password: String
});

const UserModel = mongoose.model<User & Document>('User', userSchema);

export default UserModel;
