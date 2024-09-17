import CitasEnCurso from "./CitasEnCurso-PrestadorServicios";
import ContadorHorasServicio from "./ContadorEstadosServicios";
import ResumenDiarioServicios from "./ResumenDiario-PrestadorSerivcios";
import RotacionSemanal from "./RotacionSemanal";


function Dashboard_PrestadorServicios() {
    return (
        <div className="flex flex-row flex-wrap p-4 gap-4 justify-center">
            <article className="w-1/3">
                <ContadorHorasServicio />
            </article>
                
            <article className="w-1/3">
                <ResumenDiarioServicios />
            </article>

            <article className="w-1/3">
                <CitasEnCurso />
            </article>

            <article className="w-1/3">
                <RotacionSemanal />
            </article>
        </div>
    )
}

export default Dashboard_PrestadorServicios;