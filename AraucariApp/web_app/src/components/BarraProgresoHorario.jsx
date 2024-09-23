import { useState, useEffect } from 'react';

function BarraProgresoHorario({ horaInicio, horaFin }) {
    const [progreso, setProgreso] = useState(0);

    // Función para calcular el progreso en base al tiempo actual
    const calcularProgreso = () => {
        const ahora = new Date();
        const inicio = new Date();
        const fin = new Date();

        // split: Separar la hora en horas y minutos
        // map: Convertir los valores a números
        const [horasInicio, minutosInicio] = horaInicio.split(":").map(Number);
        const [horasFin, minutosFin] = horaFin.split(":").map(Number);

        // Hora de inicio y fin
        inicio.setHours(horasInicio, minutosInicio, 0, 0);
        fin.setHours(horasFin, minutosFin, 0, 0);

        const tiempoTotal = fin - inicio; // Tiempo total en milisegundos
        const tiempoTranscurrido = ahora - inicio; // Tiempo transcurrido hasta el momento

        if (tiempoTranscurrido <= 0) {
            setProgreso(0); // Aún no ha comenzado
        } else if (tiempoTranscurrido >= tiempoTotal) {
            setProgreso(100); // El tiempo ya ha pasado
        } else {
            const progresoActual = (tiempoTranscurrido / tiempoTotal) * 100;
            setProgreso(progresoActual);
        }
    };

    // Efecto que actualiza el progreso cada 6 segundos
    useEffect(() => {
        calcularProgreso();
        const intervalo = setInterval(calcularProgreso, 6000);
        return () => clearInterval(intervalo);
    }, [horaInicio, horaFin]);

    return (
        <div className="flex flex-col items-center">
            <progress
                className="w-full h-8 bg-blue-600 rounded-lg overflow-hidden border border-blue-600"
                value={progreso}
                max="100"
            />
            <p className="mt-2 text-center">Progreso: {Math.round(progreso)}%</p>
        </div>
    );
}

export default BarraProgresoHorario;

