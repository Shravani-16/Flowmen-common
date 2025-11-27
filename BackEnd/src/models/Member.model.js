import mongoose, { Schema } from 'mongoose';

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'supervisor', 'operator'],
      default: 'operator',
    },
    // Add other member-specific fields as needed
  },
  { timestamps: true }
);

export const Member = mongoose.model('Member', memberSchema);
