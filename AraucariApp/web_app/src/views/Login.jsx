import React, { useState, useEffect } from 'react';
import axios from 'axios';

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function Login() {
    const [rut, setrut] = useState('');
    const [contraseña, setcontraseña] = useState('');
    const [error, setError] = useState(null);
    const [csrftoken, setCsrftoken] = useState('');

    useEffect(() => {
      axios.get('http://localhost:8000/get-csrf-token/')
          .then(response => {
              setCsrftoken(response.data.csrfToken);
          })
          .catch(error => {
              console.error('Error fetching CSRF token:', error);
          });
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!rut || !contraseña) {
        setError('Por favor, ingresa ambos campos');
        return;
    }
    try {
        const response = await axios.post('http://localhost:8000/login/', {
            rut,
            contraseña
        }, {
            headers: {
                'X-CSRFToken': csrftoken
            },
            withCredentials: true
        });
        
        console.log(response.data);
        const token = response.data.token;
        localStorage.setItem('token', token);
        window.location.href = '/';
    } catch (error) {
      console.log(csrftoken);
        setError('Credenciales inválidas');
    }
};

    return (
        <main className="grid grid-cols-2 grid-rows-1 gap-4 h-screen Login text-white">
            <div className='video-foreground video-background'>
                {(2 < 1) && <iframe src="https://www.youtube.com/embed/4PsAq2pfZjM?original_url=https%3A%2F%2Fyoutu.be%2F4PsAq2pfZjM&iv_load_policy=3&color=white&mute=1&autohide=1&controls=0&showinfo=0&modestbranding=1&version=3&loop=1&wmode=opaque&rel=0&hd=1&videoid=4PsAq2pfZjM&autoplay=1&html5=1&enablejsapi=1&origin=https%3A%2F%2Fwww.temuco.cl&widgetid=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>}
            </div>
            <div className="flex justify-center items-center difuminado">
                <div className="p-4 rounded-lg shadow-lg w-1/2">
                    <h1 className="text-3xl font-bold mb-6">Inicio de Sesión</h1>
                    <form onSubmit={handleSubmit} method='post'>
                        <label className="block mb-2" htmlFor="rut" >Rut o correo de funcionario:</label>
                        <input type="text" id="rut" value={rut} onChange={(event) => setrut(event.target.value)} className="block w-full p-2 border-b-2 border-white focus:border-b-2 focus:border-blue-500 outline-none mb-4" />
                        <label className="block mb-2" htmlFor="contraseña">Contraseña:</label>
                        <input type="password" id="contraseña" value={contraseña} onChange={(event) => setcontraseña(event.target.value)} className="block w-full p-2 border-b-2 border-white focus:border-b-2 focus:border-blue-500 outline-none" />
                        {error && <p className="text-red-500">{error}</p>}
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4">Iniciar sesión</button>
                    </form>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg shadow-lg justify-center items-center">
                    <img src="../../Logocolor.png" alt="" />
                </div>
            </div>
        </main>
    );
}

export default Login;
