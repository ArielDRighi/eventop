"use client"
import React, { useState,useEffect } from 'react';
import { Login } from '@/views/Login/Login';
import  Register  from '@/views/Register/Register';
import { ToggleView } from '@/components/ToggleView';

const Page: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('Login');

  // Verificar el token y redireccionar en un efecto secundario
  useEffect(() => {
    const accesToken = localStorage.getItem('access_token');
    if (accesToken) {
      window.location.href = "/micuenta/dashboard";
    }
  }, []); // Solo se ejecutará una vez en el montaje del componente

  const views: { [key: string]: React.ReactNode } = {
    Login: <Login />,
    Register: <Register />,
  };

  return (
    <>
      <ToggleView activeView={activeView} setActiveView={setActiveView} views={views} />
      {views[activeView]}
    </>
  );
};

export default Page;