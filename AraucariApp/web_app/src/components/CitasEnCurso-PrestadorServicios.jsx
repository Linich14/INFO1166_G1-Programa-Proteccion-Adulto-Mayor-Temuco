function CitasEnCurso ({ Nombre, Edad, Horario }) {


    return (
        <article className=" bg-white rounded-lg shadow-md border border-gray-200">
            <section className="px-6 border-b border-black flex items-center">
                <div className="mr-1">
                    <img
                        src=""
                        alt=""
                    />
                </div>
                <div className="flex-1 w-1/2">
                    <h2 className="font-semibold text-2xl">Cita en curso</h2>
                </div>
                <span className="flex-1 w-1/4 text-right font-semibold text-xl">Asesoría Jurídica</span>
                <hr />
            </section>

            <section className="px-6 py-4 space-y-3">
                <div className="flex border-b border-gray-200 pb-2">
                    <h3 className="inline-block w-1/6 border-r-2 pr-2 text-xl font-bold">Nombre</h3>
                    <p className="text-sm ml-2">{Nombre}</p>
                </div>

                <div className="flex border-b border-gray-200 pb-2">
                    <h3 className="inline-block w-1/6 border-r-2 pr-2 text-xl font-bold">Edad</h3>
                    <p className="text-sm ml-2">{Edad}</p>
                </div>

                <div className="flex border-b border-gray-200 pb-2">
                    <h3 className="inline-block w-1/6 border-r-2 pr-2 text-xl font-bold">Horario</h3>
                    <p className="text-sm ml-2">{Horario}</p>
                </div>
            </section>

            <section className="px-6 py-4 text-right">
                <button className="bg-blue-600 text-md font-medium py-2 px-4 rounded-lg text-white  hover:bg-blue-700 transition-colors">
                    Más información
                </button>
            </section>
        </article>
    );
}

export default CitasEnCurso;