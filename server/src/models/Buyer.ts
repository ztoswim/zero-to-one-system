import mongoose, { Schema } from 'mongoose';

// 定义地址模型
const addressSchema = new Schema({
  addressLine0: { type: String, required: true },
  addressLine1: { type: String },
  addressLine2: { type: String },
  postalZone: { type: String },
  cityName: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
});

// 定义买家模型
const buyerSchema = new Schema({
  name: { type: String, required: true },
  tin: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  registrationScheme: { type: String, required: true },
  sst: { type: String, required: true },
  email: { type: String },
  contact: { type: String, required: true },
  address: { type: addressSchema, required: true },
}, { timestamps: true });

const Buyer = mongoose.model('Buyer', buyerSchema);
export default Buyer;
