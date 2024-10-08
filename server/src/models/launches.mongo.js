import { Schema, model } from 'mongoose';

const launchesSchema = new Schema({
  flightNumber: { type: Number, required: true },
  launchDate: { type: Date, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  target: { type: String },
  customers: [String],
  upcoming: { type: Boolean, required: true, default: true },
  success: { type: Boolean, required: true, default: true },
});

// Connects launchesSchema with the "launches" collection
export default model('Launch', launchesSchema);
