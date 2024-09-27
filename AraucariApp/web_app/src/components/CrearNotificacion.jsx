import React, { useState } from "react";
import AlertaNotificacion from "./AlertaNotificacion";

function CrearNotificacion() {
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [tipoAlerta, setTipoAlerta] = useState('');

    // state de formulario para simular que la vina funciona:
    const [titulo, setTitulo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const funcionFormulario = (hacer) => {
        hacer.preventDefault();

        // simulo el envío de la notificación
        if (titulo && mensaje) {
            setTipoAlerta("enviado");
        } else {
            setTipoAlerta("error");
        }

        setMostrarAlerta(true);

        setTimeout(function () {
            setMostrarAlerta(false);
        }, 3000);
    };

    return (
        <div className="flex flex-col flex-wrap gap-4 mx-10 mt-2">

            <section className="bg-white border border-gray-200 rounded-lg shadow-md p-4 grow basis-full ">
                <h1 className="text-2xl font-bold">Centro de notificaciones</h1>
            </section>

            <div className="flex flex-row gap-4">
                <section className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-1/2">
                    {/* Alerta de notificación AQUI*/}
                    <AlertaNotificacion tipo={tipoAlerta} mostrar={mostrarAlerta} />
                    <section className="flex justify-between items-center mb-4 border-b">
                        <h1 className="text-lg font-bold">NUEVA NOTIFICACIÓN</h1>
                        <div className="flex items-center">
                            <button>&times;</button>
                        </div>
                    </section>

                    <form onSubmit={funcionFormulario}>
                        <article className="">
                            <div className="flex flex-col mb-2">
                                <label htmlFor="titulo" className="font-semibold text-lg">Titulo</label>
                                <input type="text" name="titulo" value={titulo} onChange={(evento) => setTitulo(evento.target.value)} placeholder="Cambios de horario..." className="border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 p-2" />
                            </div>

                            <div className="flex flex-col mb-2">
                                <label htmlFor="image" className="font-semibold text-lg">Insertar imagén (Opcional)</label>
                                <input type="file" name="image" accept="image/png, image/jpeg" className="border border-gray-300 rounded-lg p-2" />
                            </div>

                            <div className="flex flex-col mb-2">
                                <label className="font-semibold text-lg">Mensaje</label>
                                <textarea name="area_mensaje" value={mensaje} onChange={(evento) => setMensaje(evento.target.value)} placeholder="Debido a las fuertes lluvias los servicios..." className="border border-gray-300 rounded-lg p-2"></textarea>
                            </div>

                            <div className="flex flex-row justify-center gap-4">
                                <button type="submit" className="p-4 w-40 bg-green-500 font-semibold rounded-lg">Enviar</button>
                                <button className="p-4 w-40 bg-red-500 font-semibold rounded-lg">Cancelar</button>
                            </div>
                        </article>
                    </form>
                </section>

                <section className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-1/2">
                    <div>
                        <h1 className="text-lg font-semibold border-b">Historial de notificaciones</h1>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Titulo</th>
                                    <th>Fecha</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-left">
                                <tr className="hover:bg-gray-100">
                                    <td>Cambio de horarios</td>
                                    <td>12/12/2021</td>
                                    <td><button>&times;</button></td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td>Recordatorio servicio mañana</td>
                                    <td>12/12/2021</td>
                                    <td><button>&times;</button></td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td>Se informa la siguiente info importante</td>
                                    <td>12/12/2021</td>
                                    <td><button>&times;</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>



        </div>

    )
}
export default CrearNotificacion;

