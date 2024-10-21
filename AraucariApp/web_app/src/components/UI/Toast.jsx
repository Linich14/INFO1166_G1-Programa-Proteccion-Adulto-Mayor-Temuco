import React, { useEffect } from "react";
import { SuccesIcon, ErrorIcon, CloseIcon } from "../SVG/IconsToast";

export default function Toast({ respuesta, visibilidad, funcVisibilidad }) {
	const IconToast = (tipo) => {
		if (respuesta.tipo === "success") {
			return (
				<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
					<SuccesIcon />
				</div>
			);
		} else if (tipo === "error") {
			return (
				<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
					<ErrorIcon />
				</div>
			);
		}
	};

	useEffect(() => {
		if (visibilidad) {
			const timer = setTimeout(() => {
				funcVisibilidad(false);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [visibilidad, funcVisibilidad]);

	if (!visibilidad) {
		return null;
	}

	return (
		<div className="flex absolute right-0 bottom-0 items-center w-full max-w-xs p-4 mb-4 mr-4 text-gray-500 bg-white rounded-lg shadow-lg">
			{IconToast(respuesta.tipo)}
			<div className="ms-3 text-sm font-normal">{respuesta.mensaje}</div>
			<button
				type="button"
				className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
				onClick={() => funcVisibilidad(false)}
			>
				<CloseIcon />
			</button>
		</div>
	);
}
