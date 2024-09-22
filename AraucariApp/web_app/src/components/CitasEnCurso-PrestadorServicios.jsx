import PendingClient from '../../public/PendingClient.svg?react';
import { useState } from 'react';
import BarraProgresoHorario from "./BarraProgresoHorario";

function CitasEnCurso({ Nombre, Edad, Horario }) {
    const [mostrarContenido, setMostrarContenido] = useState(false);

    const alternarContenido = () => {
        setMostrarContenido(!mostrarContenido);
    };

    return (
        <article className=" bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4">
            {/*Encabezado */}
            <section className="border-b border-black flex items-center mb-2">
                <div className="mr-1">
                    <img src={PendingClient} alt="icono_pending" />
                </div>

                <div className="flex-1 w-1/2">
                    <h2 className="font-semibold text-2xl">Cita en curso</h2>
                </div>

                <span className="flex-1 w-1/4 text-right font-semibold text-xl">Asesoría Jurídica</span>

                <hr />
            </section>

            {/*Datos de la cita */}
            <section className="">
                <div className="flex border-b border-gray-200 pb-2">
                    <h3 className="inline-block w-1/6 border-r-2 text-xl font-bold">Nombre</h3>
                    <p className="text-lg ml-2">{Nombre}</p>
                </div>

                <div className="flex border-b border-gray-200 pb-2">
                    <h3 className="inline-block w-1/6 border-r-2 text-xl font-bold">Edad</h3>
                    <p className="text-lg ml-2">{Edad}</p>
                </div>

                <div className="flex border-b border-gray-200 pb-2">
                    <h3 className="inline-block w-1/6 border-r-2 text-xl font-bold">Horario</h3>
                    <p className="text-lg ml-2">{Horario.horaInicio} - {Horario.horaFin}</p>
                </div>
            </section>
            {/*bg-gray-200 rounded-full h-6*/}
            <section className="">
                {mostrarContenido && (
                    <div className="w-full ">
                        <div className="mt-4">
                            <h2 className='font-semibold text-lg'>Estado de Cita</h2>
                            <hr />
                            <div className="flex justify-between font-semibold">
                                <div>{Horario.horaInicio}</div>
                                <div></div>
                                <div>{Horario.horaFin}</div>
                            </div>
                        </div>
                        {/* Barra de progreso */}
                        <BarraProgresoHorario horaInicio={Horario.horaInicio} horaFin={Horario.horaFin} />
                    </div>
                )}
            </section>
            {/*Boton que muesta/oculta contenido escrito en la sección arriba */}
            <section className="pt-4 text-right">
                    <button onClick={alternarContenido} className="bg-blue-600 text-md font-medium py-2 px-4 rounded-lg text-white  hover:bg-blue-700 transition-colors">
                        {mostrarContenido ? 'Ocultar detalles' : 'Mostrar detalles'}
                    </button>
                </section>
        </article>
    );
}

export default CitasEnCurso;