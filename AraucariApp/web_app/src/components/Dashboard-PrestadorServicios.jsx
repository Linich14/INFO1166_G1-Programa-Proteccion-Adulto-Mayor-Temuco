import CitasEnCurso from "./CitasEnCurso-PrestadorServicios";
import ContadorHorasServicio from "./ContadorEstadosServicios";
import ResumenDiarioServicios from "./ResumenDiario-PrestadorSerivcios";
import RotacionSemanal from "./RotacionSemanal";



function Dashboard_PrestadorServicios() {
    {/*Simulando horario */}
    const horarioCita = {
        horaInicio: "22:00", 
        horaFin: "23:00"
    };
    

    return (
        <div className="mx-20 my-2">
            <article className="flex flex-col flex-wrap w-full gap-4">

                <div className="grow basis-full">
                    <section className="bg-slate-300">
                        <h1> Prestador de servicios </h1>
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
    )
}

export default Dashboard_PrestadorServicios;