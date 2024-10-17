import React from "react";
import TabsCalendario from "./TabsCalendario";

export default function AdminCalendario() {
    return (
        <div className="flex flex-col bg-[#EBEFF0] h-screen p-4 gap-3 w-full">
            <div className="bg-white h-fit rounded-lg py-4 shadow-md">
                <h1 className='text-3xl font-bold p-1 text-center'>Administracion Calendario</h1>
            </div>
            <div className="flex flex-row gap-2 ">
            <div className="bg-white basis-1/2 shadow-md rounded-lg p-1">
                <TabsCalendario />
            </div>
            <div className="bg-white basis-1/2 shadow-md rounded-lg p-4">2</div>
            </div>
        </div>
    )
}