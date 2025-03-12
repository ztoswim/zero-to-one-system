import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema({
  addressLine0: { type: String, required: true },
  addressLine1: { type: String },
  addressLine2: { type: String },
  postalZone: { type: String },
  cityName: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
});

const buyerSchema = new Schema(
  {
    name: { type: String, required: true },
    tin: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    registrationScheme: { type: String, required: true },
    sst: { type: String, required: true },
    email: { type: String },
    contact: { type: String, required: true },
    address: { type: addressSchema, required: true },
  },
  { timestamps: true }
);

// 创建模型
const Buyer = mongoose.model('Buyer', buyerSchema);

export default Buyer;
