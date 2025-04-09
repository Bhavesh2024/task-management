// require('dotenv').config();
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user"); // Adjust the path to your User model

// Function to create an admin user
const createAdminUser = async () => {
	try {
		// console.log(process.env.SERVER_URL)
		await mongoose.connect(
			"mongodb://localhost:27017/task-manangement",
		);

		// Admin user data
		const adminUser = new User({
			name: "Admin User",
			email: "admin@example.com", // Unique email for admin
			password: "admin123", // In a real app, hash the password before saving
			username: "admin", // Unique username for admin
			image: "https://example.com/admin-image.jpg",
		});

		// Save the admin user to the database
		await adminUser.save();
		console.log("Admin user created successfully:", adminUser);

		// Close the database connection
		await mongoose.connection.close();
	} catch (error) {
		console.error("Error creating admin user:", error.message);
	}
};

// Run the function to create the admin user
createAdminUser();
