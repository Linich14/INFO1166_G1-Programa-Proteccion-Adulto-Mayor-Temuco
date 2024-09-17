
import Pending from '../../public/Pending.svg?react';
import CircleCheck from '../../public/CircleCheck.svg?react';
import Cancel from '../../public/Cancel.svg?react';


function ContadorHorasServicio() {
    return (
        <article className="flex flex-wrap gap-4 justify-between">
            {/* Sección de Pendientes */}
            <section className="bg-white rounded-lg shadow-md p-4 w-full sm:w-1/4 flex flex-col items-center aspect-square">
                <img src={Pending} alt="Pending" className="w-10 h-10 mb-2" />
                <h2 className="font-semibold text-xl">Pendientes</h2>
                <p className="text-3xl mt-2">23</p>
            </section>

            {/* Sección de Finalizados */}
            <section className="bg-white rounded-lg shadow-md p-4 w-full sm:w-1/4 flex flex-col items-center">
                <img src={CircleCheck} alt="Finalizados" className="w-10 h-10 mb-2" />
                <h2 className="font-semibold text-xl">Finalizados</h2>
                <p className="text-3xl mt-2">23</p>
            </section>

            {/* Sección de Cancelados */}
            <section className="bg-white rounded-lg shadow-md p-4 w-full sm:w-1/4 flex flex-col items-center">
                <img src={Cancel} alt="Cancelados" className="w-10 h-10 mb-2" />
                <h2 className="font-semibold text-xl">Cancelados</h2>
                <p className="text-3xl mt-2">23</p>
            </section>
        </article>
    )
}

export default ContadorHorasServicio