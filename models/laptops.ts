import mongoose, { Document, Schema } from 'mongoose';

interface Laptops {
    name: string;
    price: number;
    image: string;
}

const laptopsSchema = new Schema<Laptops & Document>({
    name: String,
    price: Number,
    image: String
});

const LaptopsModel = mongoose.model<Laptops & Document>('Laptops', laptopsSchema);

export default LaptopsModel;
