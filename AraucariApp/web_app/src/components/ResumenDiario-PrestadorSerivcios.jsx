function ResumenDiarioServicios ({ atenciones }) {
    return (
        <article className=" bg-white rounded-lg shadow-md border border-gray-200 p-4">
            <section className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Resumen Diario</h2>
                <span>Martes 28 de agosto</span>
            </section>

            <section>
                <table className="w-full text-center">
                    <thead>
                        <tr className="text-2xl">
                            <th className="border-b">Horario</th>
                            <th className="border-b">Nombre</th>
                            <th className="border-b">Edad</th>
                            <th className="border-b">Estado</th>
                        </tr>
                    </thead>
                    {/* Datos de prueba, pero aquí se debería mostrar por cada fila los datos de un usuario */}
                    
                    <tbody className="text-xl">
                        {atenciones.map((atencion) => (
                            <tr key={atencion.id}>
                                <td>{atencion.hora}</td>
                                <td>{atencion.cliente_nombre}</td> {/* Aquí muestra el nombre de la cita */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </article>
    )
}

export default ResumenDiarioServicios;