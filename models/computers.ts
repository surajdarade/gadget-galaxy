import mongoose, { Document, Schema } from 'mongoose';

interface Computers {
    name: string;
    price: number;
    image: string;
}

const computersSchema = new Schema<Computers & Document>({
    name: String,
    price: Number,
    image: String
});

const ComputersModel = mongoose.model<Computers & Document>('Computers', computersSchema);

export default ComputersModel;
