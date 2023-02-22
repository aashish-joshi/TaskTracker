import { ObjectID } from "bson";
import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		templateId: {
			type: String,
			required: true,
		},
		from: {
			type: String,
			default: "aashish@aashishjoshi.co.in",
		}
	},
	{ timestamps: true }
);

export const Task = mongoose.model("Notification", notificationSchema);
