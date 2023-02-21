import mongoose, { Schema } from 'mongoose'

export const notificationSchema = new Schema(
  {
    content: String,
    recipient_id: String,
    read: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

export const Notification = mongoose.model('notifications', notificationSchema)
