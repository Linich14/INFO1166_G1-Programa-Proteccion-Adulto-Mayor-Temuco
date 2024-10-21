import * as React from "react";

export const SuccesIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		aria-hidden="true"
		className="w-5 h-5"
		viewBox="0 0 20 20"
		{...props}
	>
		<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
	</svg>
);

export const ErrorIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		aria-hidden="true"
		className="w-5 h-5"
		viewBox="0 0 20 20"
		{...props}
	>
		<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
	</svg>
);

export const CloseIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		aria-hidden="true"
		className="w-3 h-3"
		viewBox="0 0 14 14"
		{...props}
	>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
		/>
	</svg>
);
