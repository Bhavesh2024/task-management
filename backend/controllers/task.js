require('dotenv').config();

const Task = require('../models/task');

// Add Task
const addTask = async (req, res) => {
    try {
        const { name, description, time, label, status, progress, date } = req.body; // Include date
        const { user } = req;

        if (user) {
            const newTask = new Task({
                name,
                description,
                time,
                label,
                status,
                progress,
                date,  // Save date along with time
                user_id: user.id
            });
            await newTask.save();
            return res.status(201).json({ message: "Task Created Successfully" });
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Edit Task
const editTask = async (req, res) => {
    try {
        const { id, name, description, time, label, status, progress, date } = req.body; // Include date
        const { user } = req;

        if (user) {
            const updatedTask = await Task.updateOne(
                { _id: id, user_id: user.id },
                {
                    $set: { name, description, time, label, status, progress, date }  // Update date as well
                }
            );

            if (updatedTask.nModified === 0) {
                return res.status(404).json({ message: "Task not found or no changes made" });
            }
            console.log(await Task.findOne({_id:id}));
            return res.status(200).json({ message: "Task Updated Successfully" });
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get Task by ID
const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ _id: id });
        if (task) {
            return res.status(200).json({ task });
        } else {
            return res.status(404).json({ message: "Task not found" });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get All Tasks
const getAllTask = async (req, res) => {
    try {
        const allTask = await Task.find();
        if (allTask.length !== 0) {
            return res.status(200).json(allTask);
        } else {
            return res.status(404).json({ message: "No Tasks Found" });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const getFilteredTask = async (req, res) => {
    try {
        // Destructure query parameters
        const { 
            status, 
            label, 
            startDate, 
            endDate, 
            startTime, 
            endTime, 
            query, 
            page = 1 
        } = req.query;

        console.log(req.query);

        // Build the query filter object
        let filterQuery = {};

        // Handle 'startDate' and 'endDate' filters (if provided)
        if (startDate && endDate) {
            filterQuery['date.start'] = { $gt: new Date(startDate) };
            filterQuery['date.end'] = { $lt: new Date(endDate) };
        } else if (startDate) {
            filterQuery['date.start'] = { $gt: new Date(startDate) };
        } else if (endDate) {
            filterQuery['date.end'] = { $lt: new Date(endDate) };
        }

        // Handle 'startTime' and 'endTime' filters (if provided)
        if (startTime && endTime) {
            filterQuery['time.start'] = { $gt: new Date(startTime) };
            filterQuery['time.end'] = { $lt: new Date(endTime) };
        } else if (startTime) {
            filterQuery['time.start'] = { $gt: new Date(startTime) };
        } else if (endTime) {
            filterQuery['time.end'] = { $lt: new Date(endTime) };
        }

        // Handle 'status' filter (if provided)
        if (status) {
            filterQuery.status = status;
        }

        // Handle 'label' filter (if provided)
        if (label) {
            filterQuery.label = { $regex: label, $options: 'i' }; // case-insensitive search
        }

        // Handle search query ('query' filter)
        if (query) {
            filterQuery.$text = { $search: query }; // Full-text search if using $text index
        }

        // Paginate results
        const pageSize = 10; // Number of results per page (adjust as needed)
        const skip = (page - 1) * pageSize;

        // Fetch filtered tasks
        const filterData = await Task.find(filterQuery)
            .skip(skip)
            .limit(pageSize);

        console.log(filterData);

        if (filterData.length !== 0) {
            return res.status(200).json(filterData);
        } else {
            return res.status(404).json({ message: "No Data Found" });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Search Tasks by Task Name or Description
const searchTask = async (req, res) => {
    const { query } = req.params;
    console.log(query);
    try {
        const tasks = await Task.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        });

        if (tasks.length !== 0) {
            return res.status(200).json(tasks);
        } else {
            return res.status(404).json({ message: "No Tasks Found matching your search" });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Remove Task by ID
const removeTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.deleteOne({ _id: id });

        if (deletedTask.deletedCount === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Remove All Tasks
const removeAllTask = async (req, res) => {
    try {
        const { user } = req;

        if (user) {
            await Task.deleteMany({ user_id: user.id });
            return res.status(200).json({ message: "All Tasks deleted successfully" });
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getTaskById,
    getAllTask,
    addTask,
    editTask,
    removeTaskById,
    removeAllTask,
    getFilteredTask,
    searchTask,
};
