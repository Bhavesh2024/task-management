const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	time: {
		start: {
			type: Date,
			// required: true
		},
		end: {
			type: Date,
			// required: true
		},
	},
	date: {
		start: {
			type: Date,
			// required: true
		},
		end: {
			type: Date,
			// required: true
		},
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: Number,
		default: 0,
	},
	progress: {
		type: Number,
		min: 0,
		max: 100,
		default: 0,
	},
	label: {
		type: [String],
	},
	user_id: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
