function RotacionSemanal() {
    return (
        <article>
            <section className="w-fit bg-white rounded-lg shadow-md border border-gray-200 p-2 w-fill">
                <table className="">
                    <thead>
                        <tr className="text-left">
                            <th className="underline">Rotación semanal</th>
                            <th className="w-fit text-center"></th>
                            <th className="text-right">Agosto</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="">Semana actual</td>
                            <td className="block text-center mx-4">---</td>
                            <td className="">Sector Santa Rosa</td>
                        </tr>
                        <tr>
                            <td className="">Próxima semana</td>
                            <td className="block text-center mx-4">---</td>
                            <td className="">Sector Pedro de Valdivia</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </article>
    )
}

export default RotacionSemanal