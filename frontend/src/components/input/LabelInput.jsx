import React, { useState } from "react";

// Custom LabelInput component
const LabelInput = ({ tags, setTags }) => {
	// const [tags, setTags] = useState<string[]>([]); // Holds the tags
	const [inputValue, setInputValue] = useState(""); // Holds the input field value

	// Handle the addition of a new tag
	const handleAddTag = () => {
		if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
			setTags((prevTags) => [...prevTags, inputValue.trim()]); // Add the new tag
			setInputValue(""); // Reset input field
		}
	};

	// Handle the deletion of a tag
	const handleDeleteTag = (tag) => {
		setTags(tags.filter((t) => t !== tag)); // Remove the tag
	};

	// Handle input value change
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	// Handle the 'Enter' key to add a tag
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddTag();
		}
	};

	return (
		<div className='flex flex-col-reverse gap-1'>
			<div>
				{/* Display tags */}
				{tags.map((tag, index) => (
					<span
						key={index}
						style={tagStyle}>
						{tag}
						<button
							type='button'
							onClick={() => handleDeleteTag(tag)}
							style={deleteButtonStyle}>
							x
						</button>
					</span>
				))}
			</div>
			<input
				type='text'
				value={inputValue}
				name='tags'
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				placeholder='Press Enter to add tag'
				style={inputStyle}
			/>
		</div>
	);
};

// Styles for tag and input
const tagStyle = {
	padding: "5px 10px",
	margin: "5px",
	background: "#e0e0e0",
	borderRadius: "15px",
	display: "inline-flex",
	alignItems: "center",
};

const deleteButtonStyle = {
	marginLeft: "5px",
	fontSize: "12px",
	color: "red",
	background: "none",
	border: "none",
	cursor: "pointer",
};

const inputStyle = {
	marginTop: "10px",
	padding: "5px 10px",
	border: "1px solid #ccc",
	borderRadius: "5px",
	width: "100%",
};

export default LabelInput;
