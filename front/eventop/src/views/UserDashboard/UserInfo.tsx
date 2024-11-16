"use client";

import { UserProfile, useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useState } from 'react';

export const UserInfo = () => {
    const { error, isLoading, user } = useUser();
    
    const [userData, setUserData] = useState<UserProfile | null>(null);
     
    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user]);
   
    if (isLoading) {
        return (
            <section>
                <h1 className="text-3xl text-center font-bold text-slate-200">
                    Loading...
                </h1>
                <div className="flex flex-col gap-4 w-1/4 mx-auto">
                    {/* Placeholder for a loading state */}
                    <img src="#" alt="Loading" />
                </div>
            </section>
        );
    }
    
    if (error) {
        return <div>Error loading user data</div>;
    }
     
    return (
        <div className="flex flex-col items-center w-full mx-auto gap-4">
            {userData && (
                <section>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-200">Hola, {userData.given_name}</h2>
                        <img src={userData.picture} className="rounded-lg text-center mx-auto p-4" />
                    </div>
                    <ul>
                        <li className="text-slate-200 font-semibold text-sm">Email: {userData.email}</li>        
                    </ul>
                </section>
            )}
            <a
                href='api/auth/logout'
                className="text-center p-4 bg-gray-950 text-white font-semibold mx-auto rounded-lg"
            >
                Log Out
            </a>
        </div>
    );
};
