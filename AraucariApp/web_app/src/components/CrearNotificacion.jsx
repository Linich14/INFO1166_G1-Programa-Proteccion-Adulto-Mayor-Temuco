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

        setTimeout(function() {
            setMostrarAlerta(false);
        }, 3000);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-1/2">
            {/* Alerta de notificación AQUI*/}
            <AlertaNotificacion tipo={tipoAlerta} mostrar={mostrarAlerta} />
            <section className="flex justify-between items-center mb-4 border-b">
                <h1 className="text-lg font-bold">NUEVA NOTIFICACIÓN</h1>
                <div className="flex items-center">
                    <button className="text-red-600 font-bold text-2xl border border-blue-500 rounded-full w-8 h-8 ">&times;</button>
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
        </div>

    )
}
export default CrearNotificacion;

