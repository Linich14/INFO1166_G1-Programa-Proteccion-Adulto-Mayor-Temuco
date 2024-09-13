function ResumenDiarioServicios () {
    return (
        <article className="max-w-lg bg-white rounded-lg shadow-md border border-gray-200 p-4">
            <section className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Resumen Diario</h2>
                <span>Martes 28 de agosto</span>
            </section>

            <section>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="border-b">Horario</th>
                            <th className="border-b">Nombre</th>
                            <th className="border-b">Edad</th>
                            <th className="border-b">Estado</th>
                        </tr>
                    </thead>
                    {/* Datos de prueba, pero aquí se debería mostrar por cada fila los datos de un usuario */}
                    <tbody>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Pedro Sanchez</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-red-600"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Pedro Sanchez</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-slate-400 text-center"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Pedro Sanchez</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </article>
    )
}

export default ResumenDiarioServicios;