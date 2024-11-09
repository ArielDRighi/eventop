
"use client"
import React, { useState } from 'react';
import { Login } from '@/views/Login/Login';
import  Register  from '@/views/Register/Register';
import { ToggleView } from '@/components/ToggleView';

const Page: React.FC = () => {
    
  const [activeView, setActiveView] = useState<string>('Login');

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