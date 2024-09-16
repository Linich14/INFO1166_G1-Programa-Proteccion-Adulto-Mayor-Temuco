
import Pending from '../../public/Pending.svg?react';
import CircleCheck  from '../../public/CircleCheck.svg?react';
import Cancel from '../../public/Cancel.svg?react';


function ContadorHorasServicio() {
    return (
        <article className="flex flex-row flex-wrap gap-4 w-fit">
            <section className="bg-white rounded-lg shadow-md w-40 p-4">
                <div className="flex justify-center gap-1">
                    <img src={Pending} alt="Pending" className="w-6 h-6" />
                    <h2 className="font-semibold text-lg">Pendientes</h2>
                </div>
                <p className="text-2xl text-center">23</p>
            </section>

            <section className="bg-white rounded-lg shadow-md w-40 p-4">
                <div className="flex justify-center gap-1">
                    <img src={CircleCheck} alt="Pending" className="w-6 h-6" />
                    <h2 className="font-semibold">Finalizados</h2>
                </div>
                <p className="text-2xl text-center">23</p>
            </section>

            <section className="bg-white rounded-lg shadow-md w-40 p-4">
                <div className="flex justify-center gap-1">
                    <img src={Cancel} alt="Pending" className="w-6 h-6" />
                    <h2 className="font-semibold">Cancelados</h2>
                </div>
                <p className="text-2xl text-center">23</p>
            </section>
        </article>
    )
}

export default ContadorHorasServicio