import axios from 'axios';

export const ObtenerPrestadorPorNombre = async (nombre) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/servicios/api/prestador/${nombre}/`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el prestador:', error);
        throw error;
    }
}

export const ObtenerServicioPorPrestador = async (prestadorId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/servicios/api/servicio/${prestadorId}/`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el servicio:', error);
        throw error;
    }
}

export const ObtenerAtencionesPorServicio = async (servicioId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/servicios/api/atenciones/${servicioId}/`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las atenciones:', error);
        throw error;
    }
}

