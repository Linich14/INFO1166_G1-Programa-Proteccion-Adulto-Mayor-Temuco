
import Pending from '../../public/Pending.svg?react';
import CircleCheck  from '../../public/CircleCheck.svg?react';
import Cancel from '../../public/Cancel.svg?react';


function ContadorHorasServicio() {
    return (
        <article className="flex flex-wrap gap-4">

            <section className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col items-center h-full justify-center">
                    <div className="flex flex-row items-center w-full">
                        <img src={Pending} alt="Pending" className="basis-1/5"/>    
                        <h2 className="font-semibold text-2xl basis-3/5">Pendientes</h2>
                    </div>
                    <div>
                        <p className="text-2xl basis-1/5 text-right">23</p>
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col items-center h-full justify-center">
                    <div className="flex flex-row items-center w-full">
                        <img src={CircleCheck} alt="Pending" className="basis-1/5" />
                        <h2 className="font-semibold text-2xl basis-3/5">Finalizados</h2>
                    </div>
                    <div className="">
                        <p className="text-2xl">23</p>
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col items-center h-full justify-center">
                    <div className="flex flex-row items-center w-full">
                        <img src={Cancel} alt="Pending" className="basis-1/5" />
                        <h2 className="font-semibold text-2xl basis-3/5">Cancelados</h2>
                    </div>
                    <div>
                        <p className="text-2xl text-center">23</p>
                    </div>
                </div>
            </section>
        </article>
    )
}

export default ContadorHorasServicio