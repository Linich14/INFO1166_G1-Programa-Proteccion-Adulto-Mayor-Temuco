import CitasEnCurso from "./CitasEnCurso-PrestadorServicios";
import ContadorHorasServicio from "./ContadorEstadosServicios";
import ResumenDiarioServicios from "./ResumenDiario-PrestadorSerivcios";
import RotacionSemanal from "./RotacionSemanal";


function Dashboard_PrestadorServicios() {
    return (
        <div className="grid grid-cols-2 grid-row-2">
            <article className="col-span-1">
                <ContadorHorasServicio />
            </article>
                
            <article className="col-span-1">
                <ResumenDiarioServicios />
            </article>

            <article className="col-span-1">
                <CitasEnCurso />
            </article>

            <article className="col-span-1">
                <RotacionSemanal />
            </article>
        </div>
    )
}

export default Dashboard_PrestadorServicios;