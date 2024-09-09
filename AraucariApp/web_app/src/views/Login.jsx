import React from 'react';
import { Link } from 'react-router-dom';
function Login() {
  return (
    <main className="grid grid-cols-2 grid-rows-1 gap-4 h-screen Login">
      <div className="flex justify-center items-center difuminado">
        <div className=" p-4 rounded-lg shadow-lg w-1/2 ">
          <h1 className="text-3xl font-bold mb-6">Inicio de Sesión</h1>
          <form action="" className="mt-4">
            <label className="block mb-2" htmlFor="username" >Rut o correo de funcionario:</label>
            <input type="text" id="username" placeholder='12.345.678-9 o funcionariosTemuco@outlook.com' className="block w-full p-2 border-b-2 border-white focus:border-b-2 focus:border-blue-500 outline-none mb-4" />
            <label className="block mb-2" htmlFor="password">Contraseña:</label>
            <input type="password" id="password" placeholder='*****************' className="block w-full p-2 border-b-2 border-white focus:border-b-2 focus:border-blue-500 outline-none" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4" >Iniciar sesión</button>
            <a href="/" className="text-white hover:text-blue-700 p-3">Home temporal</a>
            <a href="/resetpassword" className="text-white hover:text-blue-700 p-3">¿Olvidaste tu contraseña?</a>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg  justify-center items-center ">
          <img src="../../Logocolor.png" alt="" />
        </div>
      </div>
    </main>
  );
}

export default Login;