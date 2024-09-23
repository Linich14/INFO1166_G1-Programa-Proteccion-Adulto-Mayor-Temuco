import React from "react";

function AlertaNotificacion({ tipo, mostrar }) {
    if (!mostrar) return null;

    if (tipo === "enviado") {
        return (
            <section className="p-2 rounded-lg bg-green-500 text-black mb-2">
                <p>La notificación fue enviada con éxito.</p>
            </section>
        );
    }

    return (
        <section className="p-2 rounded-lg bg-red-500 text-white mb-2">
            <p>Ocurrió un error al enviar la notificación.</p>
        </section>
    );
}
export default AlertaNotificacion;