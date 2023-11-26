import mongoose, { Document, Schema } from 'mongoose';

interface Accessories {
    name: string;
    price: number;
    image: string;
}

const accessoriesSchemaDefinition: Record<keyof Accessories, any> = {
    name: String,
    price: Number,
    image: String
};

const accessoriesSchema = new Schema<Accessories & Document>({
    ...accessoriesSchemaDefinition
});

const AccessoriesModel = mongoose.model<Accessories & Document>('Accessories', accessoriesSchema);

export default AccessoriesModel;
