import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
    id: string;
    name: string;
    price: string;
    oldPrice: string;
    credit: string;
    priceGraph: string;
    deliveryTerm: string;
    differentPrice: string;
    breadCrumbs: string[];
    images: string[];
    paramsList: {
        title: string;
        params: string[];
    }[];
    characteristics: {
        title: string;
        list: {
            name: string;
            value: string;
        }[];
    }[];
    description: string;
    store: {
        name: string;
        logo: string;
    }[];
    commonInfo: {
        rating: string;
        ratingCount: string;
        orderCount: string;
    }[];
}

const ProductSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    oldPrice: String,
    credit: String,
    priceGraph: String,
    deliveryTerm: String,
    differentPrice: String,
    breadCrumbs: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    paramsList: [{
        title: String,
        params: [String]
    }],
    characteristics: [{
        title: String,
        list: [{
            name: String,
            value: String
        }]
    }],
    description: String,
    store: [{
        name: String,
        logo: String
    }],
    commonInfo: [{
        rating: String,
        ratingCount: String,
        orderCount: String
    }]
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
