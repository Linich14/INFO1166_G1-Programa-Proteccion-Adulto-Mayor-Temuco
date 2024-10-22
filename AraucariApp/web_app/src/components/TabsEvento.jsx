import React, { useState } from "react";
import VerEventos from "./tabsEvento/VerEventos";
import FormularioEvento from "./tabsEvento/formEvento";

const TabsEvento = () => {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabClick = (index) => {
		setActiveTab(index);
	};

	return (
		<div className="w-full">
			<div className="flex">
				<button
					onClick={() => handleTabClick(0)}
					className={`px-4 py-2 rounded-t-lg ${
						activeTab === 0
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-800"
					}`}
				>
					Ver Eventos
				</button>
				<button
					onClick={() => handleTabClick(1)}
					className={`px-4 py-2 rounded-t-lg ${
						activeTab === 1
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-800"
					}`}
				>
					Crear Evento
				</button>
			</div>

			<div className="p-4 border-t-2 rounded-b-lg ">
				{activeTab === 0 && (
					<div>
						<VerEventos />
					</div>
				)}
				{activeTab === 1 && (
					<div>
						<FormularioEvento />
					</div>
				)}
			</div>
		</div>
	);
};

export default TabsEvento;
