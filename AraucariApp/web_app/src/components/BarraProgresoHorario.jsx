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
        const [horasInicio, minutosInicio] = horaInicio.split(':').map(Number);
        const [horasFin, minutosFin] = horaFin.split(':').map(Number);
        
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

    // Efecto que actualiza el progreso cada minuto
    useEffect(() => {
        calcularProgreso();
        const intervalo = setInterval(calcularProgreso, 6000); // Actualizar cada 60 segundos (1 minuto)

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalo);
    }, [horaInicio, horaFin]);

    return (
        <div>
            <div 
                className="bg-blue-500 rounded-full transition-all duration-300 h-8"
                style={{ width: `${progreso}%` }}
            >
                <p className="h-10 text-center">Progreso numero: {Math.round(progreso)}%</p>
            </div>
        </div>

    );
}

export default BarraProgresoHorario;
