function ResumenDiarioServicios () {
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
                        <tr className="">
                            <td className="">8:00AM</td>
                            <td className="">Jaime Guzman</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-red-600"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Fabian Perez</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-slate-400 text-center"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Francisca Soto</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Jaime Guzman</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Jaime Guzman</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Jaime Guzman</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Jaime Guzman</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Jaime Guzman</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Jaime Guzman</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Jaime Guzman</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Jaime Guzman</td>
                            <td className="">38</td>
                            <td className="">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">8:00AM</td>
                            <td className="">Jaime Guzman</td>
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