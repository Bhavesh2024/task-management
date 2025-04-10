import React from "react";
import { X } from "lucide-react";
import { format } from "date-fns";

const ViewTask = ({ setOpen, task }) => {
	const statusLabels = [
		"Not Started",
		"Completed",
		"In Progress",
		"Incomplete",
	];
	const statusColors = [
		"bg-red-500",
		"bg-emerald-400",
		"bg-indigo-500",
		"bg-yellow-500",
	];

	return (
		<div className='flex flex-col w-11/12 md:w-1/2 lg:w-1/3 bg-white h-fit rounded-xl shadow-lg relative p-6 space-y-5'>
			{/* Close Button */}
			<X
				className='text-slate-500 absolute top-4 right-4 cursor-pointer hover:text-red-500 transition'
				onClick={() => setOpen(false)}
			/>

			{/* Title and Description */}
			<div className='space-y-1'>
				<h2 className='text-xl font-bold text-slate-800'>
					{task.name}
				</h2>
				<p className='text-sm text-slate-600'>
					{task.description || "No description provided."}
				</p>
			</div>

			{/* Labels */}
			<div className='space-y-2'>
				<p className='text-sm font-semibold text-slate-700'>
					Labels
				</p>
				<div className='flex gap-2 flex-wrap'>
					{task.label.length > 0 ? (
						task.label.map((label, i) => (
							<span
								key={i}
								className='bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full shadow'>
								{label}
							</span>
						))
					) : (
						<span className='text-slate-500 text-sm'>
							No Tags
						</span>
					)}
				</div>
			</div>

			{/* Status and Progress */}
			<div className='flex items-center gap-4 flex-wrap'>
				<div className='space-y-1'>
					<p className='text-sm font-semibold text-slate-700'>
						Status
					</p>
					<span
						className={`text-white text-xs font-medium px-4 py-1 rounded-full ${
							statusColors[task.status]
						}`}>
						{statusLabels[task.status]}
					</span>
				</div>
			</div>

			{/* Date & Time */}
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600'>
				<div>
					<p className='font-semibold text-slate-700'>
						Start Time
					</p>
					<p>{format(new Date(task.time.start), "PPpp")}</p>
				</div>
				<div>
					<p className='font-semibold text-slate-700'>
						End Time
					</p>
					<p>{format(new Date(task.time.end), "PPpp")}</p>
				</div>
			</div>
		</div>
	);
};

export default ViewTask;
