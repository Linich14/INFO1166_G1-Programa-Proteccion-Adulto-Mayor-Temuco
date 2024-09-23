import React, { useState } from 'react';

function OlvidarContraseña() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Enviar correo electrónico para recuperar contraseña:', email);
    setShowPopup(true);
    setPopupMessage('Sus datos han sido enviados correctamente.');
  };
  
  const handleContact = () => {
    setShowPopup(true);
    setPopupMessage('Por favor, comuníquese con nuestro equipo de soporte técnico al correo electrónico soporte@temuco.cl o al teléfono +56 9 1234 5678.');
  };
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  return (
    <main className="grid grid-cols-1 grid-rows-1 gap-4 h-screen Login">
      <div className="video-foreground video-background">
        <iframe src="https://www.youtube.com/embed/4PsAq2pfZjM?original_url=https%3A%2F%2Fyoutu.be%2F4PsAq2pfZjM&iv_load_policy=3&color=white&mute=1&autohide=1&controls=0&showinfo=0&modestbranding=1&version=3&loop=1&wmode=opaque&rel=0&hd=1&videoid=4PsAq2pfZjM&autoplay=1&html5=1&enablejsapi=1&origin=https%3A%2F%2Fwww.temuco.cl&widgetid=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
      <div className="flex justify-center items-center difuminado">
        <div className="bg-white p-4 rounded-lg shadow-lg justify-center items-center">
          <img src="../../Logocolor.png" alt="" className="w-64 h-32 ml-10" />
          <h2 className="text-lg font-bold mb-4">Recuperar contraseña</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
              >
                Enviar Solicitud
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-3 rounded focus:outline-none focus:shadow-outline"
                onClick={handleContact}
              >
                ¿Olvidaste tu correo?
            </button>
                  
            {showPopup && (
              <div className="fixed top-0 left-0 w-full h-full  flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg shadow-lg text-black  ">
                  <p className="text-lg font-bold mb-4">{popupMessage}</p>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setShowPopup(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}








            
          </form>
        </div>
      </div>
    </main>
  );
}

export default OlvidarContraseña;