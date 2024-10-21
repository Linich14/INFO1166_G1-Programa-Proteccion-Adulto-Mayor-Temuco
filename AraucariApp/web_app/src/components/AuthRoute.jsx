import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserProvider,UserContext } from './userContext';
const AuthRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rut, setRut] = useState(null); // Nuevo estado para almacenar el RUT del usuario
  const location = useLocation();
  const { setUserData } = useContext(UserContext);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Obtener el RUT del usuario desde el token
      const rut = localStorage.getItem('rut');
      setRut(rut);
      // Llamar al backend para obtener los datos de inicio de sesión
      fetch(`http://localhost:8000/user-data/${rut}`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        navigate('/', { replace: true });

      });

    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return     (
  
            <Component {...rest} />
            
            );
};

export default AuthRoute;