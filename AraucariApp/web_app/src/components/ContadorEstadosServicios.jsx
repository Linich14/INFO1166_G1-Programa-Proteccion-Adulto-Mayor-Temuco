function ContadorHorasServicio() {
    return (
        <article className="flex gap-4">
            <section className="bg-white rounded-lg shadow-md p-4 basis-1/3 ">
                <div className="flex flex-col items-center h-full justify-center">
                    <div className="flex flex-row items-center w-full justify-center">
                        <img src="/Pending.svg?react" alt="Pending" className="basis-1/5"/>    
                        <h2 className="font-semibold text-2xl basis-3/5">Pendientes</h2>
                    </div>
                    <div>
                        <p className="text-2xl basis-1/5 text-right">23</p>
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-4 basis-1/3 ">
                <div className="flex flex-col items-center h-full justify-center">
                    <div className="flex flex-row items-center w-full justify-center">
                        <img src="/CircleCheck.svg?react" alt="Pending" className="basis-1/5" />
                        <h2 className="font-semibold text-2xl basis-3/5">Finalizados</h2>
                    </div>
                    <div className="">
                        <p className="text-2xl">23</p>
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-4 basis-1/3  ">
                <div className="flex flex-col items-center h-full justify-center">
                    <div className="flex flex-row items-center w-full justify-center">
                        <img src="/Cancel.svg?react" alt="Pending" className="basis-1/5" />
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