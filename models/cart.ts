import mongoose, { Document, Schema } from 'mongoose';

interface Cart extends Document {
    useremail: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

const cartSchema = new Schema<Cart>({
    useremail: String,
    name: String,
    quantity: Number,
    price: Number,
    image: String
});

const CartModel = mongoose.model<Cart>('Cart', cartSchema);

export default CartModel;
