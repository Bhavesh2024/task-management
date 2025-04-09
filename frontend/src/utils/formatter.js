export function formatDate(isoDate) {
	const date = new Date(isoDate);
	const dd = String(date.getDate()).padStart(2, "0");
	const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
	const yyyy = date.getFullYear();
	return `${dd}-${mm}-${yyyy}`;
}

export function formatTime(isoDate) {
	const date = new Date(isoDate);
	let hours = date.getHours();
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	const formattedHours = String(hours).padStart(2, "0");

	return `${formattedHours}:${minutes} ${ampm}`;
}

export function formatDateTime(isoDate) {
	const date = new Date(isoDate);

	// Date part
	const dd = String(date.getDate()).padStart(2, "0");
	const mm = String(date.getMonth() + 1).padStart(2, "0");
	const yyyy = date.getFullYear();

	// Time part
	let hours = date.getHours();
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12; // convert 0 to 12
	const formattedHours = String(hours).padStart(2, "0");

	// Final format
	return `${dd}-${mm}-${yyyy} ${formattedHours}:${minutes} ${ampm}`;
}
