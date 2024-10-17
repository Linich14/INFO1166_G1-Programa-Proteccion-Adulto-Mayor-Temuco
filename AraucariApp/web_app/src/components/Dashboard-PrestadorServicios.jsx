import CitasEnCurso from "./CitasEnCurso-PrestadorServicios";
import ContadorHorasServicio from "./ContadorEstadosServicios";
import ResumenDiarioServicios from "./ResumenDiario-PrestadorSerivcios";
import RotacionSemanal from "./RotacionSemanal";

import { useEffect, useState } from "react";
import { ObtenerPrestadorPorNombre, ObtenerServicioPorPrestador, ObtenerAtencionesPorServicio } from "../api/DatosDashboardServicios";

function Dashboard_PrestadorServicios() {
    const [prestador, setPrestador] = useState(null); // Prestador seleccionado
    const [servicio, setServicio] = useState(null); // Servicio asociado al prestador
    const [atenciones, setAtenciones] = useState([]); // Atenciones asociadas al servicio

    useEffect(() => {
        async function CargarPrestador() {
            try {
                const prestadorData = await ObtenerPrestadorPorNombre('Karen');
                console.log('Prestador cargado:', prestadorData);
                setPrestador(prestadorData);
            } catch (error) {
                console.error('Error al cargar el prestador:', error);
            }
        }
        CargarPrestador();
    }, []);

    // Carga el servicio asociado al prestador
    useEffect(() => {
        async function CargarServicio() {
            if (prestador) {
                try {
                    const servicioData = await ObtenerServicioPorPrestador(prestador.id);
                    setServicio(servicioData);
                } catch (error) {
                    console.error('Error al cargar el servicio:', error);
                }
            }
        }
        CargarServicio();
    }, [prestador]);
    
    // Carga las atenciones asociadas al servicio
    useEffect(() => {
        async function CargarAtenciones() {
            if (servicio) {
                try {
                    const atencionesData = await ObtenerAtencionesPorServicio(servicio.id);
                    console.log('Atenciones cargadas:', atencionesData);
                    setAtenciones(atencionesData);
                } catch (error) {
                    console.error('Error al cargar las atenciones:', error);
                }
            }
        }
        CargarAtenciones();
    }, [servicio]);
    
    {/*Simulando horario */ }
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
                            {servicio && (
                                <h1 className="text-2xl font-bold">Dashboard: {servicio.nombre}</h1>
                            )}
                            {/*<RelojActual />*/}
                        </section>
                    </div>

                    <div className="flex flex-row gap-4">
                        <div className="shrink w-1/2">
                            <div className="flex flex-col gap-4">
                                <section >
                                    <ContadorHorasServicio />
                                </section>

                                <section>
                                    <CitasEnCurso
                                        Nombre="Juan Pérez"
                                        Edad={35}
                                        Horario={horarioCita}
                                    />
                                </section>
                                <section>
                                    {/* {atenciones.map(atencion => (
                                        <div key={atencion.id}>
                                            <h1>{atencion.clienteID}</h1>
                                            <p>{atencion.observacion}</p>
                                        </div>
                                    ))} */}
                                </section>
                            </div>
                        </div>

                        <div className="shrink w-1/2">
                            <div className="flex flex-col gap-4">
                                <section >
                                    <ResumenDiarioServicios />
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