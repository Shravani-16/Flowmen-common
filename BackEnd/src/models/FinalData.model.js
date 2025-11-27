import mongoose, { Schema } from 'mongoose';

const finalDataSchema = new Schema(
  {
    deviceId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    // Example fields, add more as needed for OEE/PLC data
    oee: {
      type: Number,
    },
    availability: {
      type: Number,
    },
    performance: {
      type: Number,
    },
    quality: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const FinalData = mongoose.model('FinalData', finalDataSchema);
