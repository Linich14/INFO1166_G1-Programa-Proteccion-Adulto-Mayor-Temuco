import React, { useState } from 'react';
import FormCalendario from './FormCalendario/formCalendario';
import InvitarCalendario from './FormCalendario/InvitarUsuario';
import VerCalendarios from './FormCalendario/VerCalendarios';

const TabsCalendario = () => {
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
            activeTab === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          Ver Calendarios
        </button>
        <button
          onClick={() => handleTabClick(1)}
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          Crear Calendario
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          Invitar Usuario
        </button>
      </div>

      <div className="p-4 border-t-2 rounded-b-lg ">
        {activeTab === 0 && <div><VerCalendarios/></div>}
        {activeTab === 1 && <div><FormCalendario/></div>}
        {activeTab === 2 && <div><InvitarCalendario/></div>}
      </div>
    </div>
  );
};

export default TabsCalendario;
