import React, { useEffect, useState } from "react";
import axios from "axios";

const apiIp = import.meta.env.VITE_API_IP;

export default function VerCalendarios() {
  const [calendarios, setCalendarios] = useState([]); 
  const [cargando, setCargando] = useState(true); 
  const [error, setError] = useState(null); 

  // Hacer la solicitud GET al cargar el componente
  useEffect(() => {
    const fetchCalendarios = async () => {
      try {
        const response = await axios.get(`${apiIp}/api/calendario/`);
        setCalendarios(response.data);
        setCargando(false);
      } catch (err) {
        setError("Error al obtener los calendarios");
        setCargando(false);
      }
    };

    fetchCalendarios();
  }, []); 

  if (cargando) return <p>Cargando calendarios...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="p-1">
      <h1 className="text-center text-2xl font-bold text-blue-500 mb-2">
        Calendarios
      </h1>
      <ul className="list-none">
        {calendarios.map((calendario) => (
          <li
            key={calendario.id}
            className="bg-white mb-3 p-2 rounded-lg shadow-md border-l-4 border border-blue-500"
          >
            <strong className="text-lg font-semibold text-gray-800">
              {calendario.nombre}
            </strong>
            <p className="mt-1 text-gray-600">{calendario.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
