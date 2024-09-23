import CitasEnCurso from "./CitasEnCurso-PrestadorServicios";
import ContadorHorasServicio from "./ContadorEstadosServicios";
import ResumenDiarioServicios from "./ResumenDiario-PrestadorSerivcios";
import RotacionSemanal from "./RotacionSemanal";



function Dashboard_PrestadorServicios() {
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
                            <h1 className="text-2xl font-bold"> Dashboard </h1>
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
                                    <CitasEnCurso
                                        Nombre="Jorge Soto"
                                        Edad={81}
                                        Horario={horarioCita}
                                    />
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