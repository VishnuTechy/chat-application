import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
                default: [],
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
        roomName: [
			{
				type: String,
                required: true,
			},
		],
	},
	{ timestamps: true }
);

const room = mongoose.model("room", roomSchema);

export default room;
