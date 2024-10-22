import CitasEnCurso from "./CitasEnCurso-PrestadorServicios";
import ContadorHorasServicio from "./ContadorEstadosServicios";
import ResumenDiarioServicios from "./ResumenDiario-PrestadorSerivcios";
import RotacionSemanal from "./RotacionSemanal";

import { useEffect, useState } from "react";

function Dashboard_PrestadorServicios() {
    const [atenciones, setAtenciones] = useState([]);
    const servicioId = "1"; // Reemplaza esto con el identificador real del servicio

    useEffect(() => {
        // Realizar la solicitud al backend
        fetch(`http://127.0.0.1:8000/api/servicios/atenciones/${servicioId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setAtenciones(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [servicioId]);

    const horarioCita = {
        horaInicio: "00:00",
        horaFin: "20:00"
    };

    return (
        <div className="bg-slate-200 h-full">
            <div className="mx-20">
                <article className="flex flex-col flex-wrap w-full gap-4">

                    <div className="grow basis-full">
                        <section className="bg-white p-8 rounded-lg mt-2 shadow-md border border-gray-200">
                            <h1 className="text-2xl font-bold">Dashboard:</h1>
                            {/*<RelojActual />*/}
                        </section>
                    </div>

                    <div className="flex flex-row gap-4">
                        <div className="shrink w-1/2">
                            <div className="flex flex-col gap-4">
                                <section >
                                    <ContadorHorasServicio />
                                </section>

                                {/* Modifica esta parte adecuado a los datos solicitados*/}
                                {atenciones.map(atencion => (
                                    <section key={atencion.id}>
                                        <CitasEnCurso
                                            Nombre={atencion.cliente_nombre}  // Asegúrate de que este campo existe en la respuesta del backend
                                            Edad={atencion.edad}               // Si no tienes la edad, debes agregarla o calcularla
                                            Horario={horarioCita}
                                        />
                                    </section>
                                ))}
                            </div>
                        </div>

                        <div className="shrink w-1/2">
                            <div className="flex flex-col gap-4">
                                <section >
                                    <ResumenDiarioServicios atenciones={atenciones} />
                                </section>

                                <section>
                                    <RotacionSemanal />
                                </section>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default Dashboard_PrestadorServicios;